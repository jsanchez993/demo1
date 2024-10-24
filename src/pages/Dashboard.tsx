import React from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-[#B09AD9]">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-white mb-6">
          Welcome, {user?.first_name} {user?.last_name}!
        </h1>
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Dashboard Content</h2>
          <p className="text-gray-600">Your main content goes here...</p>
        </div>
      </main>  
    </div>
  );
};

export default Dashboard;