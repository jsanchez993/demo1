import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../services/api';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';

// Estilo personalizado con styled-components
const StyledWrapper = styled.div`
  .btn-shine {
    display: inline-block;
    padding: 12px 48px;
    color: #fff;
    background: linear-gradient(to right, #6b21a8 0%, #9b4ccc 50%, #6b21a8 100%); /* Colores púrpura más oscuros */
    background-position: 0;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600; /* Cambiado a 700 para mayor impacto */
    font-size: 16px; /* Tamaño de fuente más grande */
    font-family: 'Roboto', sans-serif; /* Fuente más fuerte y moderna */
    text-transform: uppercase;
    letter-spacing: 1px; /* Espaciado entre letras */
    transition: all 0.4s ease-in-out;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 18px rgba(107, 33, 168, 0.6); /* Sombra púrpura más visible */
  }

  .btn-shine:hover {
    color: #fff;
    box-shadow: 0 0 25px rgba(107, 33, 168, 0.8); /* Sombra más pronunciada al hover */
    background-position: 200%;
  }

  .btn-shine::before {
    content: '';
    position: absolute;
    top: 0;
    left: -50%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.4) 40%,
      rgba(255, 255, 255, 0.1) 70%,
      rgba(255, 255, 255, 0.05) 100%
    );
    z-index: 1;
    transition: all 0.4s ease-in-out;
  }

  .btn-shine:hover::before {
    left: 100%;
  }
`;

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
    <aside className="w-50 bg-[#782DAF] p-4 flex flex-col shadow-lg rounded-lg">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-purple-700 font-bold mr-4">
          {user ? user.first_name.charAt(0) + user.last_name.charAt(0) : 'G'}
        </div>
        <div>
          <p className="text-white text-lg font-semibold">
            {user ? `${user.first_name} ${user.last_name}` : 'Guest'}
          </p>
          {user && <p className="text-purple-200 text-sm">Welcome back!</p>}
        </div>
      </div>

      <div className="flex-1">
        <button className="w-full flex items-center gap-2 text-white bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors">
          <FileText size={20} />
          <span>Transcription</span>
        </button>
      </div>

      {/* Botón de logout con efecto shine modificado */}
      <StyledWrapper>
        <a href="#" className="btn-shine" onClick={handleLogout}>
          Logout
        </a>
      </StyledWrapper>
    </aside>
  );
};

export default Sidebar;
