'use client';
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, COLLECTIONS } from '@/lib/firebase';
import ImageUpload from '@/components/admin/ImageUpload';
import { Save, Loader2 } from 'lucide-react';

export default function HeroAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    titleTop: "Saharanpur's",
    titleMain: "No.1 Showroom",
    subtitle: "Established Trust",
    description: "Premium Home Appliances, Smart TVs, and Luxury Air Conditioners at competitive Saharanpur prices.",
    button1Text: "View Offers",
    button1Link: "#offers",
    button2Text: "Contact Us",
    button2Link: "#contact",
    backgroundImage: "https://picsum.photos/seed/showroom_luxury/1920/1080"
  });

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, COLLECTIONS.HERO, 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data() as any);
        }
      } catch (err) {
        console.warn("Failed to load hero data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, COLLECTIONS.HERO, 'main'), formData);
      alert('Saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving data: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div><Loader2 className="animate-spin text-[#D4AF37]" /></div>;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Hero Section</h1>
          <p className="text-gray-400 text-sm">Manage the main header text and layout</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 bg-[#071A3D] p-8 rounded-xl border border-[#D4AF37]/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Subtitle (Badge)</label>
            <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Top Title Part</label>
            <input type="text" name="titleTop" value={formData.titleTop} onChange={handleChange} className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Main Title Part (Blue)</label>
            <input type="text" name="titleMain" value={formData.titleMain} onChange={handleChange} className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm text-gray-400">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Primary Button Text</label>
            <input type="text" name="button1Text" value={formData.button1Text} onChange={handleChange} className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Primary Button Link</label>
            <input type="text" name="button1Link" value={formData.button1Link} onChange={handleChange} className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Secondary Button Text</label>
            <input type="text" name="button2Text" value={formData.button2Text} onChange={handleChange} className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Secondary Button Link</label>
            <input type="text" name="button2Link" value={formData.button2Link} onChange={handleChange} className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm text-gray-400">Background Image</label>
            <ImageUpload 
              value={formData.backgroundImage} 
              onChange={(b64) => setFormData(prev => ({ ...prev, backgroundImage: b64 }))} 
              onRemove={() => setFormData(prev => ({ ...prev, backgroundImage: '' }))}
            />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-white/10 mt-6">
          <button type="submit" disabled={saving} className="bg-[#D4AF37] hover:bg-yellow-500 text-[#0B1020] font-bold py-3 px-6 rounded-md flex items-center gap-2 transition-colors disabled:opacity-50">
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
