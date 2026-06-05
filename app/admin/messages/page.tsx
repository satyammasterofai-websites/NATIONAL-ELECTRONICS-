'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, COLLECTIONS } from '@/lib/firebase';
import { Loader2, Trash2, Mail, MailOpen } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  inquiry: string;
  message?: string;
  read: boolean;
  createdAt: any;
}

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const snap = await getDocs(collection(db, COLLECTIONS.CONTACT_MESSAGES));
      const res: ContactMessage[] = [];
      snap.forEach(d => res.push({ id: d.id, ...d.data() } as ContactMessage));
      res.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
      setMessages(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if(!confirm('Delete this message?')) return;
    try {
      await deleteDoc(doc(db, COLLECTIONS.CONTACT_MESSAGES, id));
      await fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.CONTACT_MESSAGES, id), { read: !currentStatus });
      await fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl">
       <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Contact Messages</h1>
        <p className="text-gray-400 text-sm">Review inquiries from your customers</p>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="py-12 flex justify-center"><Loader2 className="animate-spin text-[#D4AF37]" size={32} /></div>
        ) : messages.length === 0 ? (
          <div className="py-12 text-center text-gray-500 bg-[#071A3D] rounded-xl border border-dashed border-white/10">
            No messages found.
          </div>
        ) : messages.map(msg => (
          <div key={msg.id} className={`bg-[#071A3D] border rounded-xl p-6 transition-colors ${msg.read ? 'border-white/10 opacity-70' : 'border-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/5'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${msg.read ? 'bg-white/5 text-gray-500' : 'bg-[#D4AF37]/20 text-[#D4AF37]'}`}>
                  {msg.read ? <MailOpen size={20} /> : <Mail size={20} />}
                </div>
                <div>
                  <h3 className={`font-bold ${msg.read ? 'text-gray-300' : 'text-white'}`}>{msg.name}</h3>
                  <p className="text-sm text-[#D4AF37]">{msg.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleReadStatus(msg.id, msg.read)}
                  className="text-xs px-3 py-1.5 rounded bg-white/5 text-gray-300 hover:text-white transition-colors"
                >
                  Mark as {msg.read ? 'Unread' : 'Read'}
                </button>
                <button 
                  onClick={() => handleDelete(msg.id)}
                  className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <div className="bg-[#0B1020] rounded-lg p-4 border border-white/5">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Inquiry Type: <span className="text-gray-300">{msg.inquiry}</span></div>
              {msg.message ? (
                <p className="text-gray-300 text-sm">{msg.message}</p>
              ) : (
                <p className="text-gray-500 text-sm italic">No additional message provided.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
