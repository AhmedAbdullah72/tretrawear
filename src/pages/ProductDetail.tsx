import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { useCartStore, type ShopifyProduct } from "@/stores/cartStore";
import { Loader2, ChevronLeft, Truck, RefreshCw, ShieldCheck, Minus, Plus } from "lucide-react";
import { SizeGuide } from "@/components/SizeGuide";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getProductCopy } from "@/lib/productCopy";
import { ProductBenefits, ProductSpecsTable, ProductFAQs } from "@/components/ProductCopySections";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        setProduct(data?.data?.productByHandle || null);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (handle) fetchProduct();
  }, [handle]);

  // SEO: update document title & meta
  useEffect(() => {
    if (!product) return;
    const copy = getProductCopy(product.title, product.handle);
    document.title = copy.seo.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", copy.seo.metaDescription);
  }, [product]);

  const handleAddToCart = async () => {
    if (!product) return;
    const variant = product.variants.edges[selectedVariantIdx]?.node;
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.title, position: "top-center" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center py-40"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <p className="text-foreground font-heading text-lg">Product not found</p>
          <Link to="/shop" className="text-primary underline mt-4 inline-block font-body">Back to shop</Link>
        </div>
      </div>
    );
  }

  const selectedVariant = product.variants.edges[selectedVariantIdx]?.node;
  const images = product.images.edges;
  const copy = getProductCopy(product.title, product.handle);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Top marquee */}
      <div className="pt-16 md:pt-18 bg-primary text-primary-foreground">
        <div className="py-2">
          <Marquee items={["FREE SHIPPING OVER 500 EGP", "14-DAY RETURNS", "PREMIUM QUALITY"]} speed="slow" />
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <Link to="/shop" className="inline-flex items-center gap-1 font-body text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ChevronLeft className="h-4 w-4" /> Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <div className="aspect-[3/4] bg-secondary rounded-2xl overflow-hidden shadow-sm">
              {images[selectedImage]?.node ? (
                <img
                  src={images[selectedImage].node.url}
                  alt={copy.imageAlts[selectedImage] || images[selectedImage].node.altText || product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                      idx === selectedImage ? "border-primary shadow-sm" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.node.url} alt={copy.imageAlts[idx] || ""} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            <div>
              <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-2">{product.title}</h1>
              <p className="font-heading text-2xl text-primary">
                {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || "0").toFixed(2)}
              </p>
            </div>

            {/* Benefits */}
            <ProductBenefits copy={copy} />

            {/* Options */}
            {product.options.map((option) => (
              <div key={option.name}>
                <label className="font-heading text-xs tracking-wider text-foreground block mb-2">{option.name}</label>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => {
                    const variantIdx = product.variants.edges.findIndex(v =>
                      v.node.selectedOptions.some(o => o.name === option.name && o.value === value)
                    );
                    const isSelected = product.variants.edges[selectedVariantIdx]?.node.selectedOptions.some(
                      o => o.name === option.name && o.value === value
                    );
                    return (
                      <button
                        key={value}
                        onClick={() => variantIdx >= 0 && setSelectedVariantIdx(variantIdx)}
                        className={`px-4 py-2 text-sm font-body rounded-lg border-2 transition-all duration-200 ${
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-foreground hover:border-primary/40 bg-card"
                        }`}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
                <SizeGuide />
              </div>
            ))}

            {/* Quantity */}
            <div>
              <label className="font-heading text-xs tracking-wider text-foreground block mb-2">Quantity</label>
              <div className="inline-flex items-center border border-border rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2.5 text-muted-foreground hover:text-foreground transition-colors">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-body text-sm text-foreground">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2.5 text-muted-foreground hover:text-foreground transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={isLoading || !selectedVariant?.availableForSale}
              className="w-full bg-primary text-primary-foreground font-heading text-sm tracking-wider uppercase py-6 rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300"
              size="lg"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : !selectedVariant?.availableForSale ? (
                "Sold Out"
              ) : (
                "Add to Cart"
              )}
            </Button>

            {/* Specs Table */}
            <ProductSpecsTable copy={copy} />

            {/* Description */}
            {product.description && (
              <div className="bg-card rounded-xl p-5 border border-border">
                <h3 className="font-heading text-xs tracking-wider text-foreground mb-2">Description</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* FAQs */}
            <ProductFAQs copy={copy} />

            <div className="space-y-2">
              {[
                { icon: Truck, text: "Free shipping on orders over 500 EGP" },
                { icon: RefreshCw, text: "14-day return policy" },
                { icon: ShieldCheck, text: "Premium quality materials" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <p className="font-body text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
