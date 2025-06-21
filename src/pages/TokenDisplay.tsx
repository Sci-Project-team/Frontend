import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function TokenDisplay() {
  const [token, setToken] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get token from navigation state (passed from login)
    const tokenFromState = location.state?.token;

    if (!tokenFromState) {
      // If no token in state, redirect to login
      navigate("/login");
      return;
    }

    setToken(tokenFromState);
  }, [location.state, navigate]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      // Reset copied state after 3 seconds
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      setError("Erreur lors de la copie du token");
      console.error("Failed to copy token:", err);
    }
  };

  const handleNext = () => {
    // Navigate to home page and clear the state
    navigate("/", { replace: true });
  };

  if (!token) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <div className="text-center">
            <p className="text-gray-600">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-6 h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Token d'API</h2>

        <div className="mb-6">
          <p className="text-gray-700 text-sm mb-4">
            Voici votre token d'authentification pour l'API SMS.
            <strong className="text-red-600">
              {" "}
              Copiez-le maintenant car il ne sera plus affiché.
            </strong>
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="bg-gray-50 border border-gray-300 rounded-md p-3 mb-4">
            <div className="break-all text-sm font-mono text-gray-800">
              {token}
            </div>
          </div>

          <button
            onClick={copyToClipboard}
            className={`w-full mb-4 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              copied
                ? "bg-green-500 text-white"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}>
            {copied ? "✓ Token copié!" : "Copier le token"}
          </button>
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
          Continuer
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            ⚠️ Conservez ce token en lieu sûr pour vos intégrations API
          </p>
        </div>
      </div>
    </div>
  );
}

export default TokenDisplay;
