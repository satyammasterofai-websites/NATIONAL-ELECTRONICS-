'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { db, COLLECTIONS } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snap = await getDocs(collection(db, COLLECTIONS.PRODUCTS));
        if (snap.empty) {
          // Fallback data if empty
          setProducts([
            { id: '1', category: 'Televisions', image: 'https://picsum.photos/seed/tv1/800/1000', items: ['Smart TVs', 'OLED / QLED', '4K & 8K UHD'] },
            { id: '2', category: 'Refrigerators', image: 'https://picsum.photos/seed/fridge1/800/1000', items: ['French Door', 'Side by Side', 'Double Door'] },
            { id: '3', category: 'Air Conditioners', image: 'https://picsum.photos/seed/ac1/800/1000', items: ['Split ACs', 'Window ACs', 'Inverter ACs'] },
            { id: '4', category: 'Washing Machines', image: 'https://picsum.photos/seed/washing1/800/1000', items: ['Front Load', 'Top Load', 'Semi-Automatic'] },
          ]);
          return;
        }
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Optional client side sort if it exists:
        data.sort((a: any, b: any) => (a.displayOrder || 99) - (b.displayOrder || 99));
        const validData = data.filter((d: any) => d.image);
        setProducts(validData);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    };
    fetchProducts();
  }, []);

  if (products.length === 0) {
    return (
      <section id="products" className="py-24 bg-[#071A3D] min-h-[50vh] flex items-center justify-center">
         <div className="text-[#D4AF37] animate-pulse">Loading Products...</div>
      </section>
    );
  }

  return (
    <section id="products" className="py-24 bg-[#071A3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight"
          >
            Product Categories
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {products.map((prop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group relative h-96 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            >
              <Image
                src={prop.image}
                alt={prop.category}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/90 via-[#071A3D]/40 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end h-full">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">{prop.category}</h3>
                <ul className="space-y-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {prop.items && prop.items.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-gray-200 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
