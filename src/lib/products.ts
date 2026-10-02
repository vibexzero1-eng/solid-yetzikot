export type Product = {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  sku: string;
  img: string;
  badges: string[];
  specs: {
    loadRating: string;
    dimensions: string;
    weight: string;
    material: string;
  };
  description: string;
  price: number;
};

export const products: Product[] = [
  {
    id: "1",
    name: "רשתות מיצקת מסגרת מלבנית",
    category: "רשתות וקולטנים",
    categorySlug: "gratings",
    sku: "1001",
    img: "https://www.solid-yb.com/wp-content/uploads/2024/06/%D7%A8%D7%A9%D7%AA-%D7%9C%D7%A0%D7%99%D7%A7%D7%95%D7%96-%D7%A0%D7%A2%D7%99%D7%9C%D7%AA-%D7%91%D7%A8%D7%92%D7%99%D7%9D-300x189.webp",
    badges: ["יציקה", "D400", "EN-124"],
    specs: {
      loadRating: "D400",
      dimensions: "400x600 מ\"מ",
      weight: "35 ק\"ג",
      material: "ברזל יצוק דקטלי",
    },
    description: "רשתות ניקוז איכותיות מברזל יצוק דקטלי, מיועדות לכבישים ראשיים, צמתים ואזורי תנועה כבדה. מבנה מלבני ייעודי המבטיח קליטת מים מקסימלית ומניעת סתימות.",
    price: 450,
  },
  {
    id: "2",
    name: "פקקים ומסגרות רשת עגולים",
    category: "רשתות וקולטנים",
    categorySlug: "gratings",
    sku: "1002",
    img: "https://www.solid-yb.com/wp-content/uploads/2024/06/4007-%D7%A8%D7%A9%D7%AA-%D7%A0%D7%99%D7%A7%D7%95%D7%96-%D7%A0%D7%A2%D7%99%D7%9C%D7%AA-%D7%91%D7%A8%D7%92%D7%99%D7%9D-300x197.webp",
    badges: ["יציקה", "C250"],
    specs: {
      loadRating: "C250",
      dimensions: "קוטר 600 מ\"מ",
      weight: "28 ק\"ג",
      material: "ברזל יצוק",
    },
    description: "מכסי רשת עגולים המותאמים למדרכות, שולי דרכים ואזורי חניה. עמידים בפני עומסי תנועה בינוניים ומצוידים במנגנון למניעת החלקה.",
    price: 380,
  },
  {
    id: "3",
    name: "מכסים מרובעים לריצוף אבנים משתלבות",
    category: "מכסי יציקה לתאי בקרה",
    categorySlug: "covers",
    sku: "1003",
    img: "https://www.solid-yb.com/wp-content/uploads/2024/06/4150-1-300x227.webp",
    badges: ["יציקה", "B125", "עיצוב נופי"],
    specs: {
      loadRating: "B125",
      dimensions: "500x500 מ\"מ",
      weight: "22 ק\"ג",
      material: "ברזל משולב לריצוף",
    },
    description: "מכסה יציקה ייעודי למילוי באבנים משתלבות או ריצוף אבן טבעית. מאפשר שילוב אסתטי ומושלם בפיתוח נופי ובמדרחובים מבלי לפגוע בגישה לתאי הבקרה.",
    price: 520,
  },
  {
    id: "4",
    name: "מכסי יצקת לתאי בקרה מסגרת עגולה D400/F900",
    category: "מכסי יציקה לתאי בקרה",
    categorySlug: "covers",
    sku: "1004",
    img: "https://www.solid-yb.com/wp-content/uploads/2024/06/%D7%9E%D7%A1%D7%92%D7%A8%D7%AA-%D7%A2%D7%92%D7%95%D7%9C%D7%94-D400-%D7%A2%D7%9D-%D7%A0%D7%A2%D7%99%D7%9C%D7%94-300x272.webp",
    badges: ["יציקה", "F900", "נעילה כפולה"],
    specs: {
      loadRating: "F900 / D400",
      dimensions: "קוטר 800 מ\"מ",
      weight: "75 ק\"ג",
      material: "ברזל יצוק דקטלי מחוזק",
    },
    description: "מכסה יציקה מסיבי במיוחד בעל עמידות לעומסים קיצוניים של עד 90 טון (F900). מיועד למסלולי המראה, נמלים ימיים, ומסופים לוגיסטיים.",
    price: 1200,
  },
  {
    id: "5",
    name: "חוליות הגבהה מבטון 100 ס\"מ",
    category: "מוצרי בטון",
    categorySlug: "concrete",
    sku: "2001",
    img: "https://www.solid-yb.com/wp-content/uploads/2025/03/d35e5858-f9b2-4ebc-9993-0d379f747a53.png",
    badges: ["בטון", "תקן 117037"],
    specs: {
      loadRating: "תקני",
      dimensions: "קוטר 100 ס\"מ (גבהים 25-100 ס\"מ)",
      weight: "150-450 ק\"ג",
      material: "בטון מזוין טרומי",
    },
    description: "חוליות הגבהה עגולות מבטון מזוין להתאמת גובה תאי בקרה לפני השטח. מיוצרות במפעל מאושר תחת בקרת איכות קפדנית.",
    price: 300,
  },
  {
    id: "6",
    name: "תא בקרה מלבני מבטון",
    category: "מוצרי בטון",
    categorySlug: "concrete",
    sku: "2002",
    img: "https://www.solid-yb.com/wp-content/uploads/2025/04/a394be91-96af-41e6-a83f-358126fc3610.png",
    badges: ["בטון", "תשתיות"],
    specs: {
      loadRating: "D400",
      dimensions: "100x100 ס\"מ / 120x120 ס\"מ",
      weight: "400-800 ק\"ג",
      material: "בטון מזוין טרומי",
    },
    description: "תאי בקרה מלבניים טרומיים לתשתיות חשמל, תקשורת, ניקוז ומים. כוללים פתחים מובנים לכניסת צינורות והכנות לסולמות.",
    price: 1500,
  },
  {
    id: "7",
    name: "תקרה מרובעת לתא מלבני",
    category: "מוצרי בטון",
    categorySlug: "concrete",
    sku: "2003",
    img: "https://www.solid-yb.com/wp-content/uploads/2025/04/7400sid.png",
    badges: ["בטון", "תקן תקרות"],
    specs: {
      loadRating: "D400",
      dimensions: "100x100 ס\"מ",
      weight: "220 ק\"ג",
      material: "בטון מזוין",
    },
    description: "תקרת בטון מזוין מרובעת לתאי בקרה, בעלת מפתח עגול או מרובע להתקנת מכסי יציקה.",
    price: 450,
  },
  {
    id: "8",
    name: "חוליות קוניות לתאי בקרה עגולים",
    category: "מוצרי בטון",
    categorySlug: "concrete",
    sku: "2004",
    img: "https://www.solid-yb.com/wp-content/uploads/2025/03/718e4083-5387-4f52-b21b-3fe4a49f40a4.png",
    badges: ["בטון", "תשתיות"],
    specs: {
      loadRating: "תקני",
      dimensions: "קוטר 100 ל-60 ס\"מ",
      weight: "260 ק\"ג",
      material: "בטון מזוין",
    },
    description: "חוליה קונית טרומית מבטון המצמצמת את קוטר התא מ-100 ס\"מ ל-60 ס\"מ לצורך התקנת מכסה יציקה תקני.",
    price: 400,
  },
  {
    id: "9",
    name: "חיבור איטוביב (יוליה) לבריכת בטון",
    category: "אביזרים ותשתיות",
    categorySlug: "accessories",
    sku: "3001",
    img: "https://www.solid-yb.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-05-02-at-12.37.04.jpeg",
    badges: ["אטימה", "אביזר"],
    specs: {
      loadRating: "N/A",
      dimensions: "קטרים 110-315 מ\"מ",
      weight: "3.5 ק\"ג",
      material: "אלסטומר קשיח + אטם גומי",
    },
    description: "אטם גמיש תקני מסוג איטוביב לחיבור אטום לחלוטין בין צינור ניקוז/ביוב לתאי בטון. מונע חדירת מי תהום ודליפות שפכים.",
    price: 85,
  },
  {
    id: "10",
    name: "מכסי כובע 2 חלקים לתאי בקרה",
    category: "מוצרים משולבים",
    categorySlug: "hybrid",
    sku: "1005",
    img: "https://www.solid-yb.com/wp-content/uploads/2024/10/3603.jpg",
    badges: ["משולב", "בטון + יציקה"],
    specs: {
      loadRating: "D400",
      dimensions: "קוטר 600 מ\"מ",
      weight: "65 ק\"ג",
      material: "מסגרת יציקה + גוף בטון",
    },
    description: "פתרון משולב המשלב מכסה יציקה חזק עם טבעת בטון היקפית, מונע שקיעות כביש ומבטיח התקנה מהירה וחלקה.",
    price: 680,
  },
  {
    id: "11",
    name: "מכסי יצקת לתאי בזק וחשמל",
    category: "מכסי יציקה לתאי בקרה",
    categorySlug: "covers",
    sku: "1006",
    img: "https://www.solid-yb.com/wp-content/uploads/2024/06/4150-1-300x227.webp",
    badges: ["חשמל ותקשורת", "C250"],
    specs: {
      loadRating: "C250 / D400",
      dimensions: "600x600 מ\"מ",
      weight: "48 ק\"ג",
      material: "ברזל יצוק דקטלי",
    },
    description: "מכסים ייעודיים לבריכות תקשורת וחשמל בעלי סימון מוטבע 'חשמל' / 'בזק' ומנגנון נעילה נגד גניבות ופתחי גישה בטיחותיים.",
    price: 590,
  },
  {
    id: "12",
    name: "קולטנים ותאי תפיסה לבטון",
    category: "מוצרי בטון",
    categorySlug: "concrete",
    sku: "2005",
    img: "https://www.solid-yb.com/wp-content/uploads/2025/04/a394be91-96af-41e6-a83f-358126fc3610.png",
    badges: ["ניקוז", "בטון"],
    specs: {
      loadRating: "D400",
      dimensions: "50x100 ס\"מ",
      weight: "320 ק\"ג",
      material: "בטון מזוין + רשת יציקה",
    },
    description: "תאי תפיסה וקולטני ניקוז לצד המדרכה, כולל רשת יציקה עמידה לקליטה מהירה של ניקוז נגר עילי.",
    price: 950,
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (!categorySlug || categorySlug === "all") return products;
  return products.filter(p => p.categorySlug === categorySlug);
}
