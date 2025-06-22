import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="flex justify-start mt-5 w-full">
      <nav className="flex gap-4 px-6 py-3 bg-blue-600 rounded-full mx-auto">
        <Link 
          to="/" 
          className={`text-white hover:text-blue-100 ${location.pathname === '/' ? 'text-green-400 font-bold' : ''}`}
        >
          Envoyer message
        </Link>
        
        <Link 
          to="/historique" 
          className={`text-white hover:text-blue-100 ${location.pathname === '/historique' ? 'text-green-400 font-bold' : ''}`}
        >
          Historique
        </Link>
        <Link 
          to="/logs" 
          className={`text-white hover:text-blue-100 ${location.pathname === '/logs' ? 'text-green-400 font-bold' : ''}`}
        >
          Logs
        </Link>
        <button
          onClick={handleLogout}
          className="text-white hover:text-red-300 ml-auto"
        >
          Déconnexion
        </button>
      </nav>
    </div>
  );
}