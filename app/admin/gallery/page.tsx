'use client';
import { useState, useEffect } from 'react';
import { collection, doc, getDocs, setDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db, COLLECTIONS } from '@/lib/firebase';
import ImageUpload from '@/components/admin/ImageUpload';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';

interface GalleryImage {
  id: string;
  image: string;
  category: string;
}

const CATEGORIES = [
  'Shop Exterior', 'Showroom Interior', 'TV Section', 'AC Section', 'Refrigerator Section', 'Customer Deliveries'
];

export default function GalleryAdmin() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState(CATEGORIES[1]);
  const [newImage, setNewImage] = useState('');

  const fetchImages = async () => {
    try {
      const snap = await getDocs(collection(db, COLLECTIONS.GALLERY));
      const res: GalleryImage[] = [];
      snap.forEach(doc => res.push({ id: doc.id, ...doc.data() } as GalleryImage));
      setImages(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchImages();
  }, []);

  const handleUpload = async () => {
    if (!newImage) return;
    setUploading(true);
    try {
      await addDoc(collection(db, COLLECTIONS.GALLERY), {
        image: newImage,
        category
      });
      setNewImage('');
      await fetchImages();
    } catch (err) {
      console.error(err);
      alert('Upload failed: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm('Delete this image?')) return;
    try {
      await deleteDoc(doc(db, COLLECTIONS.GALLERY, id));
      await fetchImages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gallery Management</h1>
          <p className="text-gray-400 text-sm">Upload and categorize showroom photos</p>
        </div>
      </div>

      <div className="bg-[#071A3D] p-8 rounded-xl border border-[#D4AF37]/20 mb-12">
        <h2 className="text-lg font-semibold text-white mb-4">Upload New Photo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <ImageUpload 
            value={newImage} 
            onChange={setNewImage} 
            onRemove={() => setNewImage('')} 
          />
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37] appearance-none">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button 
              onClick={handleUpload} 
              disabled={!newImage || uploading}
              className="w-full bg-[#D4AF37] hover:bg-yellow-500 text-[#0B1020] font-bold py-3 px-6 rounded-md flex justify-center items-center gap-2 transition-colors disabled:opacity-50"
            >
              {uploading ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
              Upload Photo
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full py-12 flex justify-center"><Loader2 className="animate-spin text-[#D4AF37]" size={32} /></div>
        ) : images.map(img => (
          <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.image} alt="Gallery" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
              <span className="text-white text-sm font-semibold mb-3 text-center">{img.category}</span>
              <button onClick={() => handleDelete(img.id)} className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
