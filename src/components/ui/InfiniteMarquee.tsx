"use client";

import Link from "next/link";
import { Product } from "@/lib/products";

interface InfiniteMarqueeProps {
  products: Product[];
  reverse?: boolean;
  speed?: number;
  cardSize?: "sm" | "md" | "lg";
}

export default function InfiniteMarquee({
  products,
  reverse = false,
  speed = 30,
  cardSize = "md"
}: InfiniteMarqueeProps) {
  // Ensure enough items so that half width is at least 1500px wide
  let baseList = [...products];
  while (baseList.length < 8) {
    baseList = [...baseList, ...products];
  }

  // Create 2 100% identical halves: Set1 and Set2
  const doubleList = [...baseList, ...baseList];

  const cardDimensions = {
    sm: "w-40 h-40 p-2 text-xs",
    md: "w-52 h-52 p-3 text-sm",
    lg: "w-72 h-72 p-5 text-base"
  }[cardSize];

  const imgDimensions = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-44 h-44"
  }[cardSize];

  return (
    <div dir="ltr" className="w-full overflow-hidden select-none relative py-2">
      <div
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
        className={`flex gap-5 shrink-0 min-w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubleList.map((p, i) => (
          <Link
            key={`marquee-${p.id}-${i}`}
            href={`/products/${p.id}`}
            className={`${cardDimensions} bg-white rounded-2xl flex flex-col items-center justify-between border border-concrete shrink-0 shadow-sm hover:border-accent hover:shadow-lg hover:-translate-y-1 transition-all group cursor-pointer`}
            dir="rtl"
          >
            <div className="w-full flex justify-between items-center text-[10px] font-bold text-steel">
              <span className="bg-surface px-2 py-0.5 rounded border border-concrete/60">{p.category}</span>
              <span className="text-accent font-mono font-bold">₪{p.price}</span>
            </div>
            <div className={`${imgDimensions} flex items-center justify-center relative my-auto`}>
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-xs font-bold text-ink text-center truncate w-full group-hover:text-accent transition-colors px-1">
              {p.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
