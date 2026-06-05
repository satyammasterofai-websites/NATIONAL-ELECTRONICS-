'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { 
  LayoutDashboard, Image as ImageIcon, Tag, ShoppingBag, 
  Copyright, Images, MessageSquare, Info, UserRound, 
  Store, Mail, Palette, Settings, Globe, LogOut, Menu, X
} from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Hero Section', href: '/admin/hero', icon: ImageIcon },
  { name: 'Offers', href: '/admin/offers', icon: Tag },
  { name: 'Products', href: '/admin/products', icon: ShoppingBag },
  { name: 'Brands', href: '/admin/brands', icon: Copyright },
  { name: 'Gallery', href: '/admin/gallery', icon: Images },
  { name: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
  { name: 'About Section', href: '/admin/about', icon: Info },
  { name: 'Owner Profile', href: '/admin/owner', icon: UserRound },
  { name: 'Store Information', href: '/admin/store', icon: Store },
  { name: 'Contact Messages', href: '/admin/messages', icon: Mail },
  { name: 'Logo Manager', href: '/admin/logo', icon: Palette },
  { name: 'SEO Settings', href: '/admin/seo', icon: Globe },
  { name: 'Website Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-[#D4AF37] text-[#071A3D] rounded-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`w-64 bg-[#071A3D] border-r border-[#D4AF37]/20 flex-col h-screen z-50 transition-transform duration-300 md:flex ${isOpen ? 'fixed inset-y-0 left-0 translate-x-0' : 'fixed inset-y-0 left-0 -translate-x-full md:sticky md:top-0 md:h-screen md:translate-x-0'}`}>
        <div className="p-6 border-b border-[#D4AF37]/20">
        <h2 className="text-[#D4AF37] font-bold text-xl tracking-wider">ADMIN PANEL</h2>
        <p className="text-gray-400 text-xs mt-1">National Electronics</p>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <ul className="space-y-1 px-3">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-[#D4AF37]/10 text-[#D4AF37] font-medium' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-[#D4AF37]' : 'opacity-70'} />
                  <span className="text-sm">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="p-4 border-t border-[#D4AF37]/20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-left"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
    </>
  );
}
