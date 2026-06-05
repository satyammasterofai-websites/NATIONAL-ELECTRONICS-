'use client';

import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  const phoneNumber = "919927600114";
  const defaultMessage = encodeURIComponent("Hello National Electronics, I want details about your latest offers.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_25px_rgba(37,211,102,0.6)] transition-shadow flex items-center justify-center cursor-pointer group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} className="fill-current" />
      <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm py-1.5 px-3 rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium border border-gray-100">
        Chat with us
      </span>
    </motion.a>
  );
}
