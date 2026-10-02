import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { COMPANY_CONTACT } from "@/lib/contact";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-iron text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="bg-white px-4 py-2.5 rounded-2xl shadow-md inline-flex items-center">
                <img src="https://www.solid-yb.com/wp-content/uploads/2024/06/לוגו.png" alt="סוליד יציקות בע&quot;מ" className="h-10 w-auto object-contain" />
              </div>
            </Link>
            <p className="text-steel-light text-sm leading-relaxed text-gray-300">
              מוצרי יצקת, מוצרי בטון, מכסי בטון, מכסה יצקת, פיילר, גומחה לתקשורת, רשתות לקולטן. אנו מספקים פתרונות תשתית מתקדמים לכל פרויקט.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-heading mb-4 text-accent">קישורים מהירים</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">דף הבית</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">קטלוג מוצרים</Link></li>
              <li><Link href="/solutions" className="hover:text-white transition-colors">פתרונות הנדסיים</Link></li>
              <li><Link href="/standards" className="hover:text-white transition-colors">תעודות ותקנים</Link></li>
              <li><Link href="/quote" className="hover:text-white transition-colors">בקשת הצעת מחיר</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold text-heading mb-4 text-accent">מידע משפטי</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">אודות החברה</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">מדיניות פרטיות</Link></li>
              <li><Link href="/accessibility" className="hover:text-white transition-colors">הצהרת נגישות</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">תנאי שימוש</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-heading mb-4 text-accent">דרכי קשר</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${COMPANY_CONTACT.officePhoneTel}`} className="block font-bold hover:text-white transition-colors" dir="ltr">
                    {COMPANY_CONTACT.officePhone}
                  </a>
                  <span className="text-xs text-gray-400">טלפון משרד ({COMPANY_CONTACT.workingHours})</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <a href={`https://wa.me/${COMPANY_CONTACT.whatsappNumber}`} target="_blank" rel="noreferrer" className="block font-bold hover:text-white transition-colors" dir="ltr">
                    {COMPANY_CONTACT.whatsappPhone}
                  </a>
                  <span className="text-xs text-gray-400">וואטסאפ להזמנות</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href={`mailto:${COMPANY_CONTACT.email}`} className="hover:text-white transition-colors" dir="ltr">
                  {COMPANY_CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>
                  {COMPANY_CONTACT.address}<br />
                  <a href={COMPANY_CONTACT.wazeUrl} target="_blank" rel="noreferrer" className="text-xs text-accent hover:underline">נווט עם Waze</a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-steel/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© {currentYear} סוליד יציקות בע"מ. כל הזכויות שמורות.</p>
          <div className="flex gap-4">
            <span>בונים את התשתית לעתיד ישראל.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
