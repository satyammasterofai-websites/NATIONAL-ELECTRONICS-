'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#0B1020] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative flex flex-col items-center justify-center p-12 rounded-3xl border border-white/10 glass bg-[#071A3D]/40">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-[#D4AF37]/50 shadow-[0_0_40px_rgba(212,175,55,0.2)] mb-8">
                <Image 
                  src="/owner.jpg"
                  alt="Gagan Kalra - Owner"
                  fill
                  className="object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-3xl font-bold text-[#D4AF37] mb-2">Gagan Kalra</h4>
              <p className="text-gray-300 font-medium tracking-wide text-lg text-center">Founder & Owner</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="w-10 h-[2px] bg-[#0F52FF]" />
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest text-center">National Electronics</p>
                <div className="w-10 h-[2px] bg-[#0F52FF]" />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#0F52FF] rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#D4AF37] rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-sm font-bold tracking-widest text-[#D4AF37] uppercase mb-3">About Us</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              A Legacy of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#0F52FF]">
                Trust & Quality
              </span>
            </h3>
            
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                National Electronics is one of the most trusted electronics showrooms in Saharanpur, offering premium home appliances, televisions, air conditioners, refrigerators, and electronic products at competitive prices.
              </p>
              <p>
                We focus on genuine products, customer satisfaction, affordable pricing, and unparalleled after-sales support. For years, we have been the preferred choice for families looking to upgrade their homes with the latest technology.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-white/10">
              <div>
                <h4 className="text-4xl font-bold text-white mb-2">10+</h4>
                <p className="text-gray-400">Years of Trust</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-white mb-2">1000+</h4>
                <p className="text-gray-400">Happy Customers</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
