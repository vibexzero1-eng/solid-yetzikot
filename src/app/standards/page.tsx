import Link from "next/link";
import { ShieldCheck, Award, ArrowLeft, Download, ExternalLink, CheckCircle2 } from "lucide-react";

const certificates = [
  {
    id: "iso-9001",
    title: "אישור ISO 9001:2015",
    category: "ניהול איכות",
    number: "IQNET / ISO 9001",
    desc: "מערכת ניהול איכות מאושרת לפי תקן ISO 9001:2015 לתכנון, ייצור ואספקת מוצרי יציקה ובטון.",
    img: "https://www.solid-yb.com/wp-content/uploads/2025/06/עיצוב-ללא-שם-28.jpg",
    pdf: "https://www.solid-yb.com/wp-content/uploads/2025/06/עיצוב-ללא-שם-28.jpg"
  },
  {
    id: "iqnet",
    title: "תעודת IQNET הבינלאומית",
    category: "תקן בינלאומי",
    number: "IQNET 98307",
    desc: "אישור הרשת הבינלאומית להסמכת איכות IQNET המכירה באיכות מוצרי סוליד יציקות בעולם.",
    img: "https://www.solid-yb.com/wp-content/uploads/2025/07/p0686006538_FFPDF-IQNET-98307.PDF-1-724x1024.jpg",
    pdf: "https://www.solid-yb.com/wp-content/uploads/2025/07/p0686006538_FFPDF-IQNET-98307.PDF-1-724x1024.jpg"
  },
  {
    id: "concrete-factory",
    title: "תו תקן למפעל לייצור אלמנטים מבטון",
    category: "מכון התקנים הישראלי",
    number: "תקן 117037",
    desc: "היתר רשמי ממינהל התקניזציה במכון התקנים הישראלי כמפעל מאושר לייצור אלמנטים טרומיים מבטון.",
    img: "https://www.solid-yb.com/wp-content/uploads/2026/02/תקנים-סוליד-.pdf-1024x724.jpg",
    pdf: "https://www.solid-yb.com/wp-content/uploads/2026/02/תקנים-סוליד-.pdf-1024x724.jpg"
  },
  {
    id: "permit-117037",
    title: "היתר תו תקן מספר 117037",
    category: "מכון התקנים הישראלי",
    number: "117037",
    desc: "היתר לסמן מצרך בתו תקן עבור תאי בקרה עגולים ומרובעים ואלמנטים מבטון מזוין.",
    img: "https://www.solid-yb.com/wp-content/uploads/2026/02/p0686006539_FFPDF-Hebrew-98307.PDF-2-1024x724.jpg",
    pdf: "https://www.solid-yb.com/wp-content/uploads/2026/02/p0686006539_FFPDF-Hebrew-98307.PDF-2-1024x724.jpg"
  },
  {
    id: "permit-103522",
    title: "היתר תו תקן מספר 103522",
    category: "מכון התקנים הישראלי",
    number: "103522",
    desc: "היתר לסמן מצרך בתו תקן עבור חוליות הגבהה ותאי בקרה לתשתיות ניקוז וביוב.",
    img: "https://www.solid-yb.com/wp-content/uploads/2026/02/p0686006539_FFPDF-Hebrew-98307.PDF-1-1024x724.jpg",
    pdf: "https://www.solid-yb.com/wp-content/uploads/2026/02/p0686006539_FFPDF-Hebrew-98307.PDF-1-1024x724.jpg"
  },
  {
    id: "permit-109938",
    title: "היתר תו תקן מספר 109938",
    category: "מכון התקנים הישראלי",
    number: "109938",
    desc: "היתר לסמן מצרך בתו תקן עבור מכסי יציקה מברזל דקטלי ורשתות ניקוז.",
    img: "https://www.solid-yb.com/wp-content/uploads/2026/02/p0686006539_FFPDF-Hebrew-98307.PDF-3-1024x724.jpg",
    pdf: "https://www.solid-yb.com/wp-content/uploads/2026/02/p0686006539_FFPDF-Hebrew-98307.PDF-3-1024x724.jpg"
  },
  {
    id: "en-124",
    title: "תקן אירופאי EN-124",
    category: "תקן אירופאי",
    number: "EN-124 A15 to F900",
    desc: "אישור התאמה מלא לתקן האירופאי EN-124 עבור מכסי יציקה וסבכות ניקוז לעומסים כבדים.",
    img: "https://www.solid-yb.com/wp-content/uploads/2026/02/תקנים-באנגלית-.pdf-1-1024x724.jpg",
    pdf: "https://www.solid-yb.com/wp-content/uploads/2026/02/תקנים-באנגלית-.pdf-1-1024x724.jpg"
  }
];

export default function StandardsPage() {
  return (
    <div className="pt-28 pb-24 bg-surface min-h-screen">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-accent/10 text-accent font-bold rounded-full mb-4 text-sm">
            איכות בסטנדרט הגבוה ביותר
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4 font-heading">
            תקנים, היתרים ותעודות הסמכה
          </h1>
          <p className="text-steel text-lg">
            כל מוצרי סוליד יציקות עומדים תחת פיקוח קפדני ובקרת איכות של מכון התקנים הישראלי והארגונים הבינלאומיים המובילים.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-3xl border border-concrete shadow-sm hover:border-accent hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Certificate Image Preview */}
                <div className="bg-ink/5 h-64 p-4 relative flex items-center justify-center border-b border-concrete overflow-hidden group">
                  <img
                    src={cert.img}
                    alt={cert.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-xl"
                  />
                  <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a
                      href={cert.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-white text-ink font-bold rounded-xl text-sm shadow-lg flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4 text-accent" /> צפה בתעודה בגודל מלא
                    </a>
                  </div>
                </div>

                {/* Info Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">
                      {cert.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-steel">
                      {cert.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-2 font-heading">
                    {cert.title}
                  </h3>
                  <p className="text-steel text-sm leading-relaxed mb-4">
                    {cert.desc}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <a
                  href={cert.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-surface border border-concrete hover:border-accent hover:bg-accent hover:text-white text-ink font-bold rounded-2xl transition-all text-sm flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  הורד אישור רשמי (PDF)
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
