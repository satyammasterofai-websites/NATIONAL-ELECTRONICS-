'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { doc, getDoc } from 'firebase/firestore';
import { db, COLLECTIONS } from '@/lib/firebase';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoImage, setLogoImage] = useState('/logo.png');

  useEffect(() => {
    async function loadLogo() {
      try {
        const docRef = doc(db, COLLECTIONS.SETTINGS, 'logo');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().image) {
          setLogoImage(docSnap.data().image);
        }
      } catch (err) {
        console.warn("Failed to load logo", err);
      }
    }
    loadLogo();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Offers', href: '#offers' },
    { name: 'Products', href: '#products' },
    { name: 'Brands', href: '#brands' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:flex justify-between items-center px-8 py-2 bg-[#0B1020] text-xs text-gray-300 border-b border-[#D4AF37]/30">
        <div>Court Road | Gill Colony | Link Road</div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2"><Phone size={14} className="text-[#D4AF37]" /> +91 9927600114</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#071A3D] shadow-lg py-2 border-b-2 border-[#D4AF37]' : 'bg-[#071A3D] border-b-2 border-[#D4AF37] py-4'
        }`}
        style={{ top: isScrolled ? '0' : 'auto' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="#home" className="flex items-center gap-2 sm:gap-3">
                {/* using the placeholder image path or literal text if missing, we will try to load the actual image. The user says "Use navbar background same as logo background" which we made white. */}
                <Image 
                  src={logoImage} 
                  alt="National Electronics Logo" 
                  width={80}
                  height={80} 
                  className="h-10 w-10 sm:h-14 sm:w-14 object-cover rounded-full bg-white border-2 border-white/10 aspect-square"
                  draggable={false}
                />
                <span className="font-bold text-[#D4AF37] text-xs sm:text-lg lg:text-xl tracking-wider whitespace-nowrap">
                  NATIONAL ELECTRONICS
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-white/80 hover:text-white transition-colors uppercase tracking-wide"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <a
                href="tel:+919927600114"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-md text-sm font-bold text-[#0B1020] bg-[#D4AF37] hover:bg-yellow-500 shadow-md transition-all"
              >
                Call Now
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-[#D4AF37] focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#071A3D] border-t border-[#D4AF37]/30"
            >
              <div className="px-4 pt-2 pb-6 space-y-1 shadow-xl">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-3 text-base font-medium text-white/80 hover:text-white hover:bg-white/10 uppercase tracking-wide rounded-md"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <a
                    href="tel:+919927600114"
                    className="flex w-full items-center justify-center px-4 py-3 text-base font-bold rounded-md text-[#0B1020] bg-[#D4AF37] hover:bg-yellow-500 shadow-md"
                  >
                    <Phone size={18} className="mr-2" />
                    +91 9927600114
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
