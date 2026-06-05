'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

const ADMIN_EMAIL = 'satyammasterofai@gmail.com';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user.email !== ADMIN_EMAIL) {
        await signOut(auth);
        setError('Access Denied: You do not have admin privileges.');
      }
    } catch (err: any) {
      if (err.code === 'auth/unauthorized-domain') {
        setError(`Domain not authorized. Please add this domain to Firebase: ${window.location.hostname}`);
      } else if (err.code === 'auth/popup-blocked' || err.message?.includes('popup')) {
        setError('Popup blocked. Please allow popups or open this app in a new tab.');
      } else {
        setError(err.message || 'Failed to login');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1020] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#D4AF37]" size={48} />
      </div>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-[#0B1020] flex flex-col items-center justify-center p-4">
        <div className="bg-[#071A3D] border border-white/10 p-8 rounded-2xl max-w-md w-full shadow-2xl text-center">
          <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
             <span className="text-3xl">🛡️</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400 mb-8">Sign in with the authorized Google account to access the dashboard.</p>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-[#D4AF37] hover:bg-yellow-500 text-[#0B1020] font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-colors"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5 bg-white rounded-full p-0.5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              <path d="M1 1h22v22H1z" fill="none"/>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
