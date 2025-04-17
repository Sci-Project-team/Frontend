import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  
  return (
    <div className="flex justify-start w-full">
      <nav className="flex gap-4 px-6 py-3 bg-blue-300 rounded-full mx-auto">
        <Link 
          to="/" 
          className={`text-white hover:text-blue-100 ${location.pathname === '/' ? 'text-green-400 font-bold' : ''}`}
        >
          Envoyer message
        </Link>
        <Link 
          to="/recu" 
          className={`text-white hover:text-blue-100 ${location.pathname === '/recu' ? 'text-green-400 font-bold' : ''}`}
        >
          Message reçu
        </Link>
        <Link 
          to="/historique" 
          className={`text-white hover:text-blue-100 ${location.pathname === '/historique' ? 'text-green-400 font-bold' : ''}`}
        >
          Historique
        </Link>
      </nav>
    </div>
  );
}