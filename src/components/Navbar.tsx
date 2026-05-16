import { ShoppingCart, Search, Leaf, User as UserIcon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Navbar = ({ searchQuery, onSearchChange }: NavbarProps) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground hidden sm:block">
            Fresh<span className="text-primary">Mart</span>
          </span>
        </Link>

        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search groceries..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={user ? "/account" : "/auth"}
            className="p-2.5 rounded-lg bg-secondary hover:bg-primary/20 transition-colors hidden sm:flex"
            aria-label={user ? "Account" : "Sign in"}
          >
            <UserIcon className="w-5 h-5 text-foreground" />
          </Link>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-lg bg-secondary hover:bg-primary/20 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center animate-pulse-glow">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
