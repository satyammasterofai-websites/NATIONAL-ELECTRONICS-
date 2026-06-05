'use client';

import { useState, useEffect } from 'react';
import { db, COLLECTIONS } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Save, Loader2, Info } from 'lucide-react';

export default function AdminAbout() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    title: 'A Legacy of Trust & Quality',
    description1: '',
    description2: '',
    years: '10+',
    customers: '1000+'
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const docRef = doc(db, COLLECTIONS.ABOUT, 'main');
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
      const docRef = doc(db, COLLECTIONS.ABOUT, 'main');
      await setDoc(docRef, formData);
      setMessage('About section updated successfully');
    } catch (err) {
      console.error(err);
      setMessage('Failed to update about section');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-[#D4AF37]" size={32} /></div>;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-[#D4AF37]/10 rounded-xl">
          <Info className="text-[#D4AF37]" size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">About Section</h1>
          <p className="text-gray-400 text-sm">Manage your about us story</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#071A3D] rounded-2xl border border-[#D4AF37]/20 p-6 shadow-xl">
        {message && (
          <div className={`p-4 rounded-lg mb-6 ${message.includes('success') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {message}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Main Title</label>
            <input 
              type="text" 
              name="title"
              value={formData.title} 
              onChange={handleChange}
              className="w-full bg-[#0B1020] border border-[#D4AF37]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description Paragraph 1</label>
            <textarea 
              name="description1"
              value={formData.description1} 
              onChange={handleChange}
              rows={4}
              className="w-full bg-[#0B1020] border border-[#D4AF37]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description Paragraph 2</label>
            <textarea 
              name="description2"
              value={formData.description2} 
              onChange={handleChange}
              rows={4}
              className="w-full bg-[#0B1020] border border-[#D4AF37]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience (e.g., 10+)</label>
              <input 
                type="text" 
                name="years"
                value={formData.years} 
                onChange={handleChange}
                className="w-full bg-[#0B1020] border border-[#D4AF37]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Happy Customers (e.g., 1000+)</label>
              <input 
                type="text" 
                name="customers"
                value={formData.customers} 
                onChange={handleChange}
                className="w-full bg-[#0B1020] border border-[#D4AF37]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={saving}
          className="mt-8 flex items-center gap-2 bg-[#D4AF37] text-[#071A3D] px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
