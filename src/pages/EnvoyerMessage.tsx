import { useState } from "react";

function EnvoyerMessage() {
  const [numero, setNumero] = useState("");
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Function to convert local format to international format
  const formatPhoneNumber = (phoneNumber: string) => {
    const trimmed = phoneNumber.trim();
    
    // If it starts with 0, replace with +213
    if (trimmed.startsWith('0')) {
      return '+213' + trimmed.substring(1);
    }
    
    // If it already has +213, keep as is
    if (trimmed.startsWith('+213')) {
      return trimmed;
    }
    
    // If it's just digits and 9 chars (without leading 0), add +213
    if (/^\d{9}$/.test(trimmed)) {
      return '+213' + trimmed;
    }
    
    return trimmed;
  };

  const handleEnvoyer = async () => {
    const trimmedNumero = numero.trim();
    const trimmedMessage = message.trim();

    // Reset previous messages
    setErreur("");
    setSuccess("");

    // Validation for Algerian phone numbers
    if (!/^\d+$/.test(trimmedNumero.replace(/^\+213/, ''))) {
      setErreur("Le numéro ne doit contenir que des chiffres (avec ou sans +213).");
      return;
    }

    // Check if it's a valid Algerian mobile format
    const cleanNumber = trimmedNumero.replace(/^\+213/, '').replace(/^0/, '');
    
    if (cleanNumber.length !== 9) {
      setErreur("Le numéro doit contenir 9 chiffres après l'indicatif.");
      return;
    }

    if (!/^(5|6|7)/.test(cleanNumber)) {
      setErreur("Le numéro mobile doit commencer par 5, 6 ou 7 (après +213).");
      return;
    }

    if (!trimmedMessage) {
      setErreur("Le message ne peut pas être vide.");
      return;
    }

    setLoading(true);

    try {
      // Format phone number to international format
      const formattedPhone = formatPhoneNumber(trimmedNumero);
          
      // Send request to backend API
      const response = await fetch('http://192.168.146.44/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formattedPhone,
          text: trimmedMessage
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setSuccess("Message envoyé avec succès!");
        // Clear form
        setNumero("");
        setMessage("");
      } else {
        setErreur(data.error || "Erreur lors de l'envoi du message.");
      }
    } catch (error) {
      	let message
	      if (error instanceof Error) message = error.message
	      else message = String(error)
        console.error("Error:", error);
      
      // More specific error messages
      if (message.includes('fetch')) {
        setErreur("Impossible de se connecter au serveur. Vérifiez l'adresse IP et que le serveur ESP32 est démarré.");
      } else if (message.includes('CORS')) {
        setErreur("Erreur CORS. Le serveur doit autoriser les requêtes depuis cette origine.");
      } else {
        setErreur(`Erreur de connexion: ${message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-8 items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Envoyer un SMS</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Numéro de téléphone
          </label>
          <input
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="Ex: 0782819451 ou +213782819451"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-colors"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Format accepté: 07XXXXXXXX ou +213XXXXXXXXX
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Votre message ici..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-colors"
            disabled={loading}
          />
        </div>

        {erreur && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
            <p className="font-medium">{erreur}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
            <p className="font-medium">{success}</p>
          </div>
        )}

        <button
          onClick={handleEnvoyer}
          disabled={loading}
          className={`w-full font-bold py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed text-gray-700' 
              : 'bg-blue-600 hover:bg-green-500 text-white'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Envoi en cours...
            </div>
          ) : (
            'Envoyer SMS'
          )}
        </button>
        
      </div>
    </div>
  );
}

export default EnvoyerMessage;