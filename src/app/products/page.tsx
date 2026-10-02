"use client";

import { useState } from "react";
import Link from "next/link";
import { products, Product } from "@/lib/products";
import { Search, Filter, ShoppingCart, ArrowLeft, ShieldCheck, Check } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";

const categories = [
  { id: "all", label: "כל המוצרים" },
  { id: "covers", label: "מכסי יציקה לתאי בקרה" },
  { id: "gratings", label: "רשתות וקולטנים" },
  { id: "concrete", label: "מוצרי בטון לתשתיות" },
  { id: "hybrid", label: "מוצרים משולבים" },
  { id: "accessories", label: "אביזרים ואטמים" },
];

export default function ProductsCatalogPage() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem, items } = useCart();
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCat === "all" || p.categorySlug === selectedCat;
    const matchesSearch = p.name.includes(searchQuery) || p.sku.includes(searchQuery) || p.category.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div className="pt-28 pb-24 bg-surface min-h-screen">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 bg-accent/10 text-accent font-bold rounded-full mb-4 text-sm">
            קטלוג מוצרים רשמי
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4 font-heading">
            פתרונות יציקה ובטון לתשתיות
          </h1>
          <p className="text-steel text-lg">
            מגוון מוצרי מדף ופתרונות הנדסיים מותאמים אישית בעמידה מלאה בתקנים הישראליים והאירופאיים.
          </p>
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white rounded-3xl p-6 border border-concrete shadow-sm mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-5 h-5 text-steel absolute right-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="חפש לפי שם מוצר, מק״ט..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 pl-4 py-3 bg-surface border border-concrete rounded-2xl text-sm focus:ring-2 focus:ring-accent outline-none"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    selectedCat === cat.id
                      ? "bg-accent text-white shadow-md"
                      : "bg-surface text-steel hover:text-ink border border-concrete"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isAdded = addedIds[product.id];
            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-white rounded-3xl border border-concrete hover:border-accent hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Image Box */}
                  <div className="bg-surface h-56 p-6 relative flex items-center justify-center border-b border-concrete group-hover:bg-accent/5 transition-colors">
                    <span className="absolute top-4 right-4 bg-white text-ink text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
                      {product.category}
                    </span>
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Info Box */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      {product.badges.map((badge, idx) => (
                        <span key={idx} className="text-[11px] font-bold bg-concrete/60 text-steel px-2 py-0.5 rounded">
                          {badge}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-ink mb-2 group-hover:text-accent transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-steel leading-relaxed mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Specs summary */}
                    <div className="bg-surface p-3 rounded-xl border border-concrete text-xs space-y-1 mb-4">
                      <div className="flex justify-between">
                        <span className="text-steel">עומס:</span>
                        <span className="font-bold text-ink">{product.specs.loadRating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-steel">מידות:</span>
                        <span className="font-bold text-ink">{product.specs.dimensions}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="px-6 pb-6 pt-0 flex items-center justify-between gap-2">
                  <div className="text-accent font-bold text-lg">
                    ₪{product.price}
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                      isAdded
                        ? "bg-green-600 text-white"
                        : "bg-ink text-white hover:bg-accent"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" /> נוסף בסל
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" /> הוסף להצעה
                      </>
                    )}
                  </button>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-concrete">
            <h3 className="text-xl font-bold text-ink mb-2">לא נמצאו מוצרים תואמים</h3>
            <p className="text-steel mb-6">נסה לשנות את מילות החיפוש או לבחור קטגוריה אחרת</p>
            <button
              onClick={() => {
                setSelectedCat("all");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 bg-accent text-white font-bold rounded-xl"
            >
              אפס סינון
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
