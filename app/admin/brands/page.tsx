'use client';
import { useState, useEffect } from 'react';
import { collection, doc, getDocs, setDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db, COLLECTIONS } from '@/lib/firebase';
import ImageUpload from '@/components/admin/ImageUpload';
import { Save, Loader2, Plus, Trash2, Edit } from 'lucide-react';

interface Brand {
  id: string;
  name: string;
  logo: string;
  displayOrder: number;
}

export default function BrandsAdmin() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchBrands = async () => {
    try {
      const snap = await getDocs(collection(db, COLLECTIONS.BRANDS));
      const res: Brand[] = [];
      snap.forEach(doc => {
        res.push({ id: doc.id, ...doc.data() } as Brand);
      });
      res.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
      setBrands(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBrands();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      const data = {
        name: editing.name,
        logo: editing.logo,
        displayOrder: Number(editing.displayOrder) || 0
      };
      if (editing.id) {
        await setDoc(doc(db, COLLECTIONS.BRANDS, editing.id), data);
      } else {
        await addDoc(collection(db, COLLECTIONS.BRANDS), data);
      }
      setEditing(null);
      await fetchBrands();
    } catch (err) {
      console.error(err);
      alert('Error saving brand: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm('Delete this brand?')) return;
    try {
      await deleteDoc(doc(db, COLLECTIONS.BRANDS, id));
      await fetchBrands();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Brands Management</h1>
          <p className="text-gray-400 text-sm">Add and manage top brands shown on the website</p>
        </div>
        {!editing && (
          <button 
            onClick={() => setEditing({ id: '', name: '', logo: '', displayOrder: brands.length + 1 })}
            className="bg-[#D4AF37] hover:bg-yellow-500 text-[#0B1020] font-bold py-2 px-4 rounded-md flex items-center gap-2"
          >
            <Plus size={18} /> Add Brand
          </button>
        )}
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="bg-[#071A3D] p-8 rounded-xl border border-[#D4AF37]/20 space-y-6">
          <h2 className="text-xl font-semibold text-white">{editing.id ? 'Edit Brand' : 'New Brand'}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Brand Name</label>
                <input required type="text" value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Display Order</label>
                <input type="number" value={editing.displayOrder} onChange={e => setEditing({...editing, displayOrder: parseInt(e.target.value)})} className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]" />
              </div>
            </div>
            
            <div>
              <ImageUpload 
                label="Brand Logo" 
                value={editing.logo} 
                onChange={(b64) => setEditing({...editing, logo: b64})} 
                onRemove={() => setEditing({...editing, logo: ''})}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-white/10 mt-6">
            <button type="button" onClick={() => setEditing(null)} className="px-6 py-3 rounded-md font-medium text-gray-300 hover:text-white transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="bg-[#D4AF37] hover:bg-yellow-500 text-[#0B1020] font-bold py-3 px-6 rounded-md flex items-center gap-2 transition-colors disabled:opacity-50">
              {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              Save Brand
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full py-12 flex justify-center"><Loader2 className="animate-spin text-[#D4AF37]" size={32} /></div>
          ) : brands.map(brand => (
            <div key={brand.id} className="bg-[#071A3D] border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center relative group hover:border-[#D4AF37]/50 transition-colors">
              {brand.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={brand.logo} alt={brand.name} className="h-16 object-contain mb-4" />
              ) : (
                <div className="h-16 w-full flex items-center justify-center text-gray-500 font-bold text-xl uppercase mb-4 tracking-wider">{brand.name}</div>
              )}
              <span className="text-gray-400 text-sm">{brand.name}</span>
              
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-3">
                <button onClick={() => setEditing(brand)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-[#0B1020] transition-colors">
                  <Edit size={18} />
                </button>
                <button onClick={() => handleDelete(brand.id)} className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
