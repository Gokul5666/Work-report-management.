import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', org: '', date: '' });

  useEffect(() => {
    setTimeout(() => setLoading(true), 5000); // 5-second Splash
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    if(formData.name && formData.org) setUser(formData);
  };

  const addTask = () => setTasks([...tasks, { id: Date.now(), text: '', status: 'Pending' }]);
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const exportData = () => {
    const ws = XLSX.utils.json_to_sheet(tasks);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reports");
    XLSX.writeFile(wb, `${user.name}_Work_Report.xlsx`);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
        <h1 className="text-gold text-2xl font-bold mb-4 tracking-widest">SPECIAL ENTERPRISE WORK MANAGEMENT</h1>
        <div className="w-64 bg-gray-800 rounded-full h-1 overflow-hidden">
          <div className="loading-bar"></div>
        </div>
        <p className="mt-8 text-gray-500 font-light italic">Produced by Gokul Strategic Systems</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <form onSubmit={handleRegister} className="bg-gray-900 p-8 rounded-xl border border-gold w-full max-w-md">
          <h2 className="text-2xl mb-6 text-gold font-bold">Enterprise Registration</h2>
          <input className="w-full mb-4" placeholder="Full Name" required onChange={e => setFormData({...formData, name: e.target.value})} />
          <input className="w-full mb-4" type="date" required onChange={e => setFormData({...formData, date: e.target.value})} />
          <input className="w-full mb-6" placeholder="Organisation" required onChange={e => setFormData({...formData, org: e.target.value})} />
          <button className="w-full py-3 rounded font-bold uppercase tracking-widest">Register & Enter Center</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <nav className="border-b border-gold pb-4 mb-8 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gold">{user.name}'s Work Report Management Center</h1>
        <button onClick={exportData} className="bg-green-700 px-4 py-2 rounded text-sm">Export Excel</button>
      </nav>

      <div className="grid gap-4">
        {tasks.map(task => (
          <div key={task.id} className="bg-gray-900 p-4 rounded border border-gray-800 flex items-center">
            <input className="flex-1 bg-transparent border-none" placeholder="Enter task details..." />
            <button onClick={() => deleteTask(task.id)} className="ml-4 text-red-500 font-bold">✕</button>
          </div>
        ))}
        <button onClick={addTask} className="border border-dashed border-gold p-4 rounded text-gold hover:bg-gold hover:text-black transition">
          + Add Automatic Task Slot
        </button>
      </div>
    </div>
  );
}
