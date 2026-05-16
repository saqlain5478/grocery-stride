import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, Package, User as UserIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface Profile {
  full_name: string | null;
  phone: string | null;
  address: string | null;
  email: string | null;
}

interface Order {
  id: string;
  total: number;
  status: string;
  created_at: string;
  items: { name: string; quantity: number }[];
}

const Account = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile>({ full_name: "", phone: "", address: "", email: "" });
  const [orders, setOrders] = useState<Order[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: p } = await supabase.from("profiles").select("full_name, phone, address, email").eq("id", user.id).maybeSingle();
      if (p) setProfile(p);
      const { data: o } = await supabase.from("orders").select("id, total, status, created_at, items").order("created_at", { ascending: false });
      if (o) setOrders(o as unknown as Order[]);
    })();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      full_name: profile.full_name,
      phone: profile.phone,
      address: profile.address,
    }).eq("id", user.id);
    setSaving(false);
    if (error) toast.error("Failed to save");
    else toast.success("Profile updated");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading || !user) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to shop
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold">My Account</h1>
            <p className="text-muted-foreground text-sm mt-1">{profile.email || user.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 h-10 rounded-lg bg-secondary border border-border hover:bg-destructive/10 hover:text-destructive transition-all text-sm font-medium"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>

        <div className="glass-card p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <UserIcon className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">Profile & delivery details</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Full name</label>
              <input
                value={profile.full_name || ""}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                className="w-full h-11 px-4 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Phone</label>
              <input
                value={profile.phone || ""}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full h-11 px-4 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="+1 234 567 890"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Default delivery address</label>
              <textarea
                value={profile.address || ""}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="123 Fresh Street, City"
              />
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="h-11 px-6 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">Order history</h2>
          </div>
          {orders.length === 0 ? (
            <p className="text-muted-foreground text-sm py-6 text-center">No orders yet. Start shopping!</p>
          ) : (
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="p-4 rounded-lg bg-secondary border border-border">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-sm">Order #{o.id.slice(0, 8)}</p>
                      <p className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString(undefined, { dateStyle: "medium" })}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">${Number(o.total).toFixed(2)}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary capitalize">{o.status}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {o.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
