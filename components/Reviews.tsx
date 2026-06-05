'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db, COLLECTIONS } from '@/lib/firebase';

interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const snap = await getDocs(collection(db, COLLECTIONS.REVIEWS));
        const res: Review[] = [];
        snap.forEach(doc => res.push({ id: doc.id, ...doc.data() } as Review));
        // Fallback to static reviews if db is empty
        if (res.length > 0) {
          setReviews(res);
        } else {
           setReviews([
             { id: '1', name: "Amit Sharma", text: "Great prices and very polite staff.", rating: 5 },
             { id: '2', name: "Priya Verma", text: "Bought a washing machine last month. The delivery was safe.", rating: 5 }
           ]);
        }
      } catch (err) {
        console.warn("Failed to load reviews:", err);
      }
    }
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handleNext = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if(!reviews.length) return null;

  return (
    <section id="reviews" className="py-24 bg-[#071A3D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight"
          >
            Customer Reviews
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6"
          />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 z-20">
            <button 
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/10 shadow-lg text-white hover:text-[#0B1020] hover:bg-[#D4AF37] transition-all border border-white/10"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-20">
            <button 
              onClick={handleNext}
              className="p-3 rounded-full bg-white/10 shadow-lg text-white hover:text-[#0B1020] hover:bg-[#D4AF37] transition-all border border-white/10"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="overflow-hidden relative h-[300px] md:h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
              >
                <div className="theme-card backdrop-blur-md p-8 md:p-12 shadow-xl w-full max-w-3xl text-center relative border-opacity-50">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#0B1020] border border-[#D4AF37]/50 rounded-full flex items-center justify-center shadow-lg">
                    <Quote size={20} className="text-[#D4AF37] fill-current" />
                  </div>
                  
                  <div className="flex justify-center gap-1 mb-6 mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={20} className={star <= reviews[currentIndex].rating ? "text-[#D4AF37] fill-current" : "text-gray-600"} />
                    ))}
                  </div>
                  
                  <p className="text-xl md:text-2xl text-white font-medium italic leading-relaxed">
                    &quot;{reviews[currentIndex].text}&quot;
                  </p>
                  <p className="mt-4 font-bold text-[#D4AF37]">{reviews[currentIndex].name}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center mt-8 gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex ? 'w-8 h-2 bg-[#D4AF37]' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
