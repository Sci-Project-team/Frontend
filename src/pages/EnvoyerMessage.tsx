import { useState } from "react";

function EnvoyerMessage() {
  const [numero, setNumero] = useState("");
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");

  const handleEnvoyer = () => {
    const trimmedNumero = numero.trim();
    const trimmedMessage = message.trim();

    if (!/^\d+$/.test(trimmedNumero)) {
      setErreur("Le numéro ne doit contenir que des chiffres.");
      return;
    }

    if (trimmedNumero.length !== 10) {
      setErreur("Le numéro doit contenir exactement 10 chiffres.");
      return;
    }

    if (!/^0(5|6|7)/.test(trimmedNumero)) {
      setErreur("Le numéro doit commencer par 05, 06 ou 07.");
      return;
    }

    if (!trimmedMessage) {
      setErreur("Le message ne peut pas être vide.");
      return;
    }

    
    console.log("Numéro :", trimmedNumero);
    console.log("Message :", trimmedMessage);
    alert("Message envoyé avec succès !");

   
    setNumero("");
    setMessage("");
    setErreur("");
  };

  return (
    <div className="flex justify-center mt-8 items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Envoyer un message</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Numéro de téléphone
          </label>
          <input
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="Ex: 0612345678"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-colors"
          />
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
          />
        </div>

        {erreur && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
            <p className="font-medium">{erreur}</p>
          </div>
        )}

        <button
          onClick={handleEnvoyer}
          className="w-full bg-blue-600 hover:bg-[#24c669] text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}

export default EnvoyerMessage;