"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, CheckCircle2, ShieldCheck, Phone, ArrowLeft, Printer, FileText } from "lucide-react";
import ReceiptModal, { ReceiptData } from "@/components/cart/ReceiptModal";
import { COMPANY_CONTACT } from "@/lib/contact";

export default function PaymentCheckoutPage({ params }: { params: Promise<{ token: string }> }) {
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // Demo order item breakdown
  const orderDetails = {
    orderId: "SOL-326988",
    customerName: "ישראל ישראלי",
    company: "חברת תשתיות בע\"מ",
    phone: COMPANY_CONTACT.whatsappPhone,
    email: "solidyb@solid-yb.com",
    items: [
      { name: "רשתות מיצקת מסגרת מלבנית D400", sku: "1001", quantity: 5, price: 420 },
      { name: "חוליות הגבהה מבטון 100 ס\"מ", sku: "2001", quantity: 2, price: 300 }
    ],
    totalAmount: 2700
  };

  const handlePayPlusCheckout = async () => {
    setLoading(true);

    // Simulate PayPlus & Green Invoice processing
    setTimeout(() => {
      const generatedReceipt: ReceiptData = {
        receiptNumber: `REC-${orderDetails.orderId}`,
        issueDate: new Date().toLocaleDateString("he-IL", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }),
        companyName: "סוליד יציקות בע\"מ",
        companyTaxId: "515893021",
        companyAddress: "אזור תעשייה עמנואל",
        customerName: orderDetails.customerName,
        customerCompany: orderDetails.company,
        customerPhone: orderDetails.phone,
        customerEmail: orderDetails.email,
        items: orderDetails.items.map(i => ({
          product: { name: i.name, sku: i.sku, price: i.price },
          quantity: i.quantity
        })),
        totalAmount: orderDetails.totalAmount,
        currency: "ILS",
        status: "שולם באשראי (PayPlus / חשבונית ירוקה)"
      };

      setReceipt(generatedReceipt);
      setPaid(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="pt-28 pb-20 bg-surface min-h-screen flex items-center justify-center">
      {showReceiptModal && receipt && (
        <ReceiptModal receipt={receipt} onClose={() => setShowReceiptModal(false)} />
      )}

      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-3xl border border-concrete shadow-2xl overflow-hidden p-8 md:p-12">
          {/* Header */}
          <div className="text-center border-b border-concrete pb-8 mb-8">
            <img
              src="https://www.solid-yb.com/wp-content/uploads/2024/06/לוגו.png"
              alt="סוליד יציקות"
              className="h-12 w-auto mx-auto mb-4 object-contain"
            />
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent font-bold text-xs rounded-full mb-2">
              דף תשלום מאובטח B2B
            </span>
            <h1 className="text-3xl font-bold text-ink font-heading">לתשלום הזמנה #{orderDetails.orderId}</h1>
            <p className="text-steel text-sm mt-1">סוליד יציקות בע"מ | מסוף סליקה מאובטח PayPlus & חשבונית ירוקה</p>
          </div>

          {paid && receipt ? (
            <div className="text-center space-y-6 py-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink font-heading">התשלום בוצע בהצלחה!</h2>
                <p className="text-steel text-sm mt-2">
                  חשבונית מס / קבלה <strong>#{receipt.receiptNumber}</strong> הונפקה ונשלחה למזכירות החברה (<span dir="ltr">{COMPANY_CONTACT.email}</span>) ולנייד להזמנות (<span dir="ltr">{COMPANY_CONTACT.whatsappPhone}</span>).
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button
                  onClick={() => setShowReceiptModal(true)}
                  className="px-8 py-4 bg-accent text-white font-bold rounded-2xl hover:bg-accent-dark transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" /> הצג / הורד חשבונית מס וקבלה
                </button>
                <Link
                  href="/"
                  className="px-8 py-4 bg-surface border border-concrete text-ink font-bold rounded-2xl hover:bg-concrete transition-all flex items-center justify-center gap-2"
                >
                  חזרה למסך הבית <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Order Summary Table */}
              <div className="bg-surface rounded-2xl p-6 border border-concrete space-y-4">
                <h3 className="font-bold text-ink text-base border-b border-concrete pb-3 flex justify-between items-center">
                  <span>סיכום פריטי הזמנה</span>
                  <span className="text-xs font-mono font-bold text-steel">לקוח: {orderDetails.customerName}</span>
                </h3>

                <div className="space-y-3">
                  {orderDetails.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-concrete/60 pb-2 last:border-0">
                      <div>
                        <span className="font-bold text-ink block">{item.name}</span>
                        <span className="text-xs text-steel">כמות: {item.quantity} יחידות</span>
                      </div>
                      <span className="font-bold font-mono text-ink" dir="ltr">₪{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-ink pt-3 flex justify-between items-center font-bold text-lg">
                  <span>סה"כ לתשלום באשראי:</span>
                  <span className="text-2xl text-accent font-mono" dir="ltr">₪{orderDetails.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Secure Payment Callout */}
              <div className="bg-accent/5 p-4 rounded-2xl border border-accent/20 flex items-center gap-4 text-xs text-steel">
                <ShieldCheck className="w-8 h-8 text-accent shrink-0" />
                <div>
                  <span className="font-bold text-ink block text-sm mb-0.5">סליקת אשראי בתקן PCI-DSS המחמיר ביותר</span>
                  <span>התשלום מבוצע באמצעות מסוף PayPlus המאובטח. חשבונית מס / קבלה מונפקת אוטומטית.</span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayPlusCheckout}
                disabled={loading}
                className="w-full py-5 bg-accent text-white font-bold rounded-2xl hover:bg-accent-dark transition-all text-xl shadow-[0_10px_25px_rgba(242,107,29,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <CreditCard className="w-6 h-6" />
                {loading ? "מעבד תשלום ב-PayPlus..." : `שלם עכשיו ₪${orderDetails.totalAmount.toLocaleString()} באשראי`}
              </button>

              <div className="text-center text-xs text-steel">
                <span>לבירורים טלפוניים: </span>
                <a href={`tel:${COMPANY_CONTACT.officePhoneTel}`} className="font-bold text-ink hover:text-accent" dir="ltr">{COMPANY_CONTACT.officePhone}</a>
                <span> | דוא"ל: {COMPANY_CONTACT.email}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
