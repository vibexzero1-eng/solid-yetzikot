"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Home, ShoppingCart, CheckCircle2, Phone, Mail, MapPin, Printer, FileText } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import ReceiptModal, { ReceiptData } from "@/components/cart/ReceiptModal";
import { COMPANY_CONTACT } from "@/lib/contact";

export default function QuotePage() {
  const { items, totalItems, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    details: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          items
        })
      });

      const data = await res.json();
      if (data.success) {
        setReceipt(data.receipt);
        setSubmitted(true);
        clearCart();
      } else {
        alert(data.error || "אירעה שגיאה בשליחת הבקשה");
      }
    } catch (err) {
      console.error(err);
      alert("אירעה שגיאה בתקשורת עם השרת");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface pt-24 pb-12 flex flex-col justify-between">
      {/* Receipt Modal Overlay */}
      {showModal && receipt && (
        <ReceiptModal receipt={receipt} onClose={() => setShowModal(false)} />
      )}

      <div className="container mx-auto px-4 max-w-5xl flex-1 flex flex-col justify-center">
        {/* Top Header Controls - Direct Home Button */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-concrete rounded-2xl text-ink font-bold hover:border-accent hover:text-accent transition-all shadow-sm group"
          >
            <Home className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
            <span>חזרה למסך הבית</span>
          </Link>

          <span className="text-sm font-bold text-steel">
            טופס בקשת הצעת מחיר לרכש מוסדי / B2B
          </span>
        </div>

        {/* Main Content Box */}
        <div className="bg-white rounded-3xl border border-concrete shadow-xl overflow-hidden">
          {submitted && receipt ? (
            <div className="p-8 md:p-12 text-center max-w-xl mx-auto space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 font-bold text-xs rounded-full mb-2">
                  קבלה #{receipt.receiptNumber}
                </span>
                <h2 className="text-3xl font-bold text-ink font-heading">הפנייה וההזמנה נקלטו בהצלחה!</h2>
              </div>

              <div className="bg-surface p-4 rounded-2xl border border-concrete text-right text-xs space-y-2">
                <p className="text-ink">
                  <strong>מייל עדכון נשלח אל:</strong> <span dir="ltr">solidyb@solid-yb.com</span> וכתובתכם <span dir="ltr">({receipt.customerEmail})</span>.
                </p>
                <p className="text-steel">
                  צוות ההנדסה והמכירות יבחן את המפרט הטכני ויצור עמכם קשר טלפוני במידת הצורך.
                </p>
              </div>

              {/* Receipt Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-6 py-3.5 bg-accent text-white font-bold rounded-2xl hover:bg-accent-dark transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  הצג / הדפס קבלה וסיכום הזמנה
                </button>
                <Link
                  href="/"
                  className="px-6 py-3.5 bg-surface border border-concrete rounded-2xl font-bold text-ink hover:bg-concrete transition-all flex items-center justify-center gap-2"
                >
                  חזרה למסך הבית
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Form Side */}
              <div className="lg:col-span-7 p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-ink mb-2 font-heading">
                  קבלת הצעת מחיר פרויקטלית
                </h1>
                <p className="text-steel text-sm mb-6">
                  מלאו את פרטי הפרויקט וצוות המהנדסים שלנו יחזור אליכם עם מפרט והצעת מחיר מדויקת.
                </p>

                {items.length > 0 && (
                  <div className="mb-6 p-4 bg-accent/5 border border-accent/20 rounded-2xl">
                    <div className="flex items-center justify-between font-bold text-sm text-ink mb-2">
                      <span className="flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4 text-accent" />
                        {totalItems} מוצרים שנבחרו בקטלוג:
                      </span>
                    </div>
                    <ul className="space-y-1 text-xs text-steel">
                      {items.map((item) => (
                        <li key={item.product.id} className="flex justify-between">
                          <span>{item.product.name}</span>
                          <span className="font-bold">כמות: {item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">שם מלא *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-surface border border-concrete rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                        placeholder="ישראל ישראלי"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">חברה / פרויקט</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 bg-surface border border-concrete rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                        placeholder="שם החברה / הקבלן"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">טלפון ליצירת קשר *</label>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-surface border border-concrete rounded-xl text-sm text-right focus:ring-2 focus:ring-accent outline-none"
                        placeholder={COMPANY_CONTACT.whatsappPhone}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">דוא"ל לקבלת קבלה</label>
                      <input
                        type="email"
                        dir="ltr"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-surface border border-concrete rounded-xl text-sm text-right focus:ring-2 focus:ring-accent outline-none"
                        placeholder={COMPANY_CONTACT.email}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">פירוט הדרישות / דגשים מיוחדים</label>
                    <textarea
                      rows={3}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full px-4 py-3 bg-surface border border-concrete rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none resize-none"
                      placeholder="מידות מיוחדות, דרגת עומס נדרשת, כמות משוערת..."
                    ></textarea>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-4 bg-accent text-white font-bold rounded-2xl hover:bg-accent-dark transition-all text-base shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? "שולח ומפיק קבלה..." : "שלח בקשה והפק קבלה"}
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <Link
                      href="/"
                      className="px-6 py-4 bg-surface border border-concrete rounded-2xl font-bold text-steel hover:text-ink transition-all"
                    >
                      ביטול
                    </Link>
                  </div>
                </form>
              </div>

              {/* Info Sidebar */}
              <div className="lg:col-span-5 bg-ink text-white p-6 md:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-r border-iron">
                <div>
                  <h3 className="text-xl font-bold mb-6 font-heading text-white">מענה אנושי ומיידי</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <span className="block text-xs text-gray-400 font-medium">טלפון משרד ({COMPANY_CONTACT.workingHours})</span>
                        <a href={`tel:${COMPANY_CONTACT.officePhoneTel}`} className="text-xl font-bold hover:text-accent transition-colors block" dir="ltr">
                          {COMPANY_CONTACT.officePhone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <span className="block text-xs text-gray-400 font-medium">וואטסאפ להזמנות</span>
                        <a href={`https://wa.me/${COMPANY_CONTACT.whatsappNumber}`} target="_blank" rel="noreferrer" className="text-lg font-bold hover:text-green-400 transition-colors block" dir="ltr">
                          {COMPANY_CONTACT.whatsappPhone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <span className="block text-xs text-gray-400 font-medium">דואר אלקטרוני</span>
                        <a href={`mailto:${COMPANY_CONTACT.email}`} className="text-sm font-bold hover:text-accent transition-colors" dir="ltr">
                          {COMPANY_CONTACT.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <span className="block text-xs text-gray-400 font-medium">מפעל ומשרדים</span>
                        <span className="text-sm font-bold">{COMPANY_CONTACT.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 text-xs text-gray-300">
                  <p className="leading-relaxed">
                    * עם שליחת הציע הפורמלי תונפק קבלה / מסמך סיכום הצעה ונשלחת העתק אוטומטי למייל החברה ולמייל הלקוח.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
