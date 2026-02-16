export type Category = "Fruits" | "Vegetables" | "Dairy" | "Snacks" | "Beverages" | "Bakery";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: Category;
  stock: number;
  unit: string;
  discount?: number;
  description: string;
}

export const categories: { name: Category; emoji: string }[] = [
  { name: "Fruits", emoji: "🍎" },
  { name: "Vegetables", emoji: "🥦" },
  { name: "Dairy", emoji: "🧀" },
  { name: "Snacks", emoji: "🍿" },
  { name: "Beverages", emoji: "🥤" },
  { name: "Bakery", emoji: "🍞" },
];

export const products: Product[] = [
  { id: 1, name: "Fresh Avocado", price: 2.49, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d80f60?w=400&h=400&fit=crop", category: "Fruits", stock: 50, unit: "each", discount: 15, description: "Perfectly ripe Hass avocados, creamy and delicious." },
  { id: 2, name: "Organic Strawberries", price: 4.99, image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop", category: "Fruits", stock: 30, unit: "pack", description: "Sweet organic strawberries, freshly picked." },
  { id: 3, name: "Red Apples", price: 1.99, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop", category: "Fruits", stock: 100, unit: "lb", description: "Crisp and juicy red delicious apples." },
  { id: 4, name: "Bananas", price: 0.79, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop", category: "Fruits", stock: 80, unit: "lb", discount: 10, description: "Fresh yellow bananas, perfect for smoothies." },
  { id: 5, name: "Fresh Broccoli", price: 2.29, image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop", category: "Vegetables", stock: 40, unit: "bunch", description: "Organic broccoli crowns, nutrient-packed." },
  { id: 6, name: "Baby Spinach", price: 3.49, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop", category: "Vegetables", stock: 25, unit: "bag", description: "Tender baby spinach leaves, pre-washed." },
  { id: 7, name: "Bell Peppers", price: 1.49, image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop", category: "Vegetables", stock: 60, unit: "each", description: "Colorful bell peppers, sweet and crunchy." },
  { id: 8, name: "Sweet Carrots", price: 1.29, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop", category: "Vegetables", stock: 70, unit: "lb", discount: 20, description: "Fresh organic carrots, naturally sweet." },
  { id: 9, name: "Whole Milk", price: 3.99, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop", category: "Dairy", stock: 50, unit: "gallon", description: "Farm-fresh whole milk, pasteurized." },
  { id: 10, name: "Greek Yogurt", price: 5.49, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop", category: "Dairy", stock: 35, unit: "tub", description: "Creamy Greek yogurt, high in protein." },
  { id: 11, name: "Cheddar Cheese", price: 4.99, image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400&h=400&fit=crop", category: "Dairy", stock: 45, unit: "block", discount: 10, description: "Sharp cheddar cheese, aged to perfection." },
  { id: 12, name: "Tortilla Chips", price: 3.29, image: "https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=400&h=400&fit=crop", category: "Snacks", stock: 55, unit: "bag", description: "Crunchy tortilla chips, lightly salted." },
  { id: 13, name: "Mixed Nuts", price: 7.99, image: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=400&h=400&fit=crop", category: "Snacks", stock: 30, unit: "jar", discount: 25, description: "Premium mixed nuts, roasted and salted." },
  { id: 14, name: "Orange Juice", price: 4.49, image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop", category: "Beverages", stock: 40, unit: "carton", description: "Freshly squeezed orange juice, no pulp." },
  { id: 15, name: "Sourdough Bread", price: 5.99, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop", category: "Bakery", stock: 20, unit: "loaf", description: "Artisan sourdough bread, freshly baked." },
  { id: 16, name: "Croissants", price: 4.49, image: "https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400&h=400&fit=crop", category: "Bakery", stock: 25, unit: "pack", discount: 15, description: "Buttery French croissants, flaky and golden." },
];
