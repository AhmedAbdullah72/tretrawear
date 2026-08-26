/**
 * Thin GA4 / GTM dataLayer abstraction.
 *
 * Architecture: Application → window.dataLayer → GTM (GTM-WMZXMDSS) → GA4.
 * No GA4 network calls, no SDK, no React state. Every function is
 * fire-and-forget and swallows its own errors so a blocked/failed analytics
 * layer can never affect the storefront.
 *
 * ID CONVENTION (single source of truth for the whole funnel):
 *   item_id          → numeric Shopify PRODUCT id   (e.g. "8123456789")
 *   item_variant_id  → numeric Shopify VARIANT id   (e.g. "47514925334659")
 *   item_variant     → variant title / selected option values
 *   item_category    → Shopify productType
 * Handles, GIDs and titles are never used as item_id.
 */

import type { CartItem, ShopifyProduct } from '@/lib/shopify';

type DL = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DL[];
  }
}

export const CURRENCY = 'EGP';

const DEV = import.meta.env.DEV;

/** Extract the trailing numeric id from a Shopify GID, else return input. */
export const numericId = (gid?: string | null): string => {
  if (!gid) return '';
  const parts = String(gid).split('/');
  return parts[parts.length - 1] || String(gid);
};

const num = (v: unknown): number => {
  const n = parseFloat(String(v));
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : 0;
};

export interface Ga4Item {
  item_id: string;
  item_name: string;
  item_variant_id?: string;
  item_variant?: string;
  item_category?: string;
  price: number;
  quantity: number;
  index?: number;
  item_list_name?: string;
  [k: string]: unknown;
}

/** Core push. Resets the previous ecommerce object (GA4/GTM hygiene) first. */
export function pushEcommerceEvent(event: string, ecommerce: DL, extra: DL = {}): void {
  try {
    if (typeof window === 'undefined') return;
    // The GTM snippet is deferred; creating the array ourselves means events
    // fired before GTM loads are replayed once the container initialises.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({ event, ...extra, ecommerce: { currency: CURRENCY, ...ecommerce } });
    if (DEV) {
      // eslint-disable-next-line no-console
      console.debug('[analytics]', event, { ...extra, ecommerce });
    }
  } catch {
    /* analytics must never throw into the commerce flow */
  }
}

/** Non-ecommerce custom event. */
export function pushEvent(event: string, params: DL = {}): void {
  try {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
    if (DEV) {
      // eslint-disable-next-line no-console
      console.debug('[analytics]', event, params);
    }
  } catch {
    /* noop */
  }
}

/* ------------------------------------------------------------------ */
/* Item builders                                                       */
/* ------------------------------------------------------------------ */

type ProductNode = ShopifyProduct['node'];
type VariantNode = ProductNode['variants']['edges'][number]['node'];

export function itemFromProduct(
  node: ProductNode,
  opts: { variant?: VariantNode; quantity?: number; index?: number; listName?: string } = {}
): Ga4Item {
  const { variant, quantity = 1, index, listName } = opts;
  const price = variant?.price?.amount ?? node.priceRange?.minVariantPrice?.amount;
  const item: Ga4Item = {
    item_id: numericId(node.id),
    item_name: node.title,
    price: num(price),
    quantity,
  };
  // Only send item_category when Shopify actually has a productType.
  if (node.productType) item.item_category = node.productType;
  if (variant) {
    item.item_variant_id = numericId(variant.id);
    item.item_variant =
      variant.selectedOptions?.map((o) => o.value).join(' / ') || variant.title;
    variant.selectedOptions?.forEach((o) => {
      const key = o.name.toLowerCase();
      if (key === 'size') item.item_size = o.value;
      if (key === 'color' || key === 'colour') item.item_color = o.value;
    });
  }
  if (typeof index === 'number') item.index = index;
  if (listName) item.item_list_name = listName;
  return item;
}

export function itemFromCartItem(
  item: CartItem,
  quantityOverride?: number,
  list?: { listName?: string; index?: number }
): Ga4Item {
  const node = item.product.node;
  const ga: Ga4Item = {
    item_id: numericId(node.id),
    item_name: node.title,
    item_variant_id: numericId(item.variantId),
    item_variant: item.selectedOptions?.map((o) => o.value).join(' / ') || item.variantTitle,
    price: num(item.price.amount),
    quantity: quantityOverride ?? item.quantity,
  };
  if (node.productType) ga.item_category = node.productType;
  item.selectedOptions?.forEach((o) => {
    const key = o.name.toLowerCase();
    if (key === 'size') ga.item_size = o.value;
    if (key === 'color' || key === 'colour') ga.item_color = o.value;
  });
  if (list?.listName) ga.item_list_name = list.listName;
  if (typeof list?.index === 'number') ga.index = list.index;
  return ga;
}


const cartValue = (items: Ga4Item[]) =>
  Math.round(items.reduce((s, i) => s + i.price * i.quantity, 0) * 100) / 100;

/* ------------------------------------------------------------------ */
/* Event helpers                                                       */
/* ------------------------------------------------------------------ */

export const trackViewItem = (item: Ga4Item) =>
  pushEcommerceEvent('view_item', { value: item.price * item.quantity, items: [item] });

export const trackSelectItem = (item: Ga4Item, listName: string) =>
  pushEcommerceEvent('select_item', { item_list_name: listName, items: [{ ...item, item_list_name: listName }] });

export const trackAddToCart = (item: Ga4Item) =>
  pushEcommerceEvent('add_to_cart', { value: item.price * item.quantity, items: [item] });

export const trackRemoveFromCart = (item: Ga4Item) =>
  pushEcommerceEvent('remove_from_cart', { value: item.price * item.quantity, items: [item] });

export const trackViewCart = (items: Ga4Item[]) =>
  pushEcommerceEvent('view_cart', { value: cartValue(items), items });

export const trackBeginCheckout = (items: Ga4Item[], coupon?: string) =>
  pushEcommerceEvent('begin_checkout', {
    value: cartValue(items),
    ...(coupon ? { coupon } : {}),
    items,
  });

/* ------------------------------------------------------------------ */
/* Deduplication                                                       */
/* ------------------------------------------------------------------ */

/**
 * Page-session guard for events that must never repeat inside one document
 * (currently unused by view_item — see ProductDetail's per-view-instance ref
 * guard, which allows a repeat view_item on a genuine re-navigation).
 */
const fired = new Set<string>();

export function onceInSession(key: string, fn: () => void): void {
  if (fired.has(key)) return;
  fired.add(key);
  fn();
}

export function resetOnceKey(key: string): void {
  fired.delete(key);
}

/* ------------------------------------------------------------------ */
/* purchase — NOT implemented here (single-authority rule)             */
/* ------------------------------------------------------------------ */

/**
 * `purchase` is intentionally absent from this application. Exactly ONE
 * Shopify-side implementation may exist for the GA4 property (recommended:
 * Shopify "Google & YouTube" channel → GA4). Never run that alongside a custom
 * Shopify purchase pixel or a GTM purchase tag — it double-counts revenue.
 *
 * IDENTIFIER CONSISTENCY IS UNVERIFIED. The frontend convention above
 * (item_id = numeric product id, item_variant_id = numeric variant id) has NOT
 * been confirmed to match what Shopify's purchase integration emits — Shopify
 * commonly sends the numeric VARIANT id as items[].item_id. Before claiming
 * cross-funnel consistency, place a real safe/test order and compare
 * items[].item_id in GA4 DebugView between frontend view_item / add_to_cart /
 * begin_checkout and the Shopify-side purchase. Only then adjust one side.
 */

