"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { carouselProducts } from "@/lib/data";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="py-16 lg:py-24 bg-muted/30 dark:bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="text-champagne-dark dark:text-champagne font-semibold text-sm uppercase tracking-widest">Trending Now</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">Popular This Week</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={scrollPrev} className="w-10 h-10 border border-border/50 rounded-full flex items-center justify-center text-foreground/60 hover:bg-card hover:text-foreground transition-all"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={scrollNext} className="w-10 h-10 border border-border/50 rounded-full flex items-center justify-center text-foreground/60 hover:bg-card hover:text-foreground transition-all"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </motion.div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {carouselProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[280px] sm:w-[320px]">
                <Link href={`/shop/${product.category.toLowerCase()}`} className="group block">
                  <div className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-champagne/30">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image src={product.image} alt={product.name} width={600} height={450} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {product.badge && <span className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-bold ${product.badge === "Trending" ? "bg-coral text-white" : product.badge === "New" ? "bg-castleton text-white" : "bg-champagne text-castleton-dark"}`}>{product.badge}</span>}
                      <div className="absolute bottom-3 right-3 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-champagne fill-champagne" /><span className="text-xs font-bold text-foreground">{product.rating}</span></div>
                    </div>
                    <div className="p-5">
                      <span className="text-[11px] font-semibold text-champagne-dark dark:text-champagne uppercase tracking-wider">{product.category}</span>
                      <h3 className="font-bold text-foreground text-base mt-1 mb-3 group-hover:text-castleton dark:group-hover:text-champagne transition-colors line-clamp-1">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-castleton dark:text-champagne">${product.price.toFixed(2)}</span>
                          {product.originalPrice && <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {carouselProducts.map((_, i) => (
            <button key={i} onClick={() => emblaApi?.scrollTo(i)} className={`h-2 rounded-full transition-all ${i === selectedIndex ? "w-8 bg-castleton" : "w-2 bg-border hover:bg-muted-foreground/30"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
