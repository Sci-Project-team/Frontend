import { useState } from "react";

function EnvoyerMessage() {
  const [numero, setNumero] = useState("");
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");

  const handleEnvoyer = async () => {
    const trimmedNumero = numero.trim();
    const trimmedMessage = message.trim();

    setErreur("");
    setSuccess("");

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

    try {
     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJuaW5hIiwiZXhwIjoxNzQ5NjY3NDkxfQ.K_4XBMYBv_LVS4g7nMQYhV7QLLwpTeHEjdnFINPGyuE";

const response = await fetch("http://localhost:8000/sms", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`, 
  },
  body: JSON.stringify({
    phone_number: "+213" + trimmedNumero.slice(1),
    message: trimmedMessage,
  }),
});

      if (!response.ok) {
        const error = await response.json();
        setErreur(error.detail || "Une erreur s'est produite lors de l'envoi.");
        return;
      }

      const data = await response.json();
      console.log("Réponse API:", data);
      setSuccess("Message envoyé avec succès !");
      setNumero("");
      setMessage("");
    } catch (err) {
      setErreur("Erreur réseau ou serveur.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center mt-8 items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Envoyer un message</h2>

        {erreur && <p className="text-red-500 mb-4">{erreur}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

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

        <button
          onClick={handleEnvoyer}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}

export default EnvoyerMessage;
