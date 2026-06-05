'use client';
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, COLLECTIONS } from '@/lib/firebase';
import ImageUpload from '@/components/admin/ImageUpload';
import { Save, Loader2 } from 'lucide-react';

export default function LogoAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoImage, setLogoImage] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, COLLECTIONS.SETTINGS, 'logo');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLogoImage(docSnap.data()?.image || '');
        }
      } catch (err) {
        console.warn("Failed to load logo", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, COLLECTIONS.SETTINGS, 'logo'), { image: logoImage });
      alert('Logo saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving logo: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div><Loader2 className="animate-spin text-[#D4AF37]" /></div>;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Logo Manager</h1>
          <p className="text-gray-400 text-sm">Upload your custom logo for the website.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 bg-[#071A3D] p-8 rounded-xl border border-[#D4AF37]/20">
        <div>
          <ImageUpload 
            label="Website Logo" 
            value={logoImage} 
            onChange={(b64) => setLogoImage(b64)} 
            onRemove={() => setLogoImage('')}
          />
        </div>

        <div className="flex justify-end pt-6 border-t border-white/10 mt-6">
          <button type="submit" disabled={saving} className="bg-[#D4AF37] hover:bg-yellow-500 text-[#0B1020] font-bold py-3 px-6 rounded-md flex items-center gap-2 transition-colors disabled:opacity-50">
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Save Logo
          </button>
        </div>
      </form>
    </div>
  );
}
