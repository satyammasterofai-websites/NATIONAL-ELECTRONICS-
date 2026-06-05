'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BadgeCheck, Zap, Tag, CreditCard } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { doc, getDoc } from 'firebase/firestore';
import { db, COLLECTIONS } from '@/lib/firebase';

export default function Hero() {
  const [data, setData] = useState({
    titleTop: "Saharanpur's",
    titleMain: "No.1 Showroom",
    subtitle: "Established Trust",
    description: "Premium Home Appliances, Smart TVs, and Luxury Air Conditioners at competitive Saharanpur prices.",
    button1Text: "View Offers",
    button1Link: "#offers",
    button2Text: "Contact Us",
    button2Link: "#contact",
    backgroundImage: "https://picsum.photos/seed/showroom_luxury/1920/1080"
  });

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, COLLECTIONS.HERO, 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data() as any);
        }
      } catch (err) {
        console.warn("Failed to load hero data", err);
      }
    }
    loadData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.backgroundImage || "https://picsum.photos/seed/showroom_luxury/1920/1080"}
          alt="Luxury Electronics Showroom"
          fill
          priority
          className="object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071A3D]/95 via-[#071A3D]/80 to-[#0B1020]/70" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center md:items-start text-center md:text-left">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Top Badge */}
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <p className="text-[#D4AF37] text-xs tracking-[3px] uppercase font-semibold mb-2">{data.subtitle}</p>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {data.titleTop} <br className="hidden md:block" />
            <span className="text-[#0F52FF]">
              {data.titleMain}
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 font-light mb-8 max-w-2xl opacity-80">
            {data.description}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-12">
            <Link
              href={data.button1Link}
              className="px-8 py-4 bg-[#D4AF37] text-[#0B1020] font-bold rounded-sm hover:bg-yellow-500 transition-colors shadow-lg"
            >
              {data.button1Text}
            </Link>
            <Link
              href={data.button2Link}
              className="px-8 py-4 bg-transparent border border-[#D4AF37]/30 text-white font-bold rounded-sm hover:bg-white/10 transition-colors"
            >
              {data.button2Text}
            </Link>
          </motion.div>

          {/* Badges */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 md:gap-6 pt-4">
            {[
              { icon: BadgeCheck, text: "Genuine Products" },
              { icon: Zap, text: "Fast Delivery" },
              { icon: Tag, text: "Best Prices" },
              { icon: CreditCard, text: "EMI Available" },
              { icon: BadgeCheck, text: "Exchange Offers" }
            ].slice(0, 4).map((feature, idx) => (
              <div key={idx} className="theme-badge p-3 flex items-center gap-3 text-sm text-gray-300">
                <feature.icon size={18} className="text-[#D4AF37]" />
                <span className="font-medium whitespace-nowrap">{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
