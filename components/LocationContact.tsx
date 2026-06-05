'use client';

import { motion } from 'motion/react';
import { MapPin, Phone, Clock, CreditCard, Send } from 'lucide-react';

export default function LocationContact() {
  return (
    <section id="contact" className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight"
          >
            Visit Our Showroom
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-[#0F52FF] mx-auto mt-6"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Store Info & Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            {/* Store Info Container */}
            <div className="bg-[#0B1020] p-8 rounded-2xl shadow-xl border border-[#D4AF37]/30 text-white">
              <h3 className="text-2xl font-bold mb-6 text-[#D4AF37]">Store Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/5 border border-[#D4AF37]/30 p-3 rounded-lg"><MapPin className="text-[#D4AF37]" size={24} /></div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Address</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Court Rd, Narayana Puri Colony,<br />
                      Gill Colony,<br />
                      Saharanpur, Uttar Pradesh 247001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white/5 border border-[#D4AF37]/30 p-3 rounded-lg"><Phone className="text-[#D4AF37]" size={24} /></div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Phone</h4>
                    <p className="text-gray-300 text-sm">
                      <a href="tel:+919927600114" className="hover:text-[#D4AF37] transition-colors">+91 9927600114</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/5 border border-[#D4AF37]/30 p-3 rounded-lg"><Clock className="text-[#D4AF37]" size={24} /></div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Timings</h4>
                    <p className="text-gray-300 text-sm">Monday to Sunday<br />11:00 AM - 9:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/5 border border-[#D4AF37]/30 p-3 rounded-lg"><CreditCard className="text-[#D4AF37]" size={24} /></div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Accepted Payments</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['Credit Card', 'Debit Card', 'NFC', 'UPI'].map((pt) =>(
                        <span key={pt} className="px-3 py-1 bg-white/10 border border-white/20 text-white text-xs rounded-full font-medium">{pt}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#071A3D] p-8 rounded-2xl shadow-xl text-white">
              <h3 className="text-2xl font-bold mb-2">Request Callback</h3>
              <p className="text-gray-400 text-sm mb-6">Fill in your details and we will call you.</p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white placeholder-gray-400 transition-all" />
                </div>
                <div>
                  <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white placeholder-gray-400 transition-all" />
                </div>
                <div>
                  <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white placeholder-gray-400 transition-all" />
                </div>
                <div>
                  <textarea placeholder="Message (Optional)" rows={3} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white placeholder-gray-400 transition-all resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-[#D4AF37] hover:bg-yellow-600 text-[#0B1020] font-bold py-3.5 rounded-lg flex justify-center items-center gap-2 transition-all shadow-lg active:scale-[0.98]">
                  <Send size={18} />
                  Get Best Deal
                </button>
              </form>
            </div>
          </motion.div>

          {/* Google Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 h-[500px] lg:h-auto rounded-2xl overflow-hidden shadow-lg border border-gray-200"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110593.63412582736!2d77.47271965561081!3d29.969695650137574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ee5af3caeccdb%3A0xe6db20288cb431de!2sNational%20Electronics!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              className="w-full h-full border-0" 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
