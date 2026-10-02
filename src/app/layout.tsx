import type { Metadata } from "next";
import { Heebo, Assistant } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | סוליד יציקות בע\"מ",
    default: "סוליד יציקות בע\"מ - בונים את התשתית לעתיד ישראל",
  },
  description: "יצרנית וספקית של מוצרי תשתית לכבישים, פיתוח, ניקוז, ביוב, חשמל ותקשורת ברחבי ישראל. מוצרי יצקת, בטון ומוצרים משולבים באיכות הגבוהה ביותר.",
  verification: {
    google: "DVoOc9z2IOo3eU2RCGq06sthl6ncsJnoJgGreQOuKss",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${assistant.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-surface text-ink">
        <CartProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <FloatingActions />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
