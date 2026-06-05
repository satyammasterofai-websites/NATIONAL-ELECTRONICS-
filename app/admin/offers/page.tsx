'use client';
import { useState, useEffect } from 'react';
import { collection, doc, getDocs, setDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db, COLLECTIONS } from '@/lib/firebase';
import ImageUpload from '@/components/admin/ImageUpload';
import { Save, Loader2, Plus, Trash2, Edit } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  buttonText: string;
}

export default function OffersAdmin() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Offer | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchOffers = async () => {
    try {
      const snap = await getDocs(collection(db, COLLECTIONS.OFFERS));
      const res: Offer[] = [];
      snap.forEach(doc => {
        res.push({ id: doc.id, ...doc.data() } as Offer);
      });
      setOffers(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOffers();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        await setDoc(doc(db, COLLECTIONS.OFFERS, editing.id), {
          title: editing.title,
          description: editing.description,
          price: editing.price,
          image: editing.image,
          buttonText: editing.buttonText
        });
      } else {
        await addDoc(collection(db, COLLECTIONS.OFFERS), {
          title: editing.title,
          description: editing.description,
          price: editing.price,
          image: editing.image,
          buttonText: editing.buttonText
        });
      }
      setEditing(null);
      await fetchOffers();
    } catch (err) {
      console.error(err);
      alert('Error saving offer: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm('Delete this offer?')) return;
    try {
      await deleteDoc(doc(db, COLLECTIONS.OFFERS, id));
      await fetchOffers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Offers Management</h1>
          <p className="text-gray-400 text-sm">Add and manage promotional offers</p>
        </div>
        {!editing && (
          <button 
            onClick={() => setEditing({ id: '', title: '', description: '', price: '', image: '', buttonText: 'View Details' })}
            className="bg-[#D4AF37] hover:bg-yellow-500 text-[#0B1020] font-bold py-2 px-4 rounded-md flex items-center gap-2"
          >
            <Plus size={18} /> Add Offer
          </button>
        )}
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="bg-[#071A3D] p-8 rounded-xl border border-[#D4AF37]/20 space-y-6">
          <h2 className="text-xl font-semibold text-white">{editing.id ? 'Edit Offer' : 'New Offer'}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Title</label>
                <input required type="text" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Description</label>
                <textarea required rows={3} value={editing.description} onChange={e => setEditing({...editing, description: e.target.value})} className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Price / Discount Text</label>
                <input type="text" value={editing.price} onChange={e => setEditing({...editing, price: e.target.value})} className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Button Text</label>
                <input type="text" value={editing.buttonText} onChange={e => setEditing({...editing, buttonText: e.target.value})} className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]" />
              </div>
            </div>
            
            <div>
              <ImageUpload 
                label="Offer Image" 
                value={editing.image} 
                onChange={(b64) => setEditing({...editing, image: b64})} 
                onRemove={() => setEditing({...editing, image: ''})}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-white/10 mt-6">
            <button type="button" onClick={() => setEditing(null)} className="px-6 py-3 rounded-md font-medium text-gray-300 hover:text-white transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="bg-[#D4AF37] hover:bg-yellow-500 text-[#0B1020] font-bold py-3 px-6 rounded-md flex items-center gap-2 transition-colors disabled:opacity-50">
              {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              Save Offer
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-12 flex justify-center"><Loader2 className="animate-spin text-[#D4AF37]" size={32} /></div>
          ) : offers.map(offer => (
            <div key={offer.id} className="bg-[#071A3D] border border-white/10 rounded-xl overflow-hidden hover:border-[#D4AF37]/50 transition-colors">
              <div className="h-48 bg-[#0B1020] relative">
                {offer.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-white mb-1 truncate">{offer.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{offer.description}</p>
                <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-2">
                  <span className="text-[#D4AF37] font-semibold">{offer.price}</span>
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(offer)} className="p-2 text-gray-400 hover:text-[#D4AF37] transition-colors bg-white/5 rounded-md">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(offer.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-white/5 rounded-md">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {!loading && offers.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-[#071A3D] rounded-xl border border-dashed border-white/10">
              No offers found. Create your first offer!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
