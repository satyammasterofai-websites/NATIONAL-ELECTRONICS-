'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { db, COLLECTIONS } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function Brands() {
  const [brands, setBrands] = useState<any[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const snap = await getDocs(collection(db, COLLECTIONS.BRANDS));
        if (snap.empty) {
          // Fallback data if empty
          setBrands([
            { id: '1', name: 'Sony' },
            { id: '2', name: 'Samsung' },
            { id: '3', name: 'LG' },
            { id: '4', name: 'Panasonic' },
            { id: '5', name: 'Whirlpool' },
            { id: '6', name: 'Bosch' },
          ]);
          return;
        }
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        data.sort((a: any, b: any) => (a.displayOrder || 99) - (b.displayOrder || 99));
        setBrands(data);
      } catch (err) {
        console.error("Failed to load brands", err);
      }
    };
    fetchBrands();
  }, []);

  if (brands.length === 0) {
    return (
      <section id="brands" className="py-24 bg-transparent border-t border-[#D4AF37]/20 flex items-center justify-center min-h-[50vh]">
        <div className="text-[#D4AF37] animate-pulse">Loading Brands...</div>
      </section>
    );
  }

  return (
    <section id="brands" className="py-24 bg-transparent border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight"
          >
            Brands Available
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.2)",
                backgroundColor: "rgba(212, 175, 55, 0.1)",
                borderColor: "#D4AF37"
              }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              className="theme-card flex flex-col items-center justify-center p-4 text-center transition-all duration-300 hover:border-[#D4AF37] cursor-pointer"
            >
              {brand.logo ? (
                <img src={brand.logo} alt={brand.name} className="h-12 w-auto object-contain mb-2" />
              ) : null}
              <span className={`font-bold text-gray-300 group-hover:text-white tracking-wider text-sm md:text-base uppercase transition-colors ${brand.logo ? 'hidden group-hover:block' : ''}`}>
                {brand.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
