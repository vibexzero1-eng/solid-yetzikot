import { getSolutionById } from "@/lib/solutions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Factory, HardHat, Truck, ShieldCheck, Users, Award, Phone, ShoppingCart } from "lucide-react";
import { COMPANY_CONTACT } from "@/lib/contact";

const iconMap: Record<string, any> = {
  Factory,
  HardHat,
  Truck,
  ShieldCheck,
  Users,
  Award
};

export default async function SolutionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const solution = getSolutionById(resolvedParams.id);

  if (!solution) {
    notFound();
  }

  const IconComp = iconMap[solution.iconName] || Factory;

  return (
    <div className="pt-28 pb-20 bg-surface min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/#categories" className="inline-flex items-center gap-2 text-steel hover:text-accent font-medium text-sm transition-colors">
            <ArrowLeft className="w-4 h-4 rotate-180" /> חזרה לקטגוריות הפתרונות
          </Link>
          <Link href="/" className="px-4 py-2 bg-white border border-concrete rounded-xl text-ink font-bold text-sm hover:bg-concrete transition-all shadow-sm">
            מסך הבית
          </Link>
        </div>

        {/* Hero Banner for Solution */}
        <div className="bg-ink text-white rounded-3xl p-8 md:p-14 relative overflow-hidden mb-12 shadow-xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-accent/20 to-transparent pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-accent font-bold text-sm mb-4">
                <IconComp className="w-4 h-4" />
                פתרונות תשתית מתקדמים
              </div>
              <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">
                {solution.title}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                {solution.fullDesc}
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#quote-form" className="px-6 py-3 bg-accent text-white font-bold rounded-2xl hover:bg-accent-dark transition-all shadow-lg flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  בקש הצעת מחיר לפתרון זה
                </a>
                <a href={`tel:${COMPANY_CONTACT.officePhoneTel}`} className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all flex items-center gap-2" dir="ltr">
                  <Phone className="w-5 h-5 text-accent" />
                  {COMPANY_CONTACT.officePhone}
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-64 h-64 bg-white/5 rounded-3xl p-4 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-2xl">
                <img src={solution.img} alt={solution.title} className="w-full h-full object-contain filter drop-shadow-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features */}
            <div className="bg-white rounded-3xl p-8 border border-concrete shadow-sm">
              <h2 className="text-2xl font-bold text-ink mb-6 font-heading border-b border-concrete pb-4">
                יתרונות ומאפיינים מרכזיים
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {solution.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-surface rounded-2xl border border-concrete">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="font-medium text-ink leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications */}
            <div className="bg-white rounded-3xl p-8 border border-concrete shadow-sm">
              <h2 className="text-2xl font-bold text-ink mb-6 font-heading border-b border-concrete pb-4">
                יישומים ושימושים נפוצים
              </h2>
              <ul className="space-y-3">
                {solution.applications.map((app, i) => (
                  <li key={i} className="flex items-center gap-3 text-steel font-medium">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    {app}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Specs & Quote Callout */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-concrete shadow-sm">
              <h3 className="text-xl font-bold text-ink mb-6 font-heading border-b border-concrete pb-4">
                מפרט טכני מרוכז
              </h3>
              <div className="space-y-4">
                {solution.specs.map((spec, i) => (
                  <div key={i} className="flex flex-col border-b border-concrete/60 pb-3 last:border-0">
                    <span className="text-xs text-steel font-bold mb-1">{spec.label}</span>
                    <span className="text-sm font-bold text-ink">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="quote-form" className="bg-gradient-to-br from-accent to-accent-dark text-white rounded-3xl p-8 shadow-xl text-center">
              <h3 className="text-2xl font-bold mb-3 font-heading">מעוניינים במידע נוסף?</h3>
              <p className="text-white/90 text-sm mb-6">
                מהנדסי החברה ישמחו להתאים את המפרט המדויק ביותר לפרויקט שלכם.
              </p>
              <Link href="/quote" className="block w-full py-4 bg-white text-ink font-bold rounded-2xl hover:bg-surface transition-all shadow-md">
                עבור לטופס הצעת מחיר
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
