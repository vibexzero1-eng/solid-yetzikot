"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Search, Phone, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { COMPANY_CONTACT } from "@/lib/contact";

export default function Header() {
  const [activeSection, setActiveSection] = useState<string>("");
  const { totalItems, openDrawer } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["categories", "catalog", "certificates", "about", "contact"];
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-concrete shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex-1 flex justify-start">
          <Link href="/" onClick={handleHomeClick} className="flex items-center gap-2">
            <img src="https://www.solid-yb.com/wp-content/uploads/2024/06/לוגו.png" alt="סוליד יציקות" className="h-10 w-auto object-contain" />
          </Link>
        </div>
          
        <nav className="hidden md:flex flex-1 justify-center items-center gap-6 text-steel font-medium">
          <Link href="/" onClick={handleHomeClick} className={`hover:text-accent transition-colors ${activeSection === "" ? "text-accent font-bold" : ""}`}>
            דף הבית
          </Link>
          <a href="/#categories" className={`hover:text-accent transition-colors ${activeSection === "categories" ? "text-accent font-bold" : ""}`}>
            פתרונות
          </a>
          <a href="/#catalog" className={`hover:text-accent transition-colors ${activeSection === "catalog" ? "text-accent font-bold" : ""}`}>
            קטלוג
          </a>
          <a href="/#certificates" className={`hover:text-accent transition-colors ${activeSection === "certificates" ? "text-accent font-bold" : ""}`}>
            תקנים
          </a>
          <a href="/#about" className={`hover:text-accent transition-colors ${activeSection === "about" ? "text-accent font-bold" : ""}`}>
            אודות
          </a>
          <a href="/#contact" className={`hover:text-accent transition-colors ${activeSection === "contact" ? "text-accent font-bold" : ""}`}>
            צור קשר
          </a>
        </nav>

        <div className="flex-1 flex justify-end items-center gap-4">
          <a href={`tel:${COMPANY_CONTACT.officePhoneTel}`} className="hidden lg:flex items-center gap-2 text-steel hover:text-accent transition-colors">
            <Phone className="w-5 h-5" />
            <bdi className="font-medium">{COMPANY_CONTACT.officePhone}</bdi>
          </a>
          <button className="p-2 text-steel hover:text-accent transition-colors" aria-label="חיפוש">
            <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={openDrawer}
            className="p-2 text-steel hover:text-accent transition-colors relative" 
            aria-label="עגלת בקשות"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </button>
          <Link 
            href="/#contact"
            className="hidden md:flex items-center justify-center px-4 py-2 bg-accent text-white font-medium rounded hover:bg-accent-dark transition-colors"
          >
            בקשת הצעת מחיר
          </Link>
          <button className="md:hidden p-2 text-steel hover:text-accent transition-colors" aria-label="תפריט">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
