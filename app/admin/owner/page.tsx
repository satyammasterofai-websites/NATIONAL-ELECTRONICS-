'use client';

import { useState, useEffect } from 'react';
import { db, COLLECTIONS } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Save, Loader2, UserRound, Upload, X } from 'lucide-react';
import Image from 'next/image';

export default function AdminProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: 'Gagan Kalra',
    role: 'Founder & Owner',
    storeName: 'National Electronics',
    image: 'https://picsum.photos/seed/owner1/800/1000'
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const docRef = doc(db, COLLECTIONS.OWNER, 'main');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setFormData(snap.data() as any);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      const docRef = doc(db, COLLECTIONS.OWNER, 'main');
      await setDoc(docRef, formData);
      setMessage('Profile updated successfully');
    } catch (err) {
      console.error(err);
      setMessage('Failed to update profile');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-[#D4AF37]" size={32} /></div>;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-[#D4AF37]/10 rounded-xl">
          <UserRound className="text-[#D4AF37]" size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">Owner Profile</h1>
          <p className="text-gray-400 text-sm">Manage the owner details shown in about section</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#071A3D] rounded-2xl border border-[#D4AF37]/20 p-6 shadow-xl">
        {message && (
          <div className={`p-4 rounded-lg mb-6 ${message.includes('success') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
             <label className="block text-sm font-medium text-gray-300 mb-2">Owner Profile Image</label>
             <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border-2 border-dashed border-[#D4AF37]/30 bg-[#0B1020] flex flex-col items-center justify-center">
                {formData.image ? (
                  <>
                    <Image src={formData.image} alt="Profile preview" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-[#D4AF37]/5 transition-colors">
                    <Upload className="text-[#D4AF37] mb-2" size={32} />
                    <span className="text-sm font-medium text-gray-400">Click to upload</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                )}
             </div>
             <p className="text-xs text-gray-500 mt-2">Upload your provided photo here! Recommend 4:5 aspect ratio.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name} 
                onChange={handleChange}
                className="w-full bg-[#0B1020] border border-[#D4AF37]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Role/Title</label>
              <input 
                type="text" 
                name="role"
                value={formData.role} 
                onChange={handleChange}
                className="w-full bg-[#0B1020] border border-[#D4AF37]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Store Name</label>
              <input 
                type="text" 
                name="storeName"
                value={formData.storeName} 
                onChange={handleChange}
                className="w-full bg-[#0B1020] border border-[#D4AF37]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>

            <button 
              type="submit" 
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] text-[#071A3D] px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-50 mt-4"
            >
              {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
