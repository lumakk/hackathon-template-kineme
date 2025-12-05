import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

// Simple interface for a "Resource"
interface Resource {
  id: string;
  name: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [items, setItems] = useState<Resource[]>([]);
  const [newItem, setNewItem] = useState('');

  // Fetch data
  const fetchItems = async () => {
    if (!user) return;
    const querySnapshot = await getDocs(collection(db, 'resources'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Resource));
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, [user]);

  const handleAdd = async () => {
    if (!newItem.trim()) return;
    await addDoc(collection(db, 'resources'), { name: newItem, createdBy: user?.uid });
    setNewItem('');
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'resources', id));
    fetchItems();
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      
      {/* Create */}
      <div className="flex gap-2 mb-8">
        <input 
          className="input-field max-w-xs" 
          value={newItem} 
          onChange={e => setNewItem(e.target.value)} 
          placeholder="New Resource Name"
        />
        <button onClick={handleAdd} className="btn-primary mt-1">Add</button>
      </div>

      {/* Read / Delete */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.id} className="p-4 border rounded shadow bg-white flex justify-between items-center">
            <span className="font-medium">{item.name}</span>
            <button 
              onClick={() => handleDelete(item.id)}
              className="text-red-500 hover:text-red-700 text-sm font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
