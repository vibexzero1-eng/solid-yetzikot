"use client";

import { useCart } from "./CartContext";
import { X, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function CartDrawer() {
  const { isDrawerOpen, closeDrawer, items, updateQuantity, removeItem, totalItems } = useCart();

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isDrawerOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-ink/50 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeDrawer}
      ></div>

      {/* Drawer (Left side for RTL) */}
      <div className={`fixed top-0 left-0 h-full w-full max-w-md bg-surface z-[101] shadow-2xl transition-transform duration-300 flex flex-col ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-white border-b border-concrete">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold font-heading text-ink">סל בקשות</h2>
            <span className="bg-accent/10 text-accent font-bold px-3 py-1 rounded-full text-sm">
              {totalItems} פריטים
            </span>
          </div>
          <button onClick={closeDrawer} className="w-10 h-10 flex items-center justify-center rounded-full bg-surface hover:bg-concrete transition-colors">
            <X className="w-5 h-5 text-steel" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-steel space-y-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Trash2 className="w-8 h-8 text-concrete" />
              </div>
              <p className="font-medium text-lg">הסל שלכם ריק כרגע</p>
              <button onClick={closeDrawer} className="text-accent font-bold hover:underline">חזרה לקטלוג</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="bg-white p-4 rounded-2xl border border-concrete shadow-sm flex gap-4 relative group">
                <button 
                  onClick={() => removeItem(item.product.id)}
                  className="absolute top-2 left-2 w-8 h-8 bg-surface rounded-full flex items-center justify-center text-steel hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="w-24 h-24 bg-surface rounded-xl overflow-hidden shrink-0">
                  <img src={item.product.img} alt={item.product.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-ink leading-snug pl-6">{item.product.name}</h3>
                    <p className="text-xs text-steel mt-1">מק"ט: {item.product.sku}</p>
                    <p className="text-sm font-bold text-accent mt-1">₪{item.product.price}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-concrete flex items-center justify-center hover:bg-surface transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-concrete flex items-center justify-center hover:bg-surface transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-concrete">
            <div className="flex items-center justify-between mb-4">
              <span className="text-steel font-medium">סה״כ משוער:</span>
              <span className="text-2xl font-bold text-ink">
                ₪{items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-steel mb-4 text-center">* המחיר הסופי ייקבע ויחושב על ידי נציג לאחר פנייתכם</p>
            <Link 
              href="/#contact" 
              onClick={closeDrawer}
              className="w-full py-4 bg-accent text-white font-bold rounded-2xl hover:bg-accent-dark transition-all text-lg shadow-[0_5px_15px_rgba(242,107,29,0.3)] hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              המשך להצעת מחיר
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
