import React from 'react';
import { LogOut, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../services/api';
import { toast } from 'react-hot-toast';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await logoutUser(token);
        localStorage.removeItem('token');
        logout();
        navigate('/login');
        toast.success('Logged out successfully');
      }
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <aside className="w-50 bg-[#782DAF] p-4 flex flex-col">
      <div className="flex-1">
        <button className="w-full flex items-center gap-2 text-white bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors">
          <FileText size={20} />
          <span>Transcription</span>
        </button>
      </div>
      
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-white hover:bg-white/10 rounded-lg p-3 transition-colors w-full"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;