import { MessageCircle, Phone, Navigation } from "lucide-react";
import { COMPANY_CONTACT } from "@/lib/contact";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a 
        href={`https://wa.me/${COMPANY_CONTACT.whatsappNumber}?text=${encodeURIComponent("שלום הגעתי מהאתר ורציתי לבצע הזמנה / לשאול שאלה")}`}
        target="_blank" 
        rel="noreferrer"
        className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative group"
        aria-label="שלח וואטסאפ להזמנות"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-ink text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          וואטסאפ להזמנות ({COMPANY_CONTACT.whatsappPhone})
        </span>
      </a>
      <a 
        href={`tel:${COMPANY_CONTACT.officePhoneTel}`} 
        className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative group"
        aria-label="התקשר אלינו"
      >
        <Phone className="w-6 h-6" />
        {/* Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-ink text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          טלפון משרד: {COMPANY_CONTACT.officePhone} ({COMPANY_CONTACT.workingHours})
        </span>
      </a>
      <a 
        href={COMPANY_CONTACT.wazeUrl} 
        target="_blank" 
        rel="noreferrer"
        className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="נווט אלינו עם Waze"
      >
        <Navigation className="w-6 h-6" />
      </a>
    </div>
  );
}
