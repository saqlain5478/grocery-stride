import { Leaf } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border mt-16 py-10 px-4">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
          <Leaf className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-bold text-foreground">FreshMart</span>
      </div>
      <p>© 2026 FreshMart. Fresh groceries delivered with care.</p>
    </div>
  </footer>
);

export default Footer;
