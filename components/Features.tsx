'use client';

import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const features = [
  "Genuine Products",
  "Affordable Prices",
  "Best Deals In Town",
  "Expert Staff",
  "Fast Delivery",
  "EMI Available",
  "Exchange Offers",
  "Trusted Since Years"
];

export default function Features() {
  return (
    <section className="py-24 bg-[#0B1020] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Why Choose National Electronics
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Experience the best in class service and product quality.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass p-6 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors border-white/5"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                <CheckCircle2 className="text-[#0F52FF] w-6 h-6" />
              </div>
              <span className="font-semibold text-lg">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
