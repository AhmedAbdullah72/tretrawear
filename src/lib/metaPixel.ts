/**
 * Meta (Facebook) browser Pixel — dedicated, isolated helper.
 *
 * Scope & authority
 * -----------------
 * This file owns ONLY browser-side pre-checkout events on the headless
 * storefront: PageView, ViewContent, AddToCart, InitiateCheckout.
 *
 * `Purchase` is intentionally NOT implemented here. Checkout and the
 * thank-you page are Shopify-hosted surfaces, where the Shopify
 * "Facebook & Instagram" app pixel (Web + Server / CAPI) owns Purchase.
 * Firing Purchase from this SPA would fabricate revenue.
 *
 * No Conversions API calls are made from the browser and no access token
 * exists in this codebase — CAPI stays on the Shopify integration side.
 *
 * Every function is fire-and-forget and swallows its own errors, so an ad
 * blocker, CSP rejection or slow network can never break commerce flows.
 */

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '1622677029064808';

const CURRENCY = 'EGP';
const DEV = import.meta.env.DEV;

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: unknown;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let initialised = false;

/**
 * Injects Meta's async loader and calls `fbq('init')` exactly once.
 * Safe to call repeatedly (React StrictMode double-invoke, HMR, rerenders).
 */
export function initMetaPixel(): void {
  try {
    if (typeof window === 'undefined' || initialised || !PIXEL_ID) return;
    initialised = true;

    if (!window.fbq) {
      const n: Fbq = function (...args: unknown[]) {
        n.callMethod ? n.callMethod.apply(n, args) : n.queue!.push(args);
      } as Fbq;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      window.fbq = n;
      if (!window._fbq) window._fbq = n;

      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(s);
    }

    window.fbq!('init', PIXEL_ID);
    // Initial document PageView. Subsequent SPA navigations are tracked by
    // useMetaPageViews().
    window.fbq!('track', 'PageView');
    if (DEV) console.debug('[meta-pixel] init', PIXEL_ID);
  } catch {
    /* never throw into the app */
  }
}

function track(event: string, params?: Record<string, unknown>): void {
  try {
    if (typeof window === 'undefined' || !window.fbq) return;
    window.fbq('track', event, params);
    if (DEV) console.debug('[meta-pixel]', event, params);
  } catch {
    /* noop */
  }
}

export const trackMetaPageView = () => track('PageView');

/* ------------------------------------------------------------------ */
/* Catalog identifier convention                                       */
/* ------------------------------------------------------------------ */

/**
 * The Meta catalog is fed by the Shopify "Facebook & Instagram" sales
 * channel, which publishes VARIANT-level items whose retailer id is:
 *
 *   shopify_<COUNTRY>_<productId>_<variantId>      e.g. shopify_EG_8960265912451_46785067516035
 *
 * We therefore emit that exact string as `content_ids` with
 * `content_type: 'product'` so browser events match catalog items 1:1.
 */
const CATALOG_COUNTRY = 'EG';

export const metaContentId = (productId: string, variantId?: string): string =>
  variantId ? `shopify_${CATALOG_COUNTRY}_${productId}_${variantId}` : `shopify_${CATALOG_COUNTRY}_${productId}`;

export interface MetaLine {
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  quantity: number;
}

const contents = (lines: MetaLine[]) =>
  lines.map((l) => ({
    id: metaContentId(l.productId, l.variantId),
    quantity: l.quantity,
    item_price: l.price,
  }));

const total = (lines: MetaLine[]) =>
  Math.round(lines.reduce((s, l) => s + l.price * l.quantity, 0) * 100) / 100;

export function trackMetaViewContent(line: MetaLine): void {
  track('ViewContent', {
    content_type: 'product',
    content_ids: [metaContentId(line.productId, line.variantId)],
    content_name: line.name,
    contents: contents([line]),
    value: line.price,
    currency: CURRENCY,
  });
}

export function trackMetaAddToCart(line: MetaLine): void {
  track('AddToCart', {
    content_type: 'product',
    content_ids: [metaContentId(line.productId, line.variantId)],
    content_name: line.name,
    contents: contents([line]),
    value: total([line]),
    currency: CURRENCY,
  });
}

export function trackMetaInitiateCheckout(lines: MetaLine[]): void {
  track('InitiateCheckout', {
    content_type: 'product',
    content_ids: lines.map((l) => metaContentId(l.productId, l.variantId)),
    contents: contents(lines),
    num_items: lines.reduce((s, l) => s + l.quantity, 0),
    value: total(lines),
    currency: CURRENCY,
  });
}
