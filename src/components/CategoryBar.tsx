import { categories, Category } from "@/data/products";

interface CategoryBarProps {
  selected: Category | null;
  onSelect: (category: Category | null) => void;
}

const CategoryBar = ({ selected, onSelect }: CategoryBarProps) => {
  return (
    <section className="px-4 mb-8">
      <h2 className="text-lg font-bold text-foreground mb-4">Categories</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => onSelect(null)}
          className={`shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            selected === null
              ? "bg-primary text-primary-foreground glow-green"
              : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onSelect(cat.name)}
            className={`shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              selected === cat.name
                ? "bg-primary text-primary-foreground glow-green"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryBar;
