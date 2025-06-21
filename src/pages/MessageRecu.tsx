import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

type Message = {
  numero: string;
  texte: string;
  date: string;
};

function MessageRecu({ messages }: { messages: Message[] }) {
  return (
    <div className="flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Messages Reçus</h2>
        
        {messages.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
            Aucun message reçu pour le moment
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-center mb-3 text-sm">
                  <div className="font-medium text-blue-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                    {message.numero}
                  </div>
                  <div className="text-gray-500 font-mono text-xs">
                    {message.date}
                  </div>
                </div>
                <div className="text-gray-700 leading-relaxed bg-white p-3 rounded-md border border-gray-100">
                  {message.texte}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MessageRecuWrapper() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch("http://localhost:8080/sms/inbox?limit=50", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        
        console.log("API Response:", data);
        if (data.length > 0) {
          console.log("First message structure:", data[0]);
        }

        setMessages(
          data.map((sms: any) => ({
            numero: sms.phone_number,
            texte: sms.message,
            date: new Date(sms.created_at).toLocaleString('fr-FR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
          }))
        );
      } catch (err: any) {
        console.error("Error fetching messages:", err);
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, [token]);

  if (loading) {
    return (
      <div className="text-center p-6 text-gray-500">Chargement des messages reçus...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 text-red-500">Erreur: {error}</div>
    );
  }

  return <MessageRecu messages={messages} />;
}

export default MessageRecuWrapper;