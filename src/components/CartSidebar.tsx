import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

const CartSidebar = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
      <aside className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" /> Your Cart
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
            <ShoppingBag className="w-16 h-16 mb-4 opacity-30" />
            <p className="font-medium">Your cart is empty</p>
            <p className="text-sm mt-1">Add some fresh items!</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map((item) => {
                const price = item.product.discount
                  ? item.product.price * (1 - item.product.discount / 100)
                  : item.product.price;
                return (
                  <div key={item.product.id} className="flex gap-3 glass-card p-3">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{item.product.name}</h4>
                      <p className="text-primary font-bold text-sm">${(price * item.quantity).toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 rounded bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 rounded bg-primary flex items-center justify-center text-primary-foreground">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors self-start">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="p-5 border-t border-border space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={() => { setIsCartOpen(false); navigate("/checkout"); }}
                className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-bold hover:brightness-110 transition-all glow-green"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default CartSidebar;
