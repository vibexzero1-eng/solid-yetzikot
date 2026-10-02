"use client";

import { useState } from "react";
import Link from "next/link";
import { mockOrdersStore, OrderRecord } from "@/lib/orders";
import { MessageCircle, Mail, CreditCard, Printer, CheckCircle2, ShieldCheck, ArrowLeft, RefreshCw } from "lucide-react";
import ReceiptModal, { ReceiptData } from "@/components/cart/ReceiptModal";
import { COMPANY_CONTACT } from "@/lib/contact";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>(mockOrdersStore);
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptData | null>(null);

  const secretaryPhone = COMPANY_CONTACT.whatsappNumber;
  const mainCompanyEmail = COMPANY_CONTACT.email;

  const handleUpdatePrice = (orderId: string, newPrice: number) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, approvedTotal: newPrice } : o))
    );
  };

  const getWhatsAppLink = (order: OrderRecord) => {
    const payUrl = `http://localhost:3000/pay/${order.id}`;
    const text = encodeURIComponent(
      `שלום ${order.customerName},\n` +
      `הצעת המחיר עבור הזמנה #${order.id} מאושרת בסך ₪${(order.approvedTotal || order.originalTotal).toLocaleString()}.\n\n` +
      `קישור לתשלום מאובטח באשראי והפקת קבלה:\n${payUrl}\n\n` +
      `בברכה,\nסוליד יציקות בע"מ | ${COMPANY_CONTACT.officePhone}`
    );
    return `https://wa.me/${secretaryPhone}?text=${text}`;
  };

  const openOrderReceipt = (order: OrderRecord) => {
    const receiptData: ReceiptData = {
      receiptNumber: order.receiptNumber || `REC-${order.id}`,
      issueDate: new Date(order.createdAt).toLocaleDateString("he-IL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }),
      companyName: "סוליד יציקות בע\"מ",
      companyTaxId: "515893021",
      companyAddress: "אזור תעשייה עמנואל",
      customerName: order.customerName,
      customerCompany: order.customerCompany || "פרטי",
      customerPhone: order.customerPhone,
      customerEmail: order.customerEmail,
      items: order.items,
      totalAmount: order.approvedTotal || order.originalTotal,
      currency: "ILS",
      status: order.status === "paid" ? "שולם באשראי (PayPlus)" : "מאושר לבקשת הצעת מחיר"
    };

    setSelectedReceipt(receiptData);
  };

  return (
    <div className="pt-28 pb-20 bg-surface min-h-screen">
      {selectedReceipt && (
        <ReceiptModal receipt={selectedReceipt} onClose={() => setSelectedReceipt(null)} />
      )}

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent font-bold text-xs rounded-full mb-1">
              פאנל ניהול הזמנות B2B
            </span>
            <h1 className="text-3xl font-bold text-ink font-heading">ניהול פניות, סליקה וקבלות</h1>
            <p className="text-steel text-sm">
              אישור הצעות מחיר, הפקת קישורי תשלום ב-PayPlus ושליחה אוטומטית למזכירה ולמייל החברה
            </p>
          </div>

          <div className="flex gap-3">
            <Link href="/" className="px-4 py-2 bg-white border border-concrete rounded-xl text-ink font-bold text-sm hover:bg-concrete transition-all shadow-sm">
              מסך הבית
            </Link>
          </div>
        </div>

        {/* Quick Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-concrete shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-700 font-bold">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-steel font-bold block">וואטסאפ להזמנות</span>
              <span className="text-lg font-bold text-ink font-mono" dir="ltr">{COMPANY_CONTACT.whatsappPhone}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-concrete shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 font-bold">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-steel font-bold block">מייל החברה הראשי</span>
              <span className="text-sm font-bold text-ink" dir="ltr">{mainCompanyEmail}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-concrete shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-steel font-bold block">מנוע סליקה & חשבוניות</span>
              <span className="text-sm font-bold text-ink">PayPlus & חשבונית ירוקה</span>
            </div>
          </div>
        </div>

        {/* Orders Table Card */}
        <div className="bg-white rounded-3xl border border-concrete shadow-xl overflow-hidden">
          <div className="p-6 border-b border-concrete flex justify-between items-center bg-surface">
            <h2 className="text-xl font-bold text-ink font-heading">פניות והזמנות אחרונות ({orders.length})</h2>
            <span className="text-xs text-steel font-bold">מצב סליקה: פעיל / מחובר</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="bg-surface/50 text-steel text-xs font-bold border-b border-concrete">
                  <th className="p-4">מספר הזמנה</th>
                  <th className="p-4">פרטי לקוח/חברה</th>
                  <th className="p-4">מוצרים nפרטים</th>
                  <th className="p-4">מחיר משוער</th>
                  <th className="p-4">מחיר מאושר לסליקה</th>
                  <th className="p-4 text-center">פעולות ושליחה</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-concrete">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-surface/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-ink">
                      {order.id}
                      <span className="block text-[11px] font-normal text-steel">
                        {new Date(order.createdAt).toLocaleDateString("he-IL")}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="font-bold text-ink block">{order.customerName}</span>
                      <span className="text-xs text-steel block">{order.customerCompany}</span>
                      <span className="text-xs text-steel font-mono block" dir="ltr">{order.customerPhone}</span>
                    </td>

                    <td className="p-4">
                      <ul className="space-y-1 text-xs text-steel">
                        {order.items.map((it, idx) => (
                          <li key={idx}>
                            • {it.product.name} (x{it.quantity})
                          </li>
                        ))}
                      </ul>
                      {order.details && (
                        <p className="text-[11px] text-accent mt-1 italic">"{order.details}"</p>
                      )}
                    </td>

                    <td className="p-4 font-mono font-bold text-steel" dir="ltr">
                      ₪{order.originalTotal.toLocaleString()}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold">₪</span>
                        <input
                          type="number"
                          value={order.approvedTotal || order.originalTotal}
                          onChange={(e) => handleUpdatePrice(order.id, Number(e.target.value))}
                          className="w-24 px-3 py-1.5 bg-surface border border-concrete rounded-xl font-mono font-bold text-ink text-sm text-center focus:ring-2 focus:ring-accent outline-none"
                        />
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-col gap-2 items-center">
                        <a
                          href={getWhatsAppLink(order)}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full px-3 py-2 bg-green-600 text-white rounded-xl text-xs font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <MessageCircle className="w-4 h-4" /> שלח לינק לוואצאפ
                        </a>

                        <button
                          onClick={() => openOrderReceipt(order)}
                          className="w-full px-3 py-2 bg-surface border border-concrete text-ink rounded-xl text-xs font-bold hover:bg-concrete transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Printer className="w-4 h-4 text-accent" /> הצג / הדפס קבלה
                        </button>

                        <a
                          href={`/pay/${order.id}`}
                          target="_blank"
                          className="text-[11px] font-bold text-accent hover:underline flex items-center gap-1"
                        >
                          תצוגת עמוד תשלום ←
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
