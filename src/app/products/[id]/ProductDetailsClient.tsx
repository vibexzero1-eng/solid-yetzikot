"use client";

import { useState } from "react";
import { Product } from "@/lib/products";
import { useCart } from "@/components/cart/CartContext";
import { ArrowLeft, CheckCircle2, ChevronRight, Minus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductDetailsClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleQuoteRequest = () => {
    addItem(product, quantity);
    router.push("/#contact");
  };

  return (
    <div className="py-12 bg-surface min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-steel mb-8">
          <Link href="/" className="hover:text-accent transition-colors">ראשי</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-accent transition-colors">קטלוג מוצרים</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-ink font-bold">{product.name}</span>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-concrete overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <div className="bg-surface/50 p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-l border-concrete relative">
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                {product.badges.map((badge, idx) => (
                  <span key={idx} className="bg-ink text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {badge}
                  </span>
                ))}
              </div>
              <img 
                src={product.img} 
                alt={product.name} 
                className="w-full max-w-lg object-contain hover:scale-105 transition-transform duration-500 mix-blend-multiply" 
              />
            </div>

            {/* Product Details */}
            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <span className="text-accent font-bold text-sm mb-2 block">{product.category}</span>
                <h1 className="text-3xl lg:text-4xl font-bold text-ink mb-4 font-heading">{product.name}</h1>
                <p className="text-steel text-sm mb-2">מק"ט: {product.sku}</p>
                <div className="text-accent font-bold text-2xl mb-6">₪{product.price}</div>
                <p className="text-ink text-lg leading-relaxed mb-8">{product.description}</p>
                
                <h3 className="font-bold text-xl mb-4 text-ink">מפרט טכני</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-surface p-4 rounded-xl border border-concrete">
                    <span className="block text-xs text-steel mb-1">דרגת עומס</span>
                    <span className="block font-bold text-ink">{product.specs.loadRating}</span>
                  </div>
                  <div className="bg-surface p-4 rounded-xl border border-concrete">
                    <span className="block text-xs text-steel mb-1">מידות</span>
                    <span className="block font-bold text-ink" dir="ltr">{product.specs.dimensions}</span>
                  </div>
                  <div className="bg-surface p-4 rounded-xl border border-concrete">
                    <span className="block text-xs text-steel mb-1">משקל</span>
                    <span className="block font-bold text-ink">{product.specs.weight}</span>
                  </div>
                  <div className="bg-surface p-4 rounded-xl border border-concrete">
                    <span className="block text-xs text-steel mb-1">חומר</span>
                    <span className="block font-bold text-ink">{product.specs.material}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-8 border-t border-concrete space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-ink">כמות:</span>
                  <div className="flex items-center bg-surface border border-concrete rounded-xl p-1">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-12 text-center bg-transparent font-bold text-lg outline-none"
                    />
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 py-4 bg-ink text-white font-bold rounded-2xl hover:bg-iron transition-all text-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    הוסף לעגלה
                  </button>
                  <button 
                    onClick={handleQuoteRequest}
                    className="flex-1 py-4 bg-accent text-white font-bold rounded-2xl hover:bg-accent-dark transition-all shadow-[0_5px_15px_rgba(242,107,29,0.3)] hover:-translate-y-1 text-lg flex items-center justify-center gap-2"
                  >
                    בקש הצעת מחיר למוצר זה
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-1">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-blue-900 mb-1">ייעוץ הנדסי ללא עלות</h4>
            <p className="text-blue-800 text-sm">
              מתלבטים אם דרגת העומס מתאימה לפרויקט שלכם? הוסיפו את המוצרים לעגלת הבקשות והמהנדסים שלנו יעברו על המפרט לפני סגירת ההזמנה.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
