'use client';
import { useState, useEffect } from 'react';
import { collection, doc, getDocs, setDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db, COLLECTIONS } from '@/lib/firebase';
import ImageUpload from '@/components/admin/ImageUpload';
import { Save, Loader2, Plus, Edit, Trash2 } from 'lucide-react';

interface ProductCategory {
  id: string;
  category: string;
  items: string[];
  image: string;
  displayOrder?: number;
}

export default function ProductsAdmin() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ProductCategory | null>(null);
  const [saving, setSaving] = useState(false);
  const [itemsInput, setItemsInput] = useState('');

  const fetchCategories = async () => {
    try {
      const snap = await getDocs(collection(db, COLLECTIONS.PRODUCTS));
      const res: ProductCategory[] = [];
      snap.forEach(doc => {
        res.push({ id: doc.id, ...doc.data() } as ProductCategory);
      });
      res.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
      setCategories(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (cat: ProductCategory) => {
    setEditing(cat);
    setItemsInput(cat.items ? cat.items.join(', ') : '');
  };

  const handleAddNew = () => {
    setEditing({ id: '', category: '', items: [], image: '', displayOrder: categories.length + 1 });
    setItemsInput('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      const itemsArray = itemsInput.split(',').map(s => s.trim()).filter(s => s !== '');
      const data = {
        category: editing.category,
        items: itemsArray,
        image: editing.image,
        displayOrder: editing.displayOrder || 99
      };
      
      if (editing.id) {
        await setDoc(doc(db, COLLECTIONS.PRODUCTS, editing.id), data);
      } else {
        await addDoc(collection(db, COLLECTIONS.PRODUCTS), data);
      }
      setEditing(null);
      await fetchCategories();
    } catch (err) {
      console.error(err);
      alert('Error saving category: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, COLLECTIONS.PRODUCTS, id));
      await fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Product Categories Management</h1>
          <p className="text-gray-400 text-sm">Add and manage the product categories shown on the homepage</p>
        </div>
        {!editing && (
          <button 
            onClick={handleAddNew}
            className="bg-[#D4AF37] hover:bg-yellow-500 text-[#0B1020] font-bold py-2 px-4 rounded-md flex items-center gap-2"
          >
            <Plus size={18} /> Add Category
          </button>
        )}
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="bg-[#071A3D] p-8 rounded-xl border border-[#D4AF37]/20 space-y-6">
          <h2 className="text-xl font-semibold text-white">{editing.id ? 'Edit Category' : 'New Category'}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Category Title</label>
                <input required type="text" value={editing.category} onChange={e => setEditing({...editing, category: e.target.value})} placeholder="e.g. Televisions" className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]" />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Sub-items (comma separated)</label>
                <textarea rows={3} value={itemsInput} onChange={e => setItemsInput(e.target.value)} placeholder="Smart TVs, OLED, 4K UHD..." className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]" />
              </div>
              
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Display Order</label>
                <input type="number" value={editing.displayOrder} onChange={e => setEditing({...editing, displayOrder: parseInt(e.target.value)})} className="w-full bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]" />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <ImageUpload 
                label="Category Image" 
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
              Save Category
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full py-12 flex justify-center"><Loader2 className="animate-spin text-[#D4AF37]" size={32} /></div>
          ) : categories.map(cat => (
            <div key={cat.id} className="bg-[#071A3D] border border-white/10 rounded-xl overflow-hidden hover:border-[#D4AF37]/50 transition-colors">
              <div className="h-48 bg-[#0B1020] relative flex flex-col items-center justify-center">
                {cat.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cat.image} alt={cat.category} className="w-full h-full object-cover" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-white mb-2">{cat.category}</h3>
                <p className="text-xs text-gray-400 mb-4 truncate">{cat.items?.join(', ') || 'No sub-items'}</p>
                <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-2">
                  <span className="text-xs text-gray-500">Order: {cat.displayOrder}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(cat)} className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {!loading && categories.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-[#071A3D] rounded-xl border border-dashed border-white/10">
              No categories found. Start building your catalog!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
