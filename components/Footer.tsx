'use client';

import { useState, useEffect } from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { doc, getDoc } from 'firebase/firestore';
import { db, COLLECTIONS } from '@/lib/firebase';

export default function Footer() {
  const [logoImage, setLogoImage] = useState('');

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

  return (
    <footer className="bg-[#040D1F] pt-20 pb-10 text-gray-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Image 
                src={logoImage || '/logo.png'} 
                alt="National Electronics Logo" 
                width={80} 
                height={80} 
                className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-full bg-white border-2 border-white/10 aspect-square"
                draggable={false}
              />
              <span className="font-bold text-[#D4AF37] text-lg sm:text-xl tracking-wider">
                NATIONAL ELECTRONICS
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Saharanpur&apos;s premier electronics showroom offering top brands, genuine products, and unmatched customer service.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0F52FF] hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0F52FF] hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0F52FF] hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-[-8px] left-0 w-1/2 h-0.5 bg-[#D4AF37]"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#home" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Home</Link></li>
              <li><Link href="#about" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> About Us</Link></li>
              <li><Link href="#products" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Products</Link></li>
              <li><Link href="#offers" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Offers</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Top Brands
              <span className="absolute bottom-[-8px] left-0 w-1/2 h-0.5 bg-[#D4AF37]"></span>
            </h3>
            <ul className="grid grid-cols-2 gap-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Samsung</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LG</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Daikin</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mitsubishi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Voltas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carrier</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Haier</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Whirlpool</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Contact Info
              <span className="absolute bottom-[-8px] left-0 w-1/2 h-0.5 bg-[#D4AF37]"></span>
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#D4AF37] mt-0.5 shrink-0" />
                <span className="leading-relaxed">Court Rd, Narayana Puri Colony, Gill Colony, Saharanpur, UP 247001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#D4AF37] shrink-0" />
                <span>+91 9927600114</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#D4AF37] shrink-0" />
                <span>info@nationalelectronics.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} National Electronics Saharanpur. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/admin" className="hover:text-white transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
