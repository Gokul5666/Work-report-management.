import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import * as XLSX from 'xlsx';

export default function App() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [reports, setReports] = useState(() => JSON.parse(localStorage.getItem('gss_reports')) || {});

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (user) {
        setShowWelcome(true);
        setTimeout(() => setShowWelcome(false), 2000);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    setUser(data);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center font-montserrat">
        <div className="text-7xl font-bold text-gold mb-8">GSS</div>
        <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-gold animate-loading"></div>
        </div>
        <p className="text-slate-400 text-[10px] tracking-[0.3em] uppercase mb-12">SPECIAL ENTERPRISE WORK MANAGEMENT</p>
        <div className="animate-signature text-gold italic tracking-widest text-sm">Powered by Gokul Strategic Systems</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-4 border border-gold/20 p-8 rounded-lg">
          <h2 className="text-gold text-2xl font-bold mb-6">Enterprise Login</h2>
          <input name="name" placeholder="Full Name" required className="w-full bg-transparent border-b border-slate-700 py-2 outline-none text-white focus:border-gold" />
          <input name="email" type="email" placeholder="Email ID" required className="w-full bg-transparent border-b border-slate-700 py-2 outline-none text-white focus:border-gold" />
          <input name="mobile" placeholder="Mobile" required className="w-full bg-transparent border-b border-slate-700 py-2 outline-none text-white focus:border-gold" />
          <input name="profession" placeholder="Profession" required className="w-full bg-transparent border-b border-slate-700 py-2 outline-none text-white focus:border-gold" />
          <input name="organisation" placeholder="Organisation" required className="w-full bg-transparent border-b border-slate-700 py-2 outline-none text-white focus:border-gold" />
          <button className="w-full bg-gold text-slate-950 font-bold py-3 mt-4 hover:bg-gold/90 transition-all">ENTER CENTER</button>
        </form>
      </div>
    );
  }

  if (showWelcome) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex items-center justify-center">
        <h1 className="text-gold text-3xl font-light">Welcome back, {user.name}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-montserrat p-4 md:p-8">
      <header className="flex justify-between items-center border-b border-gold/20 pb-4 mb-8">
        <h1 className="text-gold font-bold">{user.name}'s work report management center</h1>
        <button onClick={() => { setUser(null); localStorage.clear(); }} className="text-slate-400 text-sm">Logout</button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="bg-slate-900/50 p-4 border border-gold/10 h-fit">
          <h3 className="text-gold text-xs uppercase mb-4">Menu & Strategic Tasks</h3>
          <p className="text-slate-500 text-sm italic">Tasks will appear here...</p>
        </div>
        <div className="md:col-span-3 space-y-6">
          {["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"].map(time => (
            <div key={time} className="flex gap-4 border-l-2 border-gold/20 pl-4">
              <span className="text-gold text-sm w-20">{time}</span>
              <input placeholder="Task 1..." className="flex-1 bg-transparent border-b border-slate-800 focus:border-gold outline-none pb-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}