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

    // ✅ Envoi simulé
    console.log("Numéro :", trimmedNumero);
    console.log("Message :", trimmedMessage);
    alert("Message envoyé avec succès !");

    // Reset
    setNumero("");
    setMessage("");
    setErreur("");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "left" }}>
      <h2>Envoyer un message</h2>

      <label>Numéro de téléphone :</label>
      <input
        type="text"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        placeholder="Ex: 0612345678"
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <label>Message :</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Votre message ici..."
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        rows={4}
      />

      {erreur && (
        <div style={{ color: "red", marginBottom: "10px" }}>{erreur}</div>
      )}

      <button onClick={handleEnvoyer} style={{ padding: "10px 20px" }}>
        Envoyer
      </button>
    </div>
  );
}

export default EnvoyerMessage;
