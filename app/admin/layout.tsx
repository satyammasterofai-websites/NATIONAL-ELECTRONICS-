import AuthGuard from '@/components/admin/AuthGuard';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#0B1020] text-white">
        <AdminSidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0B1020]">
          <div className="p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
