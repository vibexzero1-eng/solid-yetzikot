"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Factory, HardHat, Truck, ArrowLeft, Phone, MapPin, ChevronDown, ShieldCheck, Award, TrendingUp, Users, ChevronLeft, ChevronRight, ShoppingCart, ExternalLink, FileText } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { products } from "@/lib/products";
import { solutions } from "@/lib/solutions";
import InfiniteMarquee from "@/components/ui/InfiniteMarquee";
import ReceiptModal from "@/components/cart/ReceiptModal";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY_CONTACT } from "@/lib/contact";

const heroImages = [
  "/images/hero_manhole.jpg",
  "https://www.solid-yb.com/wp-content/uploads/2024/06/4150-1-300x227.webp",
  "https://www.solid-yb.com/wp-content/uploads/2024/06/%D7%9E%D7%A1%D7%92%D7%A8%D7%AA-%D7%A2%D7%92%D7%95%D7%9C%D7%94-D400-%D7%A2%D7%9D-%D7%A0%D7%A2%D7%99%D7%9C%D7%94-300x272.webp"
];

const certificatesList = [
  { 
    id: 'c1',
    title: 'תו תקן למפעל בטון', 
    desc: 'היתר מספר 117037 לסמן מצרך בתו תקן למפעל ליצור אלמנטים מבטון', 
    img: 'https://www.solid-yb.com/wp-content/uploads/2026/02/p0686006539_FFPDF-Hebrew-98307.PDF-2-1024x724.jpg',
    link: 'https://www.solid-yb.com/wp-content/uploads/2026/02/p0686006539_FFPDF-Hebrew-98307.PDF-2-1024x724.jpg' 
  },
  { 
    id: 'c2',
    title: 'אישור ISO 9001:2015', 
    desc: 'מערכת ניהול איכות מאושרת ISO 9001:2015 לתכנון, ייצור ואספקת יציקות', 
    img: 'https://www.solid-yb.com/wp-content/uploads/2025/06/עיצוב-ללא-שם-28.jpg',
    link: 'https://www.solid-yb.com/wp-content/uploads/2025/06/עיצוב-ללא-שם-28.jpg' 
  },
  { 
    id: 'c3',
    title: 'אישור IQNET הבינלאומי', 
    desc: 'The International Certification Network 98307', 
    img: 'https://www.solid-yb.com/wp-content/uploads/2025/07/p0686006538_FFPDF-IQNET-98307.PDF-1-724x1024.jpg',
    link: 'https://www.solid-yb.com/wp-content/uploads/2025/07/p0686006538_FFPDF-IQNET-98307.PDF-1-724x1024.jpg' 
  },
  { 
    id: 'c4',
    title: 'תקן אירופאי EN-124', 
    desc: 'תקן אירופאי וישראלי למכסי יציקה ורשתות ניקוז (D400 / F900)', 
    img: 'https://www.solid-yb.com/wp-content/uploads/2026/02/תקנים-באנגלית-.pdf-1-1024x724.jpg',
    link: 'https://www.solid-yb.com/wp-content/uploads/2026/02/תקנים-באנגלית-.pdf-1-1024x724.jpg' 
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [heroImgIdx, setHeroImgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImgIdx((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const faqs = [
    {
      q: "האם המוצרים שלכם עומדים בתקנים הנדרשים?",
      a: "בהחלט. כל מוצרי סוליד יציקות בע\"מ, מיוצרים תחת בקרת איכות קפדנית ועומדים בתקנים המחמירים ביותר כגון תקן EN124 ותקני מכון התקנים הישראלי, תוך התאמה לדרישות הפרויקט."
    },
    {
      q: "מהם זמני האספקה שלכם?",
      a: "אנו גאים במערך הלוגיסטיקה היעיל שלנו המאפשר אספקה מהירה לכל רחבי הארץ. למוצרי מדף, זמן האספקה הוא לרוב מיידי או תוך מספר ימי עסקים. להזמנות ייעודיות, ניידע אתכם מראש לגבי זמני הייצור."
    },
    {
      q: "האם ניתן להזמין מוצרי יצקת ובטון לפי מידות מיוחדות?",
      a: "כן, בנוסף למגוון הרחב של מוצרי המדף, אנו מספקים פתרונות מותאמים אישית (Custom Casting) וייצור תבניות בטון מיוחדות בהתאם למפרט הטכני של הקבלן או היזם."
    },
    {
      q: "כיצד אדע איזו דרגת עומס מתאימה לפרויקט שלי?",
      a: "צוות המהנדסים והיועצים המקצועי שלנו ישמח לסייע לכם. באופן כללי: A15 (להולכי רגל), B125 (מדרכות וחניונים קלים), C250 (חניונים ורחובות), D400 (כבישים ראשיים) עד F900 (שדות תעופה ונמלים)."
    }
  ];

  const { items, totalItems, clearCart } = useCart();
  const [homeReceipt, setHomeReceipt] = useState<any>(null);
  const [showHomeReceiptModal, setShowHomeReceiptModal] = useState(false);
  const [homeFormSubmitted, setHomeFormSubmitted] = useState(false);
  const [homeLoading, setHomeLoading] = useState(false);
  const [homeFormData, setHomeFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    details: ""
  });

  const handleHomeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHomeLoading(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...homeFormData,
          items
        })
      });
      const data = await res.json();
      if (data.success) {
        setHomeReceipt(data.receipt);
        setHomeFormSubmitted(true);
        clearCart();
      } else {
        alert(data.error || "אירעה שגיאה בשליחת הפנייה");
      }
    } catch (err) {
      console.error(err);
      alert("אירעה שגיאה בתקשורת עם השרת");
    } finally {
      setHomeLoading(false);
    }
  };

  // Multiplied products array to ensure continuous ticker never disappears
  const marqueeProducts1 = [...products, ...products, ...products, ...products];
  const marqueeProducts2 = [...products].reverse().concat([...products].reverse()).concat([...products].reverse()).concat([...products].reverse());

  return (
    <div className="flex flex-col overflow-hidden">
      {/* 1. Hero Section & Color Palette */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-ink text-white overflow-hidden">
        {/* Dynamic Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-[#2a130a] to-[#F26B1D]/30 z-0"></div>
        {/* Subtle technical grid pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Right Side: Hero Content Layout */}
            <motion.div 
              initial="hidden" animate="show" variants={staggerContainer}
              className="order-2 lg:order-1 text-right max-w-2xl"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                מייצרים את התשתית של המחר
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold text-heading leading-tight mb-6 tracking-tight">
                פתרונות תשתית <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-accent to-[#ff9e5e]">ללא פשרות.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-gray-300 mb-8 max-w-lg">
                סוליד יציקות מספקת פתרונות מתקדמים מיציקת ברזל ובטון עבור פרויקטי התשתית הגדולים בישראל. איכות, בטיחות ועמידה בתקנים המחמירים ביותר.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#contact" className="px-8 py-4 bg-accent text-white font-bold rounded-2xl hover:bg-accent-dark transition-all shadow-[0_0_20px_rgba(242,107,29,0.3)] hover:shadow-[0_0_30px_rgba(242,107,29,0.5)] hover:-translate-y-1 text-center text-lg flex items-center justify-center gap-2">
                  בקשת הצעת מחיר
                  <ArrowLeft className="w-5 h-5" />
                </a>
                <a href="#catalog" className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-1 text-center text-lg">
                  לצפייה בקטלוג
                </a>
              </motion.div>
              
              {/* Quick Call Banner */}
              <motion.div variants={fadeUp} className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 inline-flex">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">התייעצות מיידית וטלפון משרד</p>
                  <a href={`tel:${COMPANY_CONTACT.officePhoneTel}`} className="text-xl font-bold font-heading hover:text-accent transition-colors" dir="ltr">{COMPANY_CONTACT.officePhone}</a>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Left Side: Interactive Media Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 relative perspective-1000"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl transform rotate-y-[-5deg] rotate-x-[2deg] transition-transform hover:rotate-0 duration-700 bg-iron h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={heroImgIdx}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 0.8, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    src={heroImages[heroImgIdx]} 
                    alt="סוליד יציקות פתרונות" 
                    className="w-full h-full object-cover mix-blend-lighten absolute inset-0" 
                  />
                </AnimatePresence>
                
                {/* Embedded quick-filter tab pills */}
                <div className="absolute top-6 right-6 left-6 flex flex-wrap gap-2 justify-center backdrop-blur-md bg-ink/40 p-2 rounded-2xl border border-white/10 z-10">
                  <Link href="/products" className="px-4 py-2 bg-accent text-white text-sm font-bold rounded-xl shadow-lg hover:bg-accent-dark transition-colors">יציקות ברזל</Link>
                  <Link href="/products" className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-xl cursor-pointer transition-colors">מוצרי בטון</Link>
                  <Link href="/products" className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-xl cursor-pointer transition-colors">פתרונות משולבים</Link>
                </div>
                
                {/* Decorative Element */}
                <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-3 z-10">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">100% בקרת איכות</p>
                    <p className="text-xs text-gray-300">תקן EN124 & ISO 9001</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar (Floating) */}
      <motion.section 
        initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
        className="relative z-20 -mt-10 mb-10"
      >
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-concrete p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-x-reverse divide-concrete">
              <div className="text-center px-4">
                <p className="text-3xl md:text-4xl font-bold text-ink mb-1 font-heading">1,200+</p>
                <p className="text-sm text-steel font-medium">פרויקטים בוצעו</p>
              </div>
              <div className="text-center px-4">
                <p className="text-3xl md:text-4xl font-bold text-ink mb-1 font-heading">100%</p>
                <p className="text-sm text-steel font-medium">עמידה בתקנים</p>
              </div>
              <div className="text-center px-4">
                <p className="text-3xl md:text-4xl font-bold text-ink mb-1 font-heading">30+</p>
                <p className="text-sm text-steel font-medium">שנות ניסיון</p>
              </div>
              <div className="text-center px-4">
                <p className="text-3xl md:text-4xl font-bold text-ink mb-1 font-heading text-accent">24/7</p>
                <p className="text-sm text-steel font-medium">אספקה ארצית</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. Continuous Product Marquee Transition ("רכבת מוצרים") */}
      <section id="about" className="py-20 scroll-mt-20 overflow-hidden bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left/Image Side with Dual Train Animation Ticker */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden border-2 border-concrete shadow-xl relative z-10 bg-white p-4 h-[520px] flex flex-col justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white z-20 pointer-events-none"></div>
                
                {/* Infinite Looping Ticker Marquees (No gaps ever) */}
                <div className="flex flex-col gap-6 -rotate-6 scale-105">
                  <InfiniteMarquee products={products} reverse={false} speed={28} cardSize="sm" />
                  <InfiniteMarquee products={[...products].reverse()} reverse={true} speed={22} cardSize="sm" />
                </div>
              </div>
            </motion.div>

            {/* Right/Text Side */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
              <motion.div variants={fadeUp} className="inline-block px-4 py-1 bg-accent/10 text-accent font-bold rounded-full mb-4 text-sm">
                הסיפור שלנו
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-heading text-ink mb-6 leading-tight">
                נבנה על בסיס <span className="text-accent">ניסיון</span><br />ומוניטין של שנים.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-steel mb-8 leading-relaxed">
                סוליד יציקות מתמחה בייצור ואספקת פתרונות תשתית מתקדמים. הניסיון העשיר שלנו מאפשר לנו לספק מוצרים איכותיים שמחזיקים מעמד בתנאים הקיצוניים ביותר, תוך עמידה מדויקת בלוחות זמנים והתאמה הנדסית מלאה לפרויקט שלכם.
              </motion.p>
              
              <motion.ul variants={fadeUp} className="space-y-4 mb-8">
                {[
                  "בקרת איכות מחמירה מפס הייצור ועד לאתר.",
                  "פתרונות היברידיים מותאמים אישית.",
                  "ייעוץ מקצועי לבחירת דרגת עומס תקנית.",
                  "גמישות ייצור ויכולת אספקה לפרויקטים ענקיים."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm border border-concrete">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-medium text-ink leading-relaxed">{item}</span>
                  </li>
                ))}
              </motion.ul>

              {/* Integrated Expert Team Badge */}
              <motion.div 
                variants={fadeUp}
                className="mb-8 p-5 bg-ink text-white rounded-2xl shadow-lg border border-iron/20 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">צוות מומחים הנדסי</h4>
                  <p className="text-xs text-gray-300">ליווי הנדסי ומקצועי לאורך כל שלבי הפרויקט - מתוכנית ועד אספקה לאתר.</p>
                </div>
              </motion.div>

              <motion.a variants={fadeUp} href="#contact" className="inline-flex items-center gap-2 font-bold text-accent hover:text-accent-dark transition-colors text-lg">
                דברו איתנו עכשיו
                <ArrowLeft className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expert Services Grid (Entire Card Clickable to Dynamic Solutions) */}
      <section id="categories" className="py-24 bg-ink scroll-mt-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">קטגוריות פתרונות</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg">
              לחצו על כל קטגוריה לצפייה במפרט ההנדסי והפתרונות המלאים.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {solutions.map((sol) => (
              <motion.div variants={fadeUp} key={sol.id}>
                <Link
                  href={`/solutions/${sol.id}`}
                  className="group bg-[#1E2328] p-8 rounded-3xl border border-[#2B3036] hover:border-accent hover:shadow-[0_10px_30px_rgba(242,107,29,0.2)] transition-all hover:-translate-y-2 flex flex-col justify-between h-full cursor-pointer block"
                >
                  <div>
                    <div className="w-16 h-16 bg-[#2B3036] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                      <Factory className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">{sol.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {sol.shortDesc}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 text-sm font-bold text-accent group-hover:translate-x-[-4px] transition-transform">
                    לצפייה בפתרון המלא <ArrowLeft className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Catalog Carousel & Continuous Marquee */}
      <section id="catalog" className="py-24 bg-white scroll-mt-20 border-t border-concrete overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="flex justify-between items-end mb-12">
            <div>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-ink mb-4 font-heading">מוצרים במוקד</motion.h2>
              <motion.p variants={fadeUp} className="text-steel text-lg">דוגמאות נבחרות מהקטלוג המקצועי שלנו - לחץ על מוצר לצפייה במפרט מלא</motion.p>
            </div>
            <motion.div variants={fadeUp} className="hidden md:flex gap-2">
              <Link href="/products" className="px-6 py-3 bg-accent text-white font-bold rounded-2xl hover:bg-accent-dark transition-all shadow-md flex items-center gap-2">
                לכל הקטלוג המלא
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Marquee Train Track for Catalog Items (No gaps ever) */}
          <div className="w-full relative">
            <InfiniteMarquee products={products} reverse={false} speed={30} cardSize="lg" />
          </div>
        </div>
      </section>

      {/* Real Certificates & Standards Section */}
      <section id="certificates" className="py-24 bg-surface border-t border-concrete scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-16">
            <motion.div variants={fadeUp} className="inline-flex px-4 py-1 bg-accent/10 text-accent font-bold rounded-full mb-4 text-sm">
              איכות ובקרה
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-ink font-heading">תקנים ואישורים רשמיים</motion.h2>
            <motion.p variants={fadeUp} className="text-steel text-lg max-w-2xl mx-auto mt-4">
              כל מוצרי סוליד יציקות מיוצרים תחת בקרת איכות קפדנית ועומדים בתקנים המחמירים ביותר של מכון התקנים הישראלי והתקן האירופאי.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {certificatesList.map((cert) => (
              <motion.div key={cert.id} variants={fadeUp} className="bg-white rounded-3xl border border-concrete hover:border-accent hover:shadow-xl transition-all text-center flex flex-col justify-between overflow-hidden group">
                <div className="h-56 bg-ink/5 p-3 relative flex items-center justify-center border-b border-concrete overflow-hidden">
                  <img src={cert.img} alt={cert.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-xl" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-ink text-lg mb-2 font-heading">{cert.title}</h3>
                  <p className="text-xs text-steel mb-4 leading-relaxed">{cert.desc}</p>
                  <a href={cert.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-accent text-sm font-bold hover:underline">
                    <ExternalLink className="w-4 h-4" /> צפה בתעודה הרשמית
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link href="/standards" className="px-8 py-3.5 bg-ink text-white font-bold rounded-2xl hover:bg-accent transition-all shadow-md inline-flex items-center gap-2">
              צפה בכל התעודות וההיתרים (PDF)
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="py-24 bg-white border-t border-concrete">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-16">
            <motion.div variants={fadeUp} className="inline-flex px-4 py-1 bg-ink/5 text-ink font-bold rounded-full mb-4 text-sm">
              שאלות נפוצות
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-ink font-heading">כל המידע שאתם צריכים</motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div variants={fadeUp} 
                key={idx} 
                className={`bg-surface border rounded-2xl overflow-hidden transition-all duration-300 ${activeFaq === idx ? "border-accent shadow-md" : "border-concrete hover:border-iron"}`}
              >
                <button 
                  className="w-full text-right px-6 py-5 flex items-center justify-between font-bold text-lg text-ink focus:outline-none"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-steel transition-transform duration-300 ${activeFaq === idx ? "rotate-180 text-accent" : ""}`} />
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ${activeFaq === idx ? "max-h-48 pb-6 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="text-steel leading-relaxed">{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Receipt Modal for Home Form */}
      {showHomeReceiptModal && homeReceipt && (
        <ReceiptModal receipt={homeReceipt} onClose={() => setShowHomeReceiptModal(false)} />
      )}

      {/* Embedded Quote/Contact Form */}
      <section id="contact" className="py-24 bg-ink scroll-mt-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col lg:flex-row max-w-6xl mx-auto"
          >
            {/* Form Side */}
            <div className="lg:w-3/5 p-8 md:p-16">
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4 font-heading">קבלו הצעת מחיר</h2>
                <p className="text-steel text-lg">
                  מלאו את הפרטים והצוות שלנו יחזור אליכם עם הצעה מדויקת בהקדם.
                </p>
              </div>

              {homeFormSubmitted && homeReceipt ? (
                <div className="p-8 bg-surface rounded-3xl border border-concrete text-center space-y-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-ink font-heading mb-2">הפנייה נשלחה בהצלחה!</h3>
                    <p className="text-sm text-steel mb-4">
                      מסמך קבלה/אישור פנייה <strong>#{homeReceipt.receiptNumber}</strong> הונפק ונשלח לדוא"ל החברה (solidyb@solid-yb.com) ולכתובתכם.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => setShowHomeReceiptModal(true)}
                      className="px-6 py-3 bg-accent text-white font-bold rounded-xl shadow-md hover:bg-accent-dark transition-all flex items-center justify-center gap-2"
                    >
                      <FileText className="w-4 h-4" /> הצג / הדפס קבלה
                    </button>
                    <button
                      onClick={() => setHomeFormSubmitted(false)}
                      className="px-6 py-3 bg-white border border-concrete font-bold text-steel rounded-xl hover:text-ink transition-all"
                    >
                      שלח פנייה נוספת
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {items.length > 0 && (
                    <div className="mb-8 p-6 bg-surface border border-accent/20 rounded-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-1 h-full bg-accent"></div>
                      <h3 className="font-bold text-ink mb-3 flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-accent" />
                        הצעת מחיר עבור {totalItems} מוצרים שנבחרו בעגלה
                      </h3>
                      <ul className="space-y-2">
                        {items.map(item => (
                          <li key={item.product.id} className="text-sm flex items-center justify-between">
                            <span className="text-steel">{item.product.name} (מק"ט: {item.product.sku})</span>
                            <div className="flex items-center gap-4">
                              <span className="font-bold text-ink">₪{(item.product.price * item.quantity).toLocaleString()}</span>
                              <span className="font-bold bg-white px-2 py-1 rounded border border-concrete">כמות: {item.quantity}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-4 border-t border-concrete flex items-center justify-between">
                        <span className="font-bold text-ink">סה״כ משוער:</span>
                        <span className="text-xl font-bold text-accent">₪{items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleHomeSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-ink mb-2">שם מלא *</label>
                        <input
                          type="text"
                          required
                          value={homeFormData.name}
                          onChange={(e) => setHomeFormData({ ...homeFormData, name: e.target.value })}
                          className="w-full px-5 py-4 bg-surface border border-concrete rounded-2xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                          placeholder="ישראל ישראלי"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-ink mb-2">חברה / פרויקט</label>
                        <input
                          type="text"
                          value={homeFormData.company}
                          onChange={(e) => setHomeFormData({ ...homeFormData, company: e.target.value })}
                          className="w-full px-5 py-4 bg-surface border border-concrete rounded-2xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                          placeholder="שם החברה"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-ink mb-2">טלפון *</label>
                        <input
                          type="tel"
                          required
                          dir="ltr"
                          value={homeFormData.phone}
                          onChange={(e) => setHomeFormData({ ...homeFormData, phone: e.target.value })}
                          className="w-full px-5 py-4 bg-surface border border-concrete rounded-2xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-right"
                          placeholder={COMPANY_CONTACT.whatsappPhone}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-ink mb-2">דוא"ל לקבלת קבלה</label>
                        <input
                          type="email"
                          dir="ltr"
                          value={homeFormData.email}
                          onChange={(e) => setHomeFormData({ ...homeFormData, email: e.target.value })}
                          className="w-full px-5 py-4 bg-surface border border-concrete rounded-2xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-right"
                          placeholder={COMPANY_CONTACT.email}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-ink mb-2">פרטי הבקשה</label>
                      <textarea
                        rows={4}
                        value={homeFormData.details}
                        onChange={(e) => setHomeFormData({ ...homeFormData, details: e.target.value })}
                        className="w-full px-5 py-4 bg-surface border border-concrete rounded-2xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all resize-none"
                        placeholder="איזה מוצרים נדרשים? כמויות? דרישות מיוחדות?"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={homeLoading}
                      className="w-full py-5 bg-accent text-white font-bold rounded-2xl hover:bg-accent-dark transition-all text-lg shadow-[0_5px_15px_rgba(242,107,29,0.3)] hover:-translate-y-1 disabled:opacity-50"
                    >
                      {homeLoading ? "שולח ומפיק קבלה..." : "שלח פנייה והפק קבלה"}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Info Side */}
            <div className="lg:w-2/5 bg-surface p-8 md:p-16 flex flex-col justify-center border-t lg:border-t-0 lg:border-r border-concrete">
              <h3 className="text-2xl font-bold text-ink mb-8 font-heading">פרטי התקשורת שלנו</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <span className="block text-sm text-steel mb-1 font-bold">טלפון משרד ({COMPANY_CONTACT.workingHours})</span>
                    <a href={`tel:${COMPANY_CONTACT.officePhoneTel}`} className="text-2xl font-bold text-ink hover:text-accent transition-colors font-heading" dir="ltr">{COMPANY_CONTACT.officePhone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <span className="block text-sm text-steel mb-1 font-bold">וואטסאפ להזמנות</span>
                    <a href={`https://wa.me/${COMPANY_CONTACT.whatsappNumber}`} target="_blank" rel="noreferrer" className="text-xl font-bold text-ink hover:text-green-600 transition-colors block mb-1 font-mono" dir="ltr">
                      {COMPANY_CONTACT.whatsappPhone}
                    </a>
                    <a href={`https://wa.me/${COMPANY_CONTACT.whatsappNumber}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-bold text-green-600 hover:text-green-700 transition-colors">
                      פתיחת צ'אט WhatsApp להזמנות
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                    <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <span className="block text-sm text-steel mb-1 font-bold">דואר אלקטרוני</span>
                    <a href={`mailto:${COMPANY_CONTACT.email}`} className="text-lg font-bold text-ink hover:text-accent transition-colors block mb-2" dir="ltr">{COMPANY_CONTACT.email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <span className="block text-sm text-steel mb-1 font-bold">כתובת ומפעל</span>
                    <span className="text-lg font-bold text-ink block mb-2">אזור תעשייה עמנואל</span>
                    <a href="https://ul.waze.com/ul?ll=32.17012733%2C35.15189409&navigate=yes" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-bold text-accent hover:text-accent-dark">
                      נווט עם Waze <ArrowLeft className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-white rounded-2xl border border-concrete shadow-sm">
                <p className="text-sm text-steel font-bold leading-relaxed text-center">
                  זקוקים למידע נוסף או לייעוץ טכני? הצוות שלנו עומד לרשותכם בכל שאלה הנדסית.
                </p>
              </div>
            </div>
            
          </motion.div>
        </div>
      </section>
    </div>
  );
}
