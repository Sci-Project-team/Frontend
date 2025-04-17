
import { messagesEnvoye } from "../data/StaticMessages"; // Importation des messages envoyés

type Message = {
  numero: string;
  texte: string;
  date: string;
};

interface HistoriqueProps {
  messages: Message[];
}

function Historique({ messages }: HistoriqueProps) {
  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Historique des Messages Envoyés</h2>
      {messages.map((message, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            <div>{message.numero}</div>
            <div>{new Date(message.date).toLocaleString()}</div>
          </div>
          <div style={{ fontSize: "16px", color: "#333" }}>{message.texte}</div>
        </div>
      ))}
    </div>
  );
}

function HistoriqueWrapper() {
  return <Historique messages={messagesEnvoye} />; // Passage des messages envoyés en prop
}

export default HistoriqueWrapper;
