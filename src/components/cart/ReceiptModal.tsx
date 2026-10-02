"use client";

import { Printer, Download, X, CheckCircle2, ShieldCheck, Mail } from "lucide-react";
import { COMPANY_CONTACT } from "@/lib/contact";

export type ReceiptData = {
  receiptNumber: string;
  issueDate: string;
  companyName: string;
  companyTaxId: string;
  companyAddress: string;
  customerName: string;
  customerCompany: string;
  customerPhone: string;
  customerEmail: string;
  items: any[];
  totalAmount: number;
  currency: string;
  status: string;
};

interface ReceiptModalProps {
  receipt: ReceiptData;
  onClose: () => void;
}

export default function ReceiptModal({ receipt, onClose }: ReceiptModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative border border-concrete my-8 print:p-0 print:border-0 print:shadow-none">
        {/* Close & Print Action Buttons */}
        <div className="flex items-center justify-between mb-6 border-b border-concrete pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-accent text-white font-bold rounded-xl text-sm hover:bg-accent-dark transition-all flex items-center gap-2 shadow-md"
            >
              <Printer className="w-4 h-4" /> הדפס / הורד קבלה (PDF)
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-steel hover:text-ink rounded-full hover:bg-surface transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Printable Receipt Content */}
        <div className="space-y-6 print:space-y-4 text-ink">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-concrete pb-6">
            <div>
              <img
                src="https://www.solid-yb.com/wp-content/uploads/2024/06/לוגו.png"
                alt="סוליד יציקות"
                className="h-12 w-auto object-contain mb-2"
              />
              <h2 className="text-xl font-bold font-heading text-ink">סוליד יציקות בע"מ</h2>
              <p className="text-xs text-steel">ח.פ: {receipt.companyTaxId}</p>
              <p className="text-xs text-steel">{receipt.companyAddress}</p>
              <p className="text-xs text-steel" dir="ltr">{COMPANY_CONTACT.officePhone} | וואטסאפ: {COMPANY_CONTACT.whatsappPhone} | {COMPANY_CONTACT.email}</p>
            </div>

            <div className="text-left" dir="ltr">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 font-bold text-xs rounded-full mb-2">
                {receipt.status}
              </span>
              <h3 className="text-lg font-bold text-ink">אישור פנייה / קבלה</h3>
              <p className="text-xs text-steel font-mono font-bold">מספר: {receipt.receiptNumber}</p>
              <p className="text-xs text-steel">תאריך: {receipt.issueDate}</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-surface p-4 rounded-2xl border border-concrete grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs font-bold text-steel block">לכבוד:</span>
              <span className="font-bold text-ink">{receipt.customerName}</span>
              {receipt.customerCompany && (
                <span className="block text-xs text-steel">{receipt.customerCompany}</span>
              )}
            </div>
            <div className="text-left" dir="ltr">
              <span className="text-xs font-bold text-steel block">פרטי התקשרות:</span>
              <span className="font-mono text-xs block">{receipt.customerPhone}</span>
              <span className="text-xs text-steel block">{receipt.customerEmail}</span>
            </div>
          </div>

          {/* Email Notification Notice */}
          <div className="p-3 bg-accent/5 border border-accent/20 rounded-xl flex items-center gap-3 text-xs text-ink print:hidden">
            <Mail className="w-5 h-5 text-accent shrink-0" />
            <span>
              עותק של קבלה זו וסיכום הפנייה נשלחו אוטומטית למייל החברה <strong>(solidyb@solid-yb.com)</strong> ולכתובת <strong>({receipt.customerEmail})</strong>.
            </span>
          </div>

          {/* Items Table */}
          {receipt.items && receipt.items.length > 0 && (
            <div>
              <h4 className="font-bold text-sm mb-3">פירוט המוצרים והצעת המחיר:</h4>
              <table className="w-full text-right text-sm border-collapse">
                <thead>
                  <tr className="bg-surface border-y border-concrete text-steel text-xs font-bold">
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">תיאור המוצר / מק"ט</th>
                    <th className="py-2.5 px-3 text-center">כמות</th>
                    <th className="py-2.5 px-3 text-left">מחיר יחידה</th>
                    <th className="py-2.5 px-3 text-left">סה"כ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-concrete">
                  {receipt.items.map((item: any, idx: number) => (
                    <tr key={idx} className="hover:bg-surface/50">
                      <td className="py-3 px-3 text-xs text-steel font-mono">{idx + 1}</td>
                      <td className="py-3 px-3">
                        <span className="font-bold block">{item.product.name}</span>
                        <span className="text-xs text-steel">מק"ט: {item.product.sku} | עומס: {item.product.specs?.loadRating}</span>
                      </td>
                      <td className="py-3 px-3 text-center font-bold">{item.quantity}</td>
                      <td className="py-3 px-3 text-left font-mono" dir="ltr">₪{item.product.price}</td>
                      <td className="py-3 px-3 text-left font-mono font-bold" dir="ltr">₪{item.product.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Total Calculation */}
          <div className="border-t-2 border-ink pt-4 flex justify-between items-center text-lg font-bold">
            <span>סה"כ לתשלום / להצעה:</span>
            <span className="text-2xl text-accent font-mono" dir="ltr">₪{receipt.totalAmount.toLocaleString()}</span>
          </div>

          {/* Footer Note */}
          <div className="text-center text-xs text-steel border-t border-concrete pt-4">
            <p>תודה שבחרתם בסוליד יציקות בע"מ | מסמך זה הופק ממוחשב ונשלח למערכת ההזמנות של החברה</p>
          </div>
        </div>
      </div>
    </div>
  );
}
