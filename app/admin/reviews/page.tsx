'use client';
import { useState, useEffect } from 'react';
import { collection, doc, getDocs, setDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db, COLLECTIONS } from '@/lib/firebase';
import { Save, Loader2, Plus, Trash2, Edit, Star } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export default function ReviewsAdmin() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Review | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchReviews = async () => {
    try {
      const snap = await getDocs(collection(db, COLLECTIONS.REVIEWS));
      const res: Review[] = [];
      snap.forEach(doc => {
        res.push({ id: doc.id, ...doc.data() } as Review);
      });
      setReviews(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchReviews();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      const data = {
        name: editing.name,
        text: editing.text,
        rating: Number(editing.rating)
      };
      if (editing.id) {
        await setDoc(doc(db, COLLECTIONS.REVIEWS, editing.id), data);
      } else {
        await addDoc(collection(db, COLLECTIONS.REVIEWS), data);
      }
      setEditing(null);
      await fetchReviews();
    } catch (err) {
      console.error(err);
      alert('Error saving review: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm('Delete this review?')) return;
    try {
      await deleteDoc(doc(db, COLLECTIONS.REVIEWS, id));
      await fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Customer Reviews</h1>
          <p className="text-gray-400 text-sm">Manage testimonials displayed on the site</p>
        </div>
        {!editing && (
          <button 
            onClick={() => setEditing({ id: '', name: '', text: '', rating: 5 })}
            className="bg-[#D4AF37] hover:bg-yellow-500 text-[#0B1020] font-bold py-2 px-4 rounded-md flex items-center gap-2"
          >
            <Plus size={18} /> Add Review
          </button>
        )}
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="bg-[#071A3D] p-8 rounded-xl border border-[#D4AF37]/20 space-y-6">
          <h2 className="text-xl font-semibold text-white">{editing.id ? 'Edit Review' : 'New Review'}</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Customer Name</label>
                <input required type="text" value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Rating (1-5)</label>
                <input type="number" min="1" max="5" value={editing.rating} onChange={e => setEditing({...editing, rating: parseInt(e.target.value)})} className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]" />
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Review Text</label>
              <textarea required rows={4} value={editing.text} onChange={e => setEditing({...editing, text: e.target.value})} className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]" />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-white/10 mt-6">
            <button type="button" onClick={() => setEditing(null)} className="px-6 py-3 rounded-md font-medium text-gray-300 hover:text-white transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="bg-[#D4AF37] hover:bg-yellow-500 text-[#0B1020] font-bold py-3 px-6 rounded-md flex items-center gap-2 transition-colors disabled:opacity-50">
              {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              Save Review
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-full py-12 flex justify-center"><Loader2 className="animate-spin text-[#D4AF37]" size={32} /></div>
          ) : reviews.map(review => (
            <div key={review.id} className="bg-[#071A3D] border border-white/10 rounded-xl p-6 relative group hover:border-[#D4AF37]/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-white text-lg">{review.name}</h3>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < review.rating ? "text-[#D4AF37] fill-current" : "text-gray-600"} />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(review)} className="p-1.5 text-gray-400 hover:text-[#D4AF37] transition-colors rounded-md bg-white/5 opacity-0 group-hover:opacity-100">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(review.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-md bg-white/5 opacity-0 group-hover:opacity-100">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-gray-300 text-sm italic">&quot;{review.text}&quot;</p>
            </div>
          ))}
          {!loading && reviews.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-[#071A3D] rounded-xl border border-dashed border-white/10">
              No reviews found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
