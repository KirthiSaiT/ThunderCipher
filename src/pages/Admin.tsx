import React from 'react';
import { useAuth } from '@/hooks/useAuth';

const ADMIN_EMAIL = 'kirthisai251@gmail.com';

const Admin = () => {
  const { user } = useAuth();

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Not authorized</h1>
        <p className="text-gray-400">You do not have access to this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white">
      <div className="w-full max-w-2xl glass-card p-8 mt-16">
        <h1 className="text-3xl font-bold mb-6 text-cyan-400 text-center">Admin Portal</h1>
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-2 text-cyan-300">Manage Labs</h2>
            <p className="text-gray-400 mb-2">Add, edit, or delete labs here.</p>
            {/* TODO: Add lab management UI */}
            <div className="bg-slate-800 rounded p-4 text-gray-500">Lab management coming soon...</div>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-cyan-300">Manage Challenges</h2>
            <p className="text-gray-400 mb-2">Add, edit, or delete challenges here.</p>
            {/* TODO: Add challenge management UI */}
            <div className="bg-slate-800 rounded p-4 text-gray-500">Challenge management coming soon...</div>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-cyan-300">Manage Events</h2>
            <p className="text-gray-400 mb-2">Add, edit, or delete events and registrations here.</p>
            {/* TODO: Add event management UI */}
            <div className="bg-slate-800 rounded p-4 text-gray-500">Event management coming soon...</div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Admin; 