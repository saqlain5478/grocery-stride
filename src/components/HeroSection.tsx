import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl mx-4 mt-6 mb-8">
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src={heroBanner}
          alt="Fresh groceries"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-12 max-w-lg">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-semibold w-fit mb-4 animate-fade-in-up">
            🔥 Up to 25% Off
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-3 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Fresh Groceries,<br />
            <span className="text-primary">Delivered Fast</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Farm-fresh produce and essentials at your doorstep.
          </p>
          <a href="#products" className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-green w-fit animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
