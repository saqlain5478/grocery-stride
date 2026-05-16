import { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingCart, Check, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { items, addToCart, updateQuantity, setIsCartOpen } = useCart();

  const product = useMemo(() => products.find((p) => p.id === Number(id)), [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
        <p className="text-xl font-bold mb-4">Product not found</p>
        <Link to="/" className="text-primary font-semibold hover:underline">Back to shop →</Link>
      </div>
    );
  }

  const cartItem = items.find((i) => i.product.id === product.id);
  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;
  const inStock = product.stock > 0;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleBuyNow = () => {
    if (!cartItem) addToCart(product);
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="container mx-auto max-w-6xl px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="glass-card overflow-hidden group">
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {product.discount && (
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-sm font-bold glow-orange">
                  -{product.discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="text-sm text-primary font-semibold uppercase tracking-wide mb-2">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{product.name}</h1>

            <div className="flex items-center gap-2 mb-5">
              {inStock ? (
                <span className="inline-flex items-center gap-1.5 text-sm text-primary font-medium">
                  <Check className="w-4 h-4" /> In stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-sm text-destructive font-medium">Out of stock</span>
              )}
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-extrabold text-primary">${discountedPrice.toFixed(2)}</span>
              {product.discount && (
                <span className="text-xl text-muted-foreground line-through">${product.price.toFixed(2)}</span>
              )}
              <span className="text-sm text-muted-foreground">/ {product.unit}</span>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {/* Quantity + Actions */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {cartItem ? (
                <div className="flex items-center gap-2 bg-secondary rounded-lg p-1.5 border border-border">
                  <button
                    onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                    className="w-9 h-9 rounded-md bg-background flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-base font-bold w-8 text-center">{cartItem.quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                    className="w-9 h-9 rounded-md bg-primary flex items-center justify-center text-primary-foreground hover:brightness-110 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  disabled={!inStock}
                  className="h-12 px-6 rounded-lg bg-secondary border border-border text-foreground font-semibold hover:bg-primary/10 hover:border-primary/40 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to cart
                </button>
              )}

              <button
                onClick={handleBuyNow}
                disabled={!inStock}
                className="h-12 px-8 rounded-lg bg-primary text-primary-foreground font-bold hover:brightness-110 transition-all glow-green disabled:opacity-50"
              >
                Buy now
              </button>

              {cartItem && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="h-12 px-5 rounded-lg border border-border text-sm font-medium hover:bg-secondary transition-colors"
                >
                  View cart
                </button>
              )}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {[
                { icon: Truck, label: "Free delivery", sub: "Orders over $25" },
                { icon: ShieldCheck, label: "Fresh guarantee", sub: "100% quality" },
                { icon: RotateCcw, label: "Easy returns", sub: "Within 24h" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="glass-card p-3 text-center">
                  <Icon className="w-5 h-5 text-primary mx-auto mb-1.5" />
                  <p className="text-xs font-semibold">{label}</p>
                  <p className="text-[10px] text-muted-foreground">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-5">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
      <CartSidebar />
    </div>
  );
};

export default ProductDetail;
