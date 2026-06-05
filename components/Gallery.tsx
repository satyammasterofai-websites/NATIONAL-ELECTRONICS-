'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { db, COLLECTIONS } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function Gallery() {
  const [gallery, setGallery] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const snap = await getDocs(collection(db, COLLECTIONS.GALLERY));
        if (snap.empty) {
          setGallery([
            { id: '1', image: 'https://picsum.photos/seed/gallery1/1200/800', category: 'Showroom' },
            { id: '2', image: 'https://picsum.photos/seed/gallery2/1200/800', category: 'Showroom' },
            { id: '3', image: 'https://picsum.photos/seed/gallery3/1200/800', category: 'Showroom' },
          ]);
          return;
        }
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const validData = data.filter((d: any) => d.image);
        setGallery(validData);
      } catch (err) {
        console.error("Failed to load gallery", err);
      }
    };
    fetchGallery();
  }, []);

  useEffect(() => {
    if (gallery.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gallery.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [gallery.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  if (gallery.length === 0) {
    return (
      <section id="gallery" className="py-24 bg-transparent border-t border-white/5 flex items-center justify-center min-h-[50vh]">
        <div className="text-[#D4AF37] animate-pulse">Loading Gallery...</div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-24 bg-transparent border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight"
          >
            Showroom Gallery
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6"
          />
        </div>

        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl group">
          <div className="aspect-video relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={gallery[currentIndex].image}
                  alt="Gallery Image"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/40 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Overlays */}
            <button 
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-black/20 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-black/20 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
        
        {/* Thumbnails */}
        <div className="flex justify-center mt-6 gap-3 overflow-x-auto pb-4 px-4 snap-x hide-scrollbar">
          {gallery.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-20 h-14 md:w-24 md:h-16 rounded-md overflow-hidden flex-shrink-0 transition-all cursor-pointer snap-center ${
                idx === currentIndex ? 'ring-2 ring-offset-2 ring-[#0F52FF] opacity-100' : 'opacity-50 hover:opacity-100'
              }`}
            >
              <Image src={item.image} alt="Thumbnail" fill className="object-cover" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
