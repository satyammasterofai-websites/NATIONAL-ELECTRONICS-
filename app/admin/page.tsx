'use client';
import { Activity, ImageIcon, Tag, MessageSquare, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Products', value: '124', icon: ShoppingBag, href: '/admin/products' },
    { title: 'Active Offers', value: '12', icon: Tag, href: '/admin/offers' },
    { title: 'Pending Messages', value: '5', icon: MessageSquare, href: '/admin/messages' },
    { title: 'Gallery Images', value: '48', icon: ImageIcon, href: '/admin/gallery' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.href}>
              <div className="bg-[#071A3D] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-colors cursor-pointer text-white rounded-xl p-6">
                <div className="flex flex-row items-center justify-between pb-2">
                  <h3 className="text-sm font-medium text-gray-400">
                    {stat.title}
                  </h3>
                  <Icon className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#071A3D] border border-[#D4AF37]/30 text-white rounded-xl p-6">
          <div className="mb-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Activity className="h-5 w-5 text-[#D4AF37]" />
              Recent Activity
            </h3>
          </div>
          <div>
            <p className="text-sm text-gray-400">Activity logging will appear here.</p>
          </div>
        </div>

        <div className="bg-[#071A3D] border border-[#D4AF37]/30 text-white rounded-xl p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">System Status</h3>
          </div>
          <div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Database Connection</span>
                <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Storage System</span>
                <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Website Last Updated</span>
                <span className="text-sm text-white">Just now</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
         <h2 className="text-xl font-bold text-white mb-6">Quick Settings</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
             <Link href="/admin/about" className="bg-[#071A3D] text-[#D4AF37] border border-[#D4AF37]/30 p-4 rounded-lg hover:bg-[#D4AF37]/10 transition-colors text-center font-medium">
                Manage About
             </Link>
             <Link href="/admin/owner" className="bg-[#071A3D] text-[#D4AF37] border border-[#D4AF37]/30 p-4 rounded-lg hover:bg-[#D4AF37]/10 transition-colors text-center font-medium">
                Manage Owner
             </Link>
             <Link href="/admin/store" className="bg-[#071A3D] text-[#D4AF37] border border-[#D4AF37]/30 p-4 rounded-lg hover:bg-[#D4AF37]/10 transition-colors text-center font-medium">
                Store Information
             </Link>
             <Link href="/admin/logo" className="bg-[#071A3D] text-[#D4AF37] border border-[#D4AF37]/30 p-4 rounded-lg hover:bg-[#D4AF37]/10 transition-colors text-center font-medium">
                Logo Manager
             </Link>
         </div>
      </div>
    </div>
  );
}
