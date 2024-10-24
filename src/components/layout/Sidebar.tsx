import { LogOut, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../services/api';
import { toast } from 'react-hot-toast';

const Sidebar = () => {
  const { user, logout } = useAuth();
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
    <aside className="w-50 bg-[#782DAF] p-4 flex flex-col shadow-lg rounded-lg"> {/* Agregado shadow-lg y rounded-lg para sombra y bordes redondeados */}
      
      {/* Sección del nombre de usuario estilizada */}
      <div className="flex items-center mb-6">
        {/* Avatar o icono */}
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-purple-700 font-bold mr-4">
          {user ? user.first_name.charAt(0) + user.last_name.charAt(0) : "G"}
        </div>

        {/* Nombre del usuario */}
        <div>
          <p className="text-white text-lg font-semibold">
            {user ? `${user.first_name} ${user.last_name}` : "Guest"}
          </p>
          {user && (
            <p className="text-purple-200 text-sm">Welcome back!</p>
          )}
        </div>
      </div>

      <div className="flex-1">
        <button className="w-full flex items-center gap-2 text-white bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors">
          <FileText size={20} />
          <span>Transcription</span>
        </button>
      </div>
      
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-white hover:bg-white/10 rounded-lg p-3 transition-colors w-full mt-4"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
