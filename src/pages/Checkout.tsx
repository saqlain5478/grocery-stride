import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, CreditCard, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", address: "", payment: "cod" });
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("full_name, phone, address").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data) setForm((f) => ({
        ...f,
        name: data.full_name || f.name,
        phone: data.phone || f.phone,
        address: data.address || f.address,
      }));
    });
  }, [user]);

  if (items.length === 0 && step < 3) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
        <p className="text-xl font-bold mb-4">Your cart is empty</p>
        <Link to="/" className="text-primary font-semibold hover:underline">Go shopping →</Link>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!user) return;
    setPlacing(true);
    const orderItems = items.map((i) => ({
      id: i.product.id,
      name: i.product.name,
      price: i.product.discount ? i.product.price * (1 - i.product.discount / 100) : i.product.price,
      quantity: i.quantity,
    }));
    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      items: orderItems,
      total: totalPrice,
      full_name: form.name,
      phone: form.phone,
      address: form.address,
      payment_method: form.payment,
    });
    setPlacing(false);
    if (error) {
      toast.error("Failed to place order. Please try again.");
      return;
    }
    clearCart();
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
        <div className="glass-card p-10 max-w-md w-full animate-fade-in-up">
          <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
          <h1 className="text-2xl font-extrabold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-6">Your fresh groceries are on the way.</p>
          <button onClick={() => navigate("/")} className="h-12 px-8 rounded-lg bg-primary text-primary-foreground font-bold hover:brightness-110 transition-all glow-green">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <button onClick={() => (step === 1 ? navigate("/") : setStep(1))} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                {s}
              </div>
              <span className={`text-sm font-medium ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                {s === 1 ? "Address" : "Payment"}
              </span>
              {s === 1 && <div className={`w-12 h-0.5 ${step >= 2 ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="glass-card p-6">
          {step === 1 ? (
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold">Delivery Details</h2>
              </div>
              {(["name", "phone", "address"] as const).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5 capitalize">{field}</label>
                  <input
                    type={field === "phone" ? "tel" : "text"}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full h-11 px-4 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder={field === "name" ? "John Doe" : field === "phone" ? "+1 234 567 890" : "123 Fresh Street, City"}
                  />
                </div>
              ))}
              <button
                onClick={() => setStep(2)}
                disabled={!form.name || !form.phone || !form.address}
                className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-bold hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed glow-green"
              >
                Continue to Payment
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold">Payment Method</h2>
              </div>
              {[{ id: "cod", label: "Cash on Delivery", icon: "💵" }, { id: "card", label: "Credit/Debit Card", icon: "💳" }].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${form.payment === opt.id ? "border-primary bg-primary/10" : "border-border bg-secondary"}`}
                >
                  <input type="radio" name="payment" value={opt.id} checked={form.payment === opt.id} onChange={(e) => setForm({ ...form, payment: e.target.value })} className="sr-only" />
                  <span className="text-xl">{opt.icon}</span>
                  <span className="font-medium">{opt.label}</span>
                  <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${form.payment === opt.id ? "border-primary" : "border-muted-foreground"}`}>
                    {form.payment === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                </label>
              ))}
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span><span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Delivery</span><span className="text-primary font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2">
                  <span>Total</span><span className="text-primary">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <button onClick={handleSubmit} disabled={placing} className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-bold hover:brightness-110 transition-all disabled:opacity-50 glow-green">
                {placing ? "Placing order..." : `Place Order — $${totalPrice.toFixed(2)}`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
