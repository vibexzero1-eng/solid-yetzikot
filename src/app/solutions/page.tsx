import { solutions } from "@/lib/solutions";
import Link from "next/link";
import { ArrowLeft, Factory, HardHat, Truck, ShieldCheck, Users, Award } from "lucide-react";

const iconMap: Record<string, any> = {
  Factory,
  HardHat,
  Truck,
  ShieldCheck,
  Users,
  Award
};

export default function SolutionsPage() {
  return (
    <div className="pt-28 pb-20 bg-surface min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-accent/10 text-accent font-bold rounded-full mb-4 text-sm">
            פתרונות הנדסיים
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-ink mb-6 font-heading">
            פתרונות תשתית מקיפים
          </h1>
          <p className="text-steel text-lg leading-relaxed">
            סוליד יציקות בע"מ מספקת מעטפת פתרונות מלאה מיציקות ברזל דקטלי ועד לאלמנטים טרומיים מבטון מזוין עבור פרויקטי התשתית המובילים בישראל.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((sol) => {
            const IconComp = iconMap[sol.iconName] || Factory;
            return (
              <Link
                key={sol.id}
                href={`/solutions/${sol.id}`}
                className="group bg-white p-8 rounded-3xl border border-concrete shadow-sm hover:border-accent hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                    <IconComp className="w-8 h-8 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <h2 className="text-2xl font-bold text-ink mb-3 group-hover:text-accent transition-colors">
                    {sol.title}
                  </h2>
                  <p className="text-steel text-sm leading-relaxed mb-6">
                    {sol.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-concrete flex items-center justify-between font-bold text-accent text-sm">
                  <span>לצפייה בפתרון המלא</span>
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
