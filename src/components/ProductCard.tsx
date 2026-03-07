import { Link } from "react-router-dom";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useCartStore, type ShopifyProduct } from "@/stores/cartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const { node } = product;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const firstVariant = node.variants.edges[0]?.node;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: node.title, position: "top-center" });
  };

  return (
    <Link to={`/product/${node.handle}`} className="group block">
      <div className="relative aspect-[3/4] bg-card rounded-lg overflow-hidden mb-3">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
        <button
          onClick={handleAddToCart}
          disabled={isLoading || !firstVariant?.availableForSale}
          className="absolute bottom-3 right-3 bg-primary text-primary-foreground p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
        </button>
        {!firstVariant?.availableForSale && (
          <div className="absolute top-3 left-3 bg-muted text-muted-foreground text-xs font-heading font-semibold px-3 py-1 rounded">
            Sold Out
          </div>
        )}
      </div>
      <h3 className="font-heading font-medium text-sm text-foreground truncate">{node.title}</h3>
      <p className="font-heading text-sm text-muted-foreground mt-1">
        {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
      </p>
    </Link>
  );
};
