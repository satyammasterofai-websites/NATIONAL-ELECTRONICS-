'use client';

import { motion } from 'motion/react';
import { Truck, PenTool as Tool, Repeat, CreditCard, Users, ShieldCheck } from 'lucide-react';

const services = [
  { icon: Truck, title: "Home Delivery", desc: "Fast and secure delivery to your doorstep." },
  { icon: Tool, title: "Installation Support", desc: "Expert installation by certified professionals." },
  { icon: Repeat, title: "Exchange Offers", desc: "Upgrade old appliances for the best value." },
  { icon: CreditCard, title: "EMI Facility", desc: "Easy financing options with major banks." },
  { icon: Users, title: "Product Consultation", desc: "Get expert advice before you buy." },
  { icon: ShieldCheck, title: "Warranty Support", desc: "Hassle-free extended warranty services." },
];

export default function Services() {
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
            Premium Services
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-2xl border-white/5 hover:border-[#0F52FF]/30 transition-all group"
            >
              <div className="w-14 h-14 bg-[#0F52FF]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0F52FF] transition-colors">
                <svc.icon className="text-[#0F52FF] group-hover:text-white transition-colors" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{svc.title}</h3>
              <p className="text-gray-400">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
