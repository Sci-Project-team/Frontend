import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

type Message = {
  numero: string;
  texte: string;
  date: string;
};

function Historique({ messages }: { messages: Message[] }) {
  return (
    <div className="flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Historique des Messages Envoyés
        </h2>

        {messages.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
            Aucun message envoyé pour le moment
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-center mb-3 text-sm">
                  <div className="font-medium text-green-600 flex items-center">
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
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
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

export default function HistoriqueWrapper() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Debug: Let's see what we're getting
        console.log("Sent messages API Response:", response.data);
        if (response.data.length > 0) {
          console.log("First sent message structure:", response.data[0]);
        }

        const formatted: Message[] = response.data.map((sms: any) => ({
          numero: sms.phone_number,
          texte: sms.message,
          date: new Date(sms.created_at).toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
        }));

        setMessages(formatted);
      } catch (error) {
        console.error("Erreur lors de la récupération des logs :", error);
        if (axios.isAxiosError(error) && error.response) {
          setError(`Erreur HTTP: ${error.response.status}`);
        } else {
          setError(error instanceof Error ? error.message : "Erreur inconnue");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [token]);

  if (loading) {
    return (
      <div className="text-center p-6 text-gray-500">Chargement des messages envoyés...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 text-red-500">Erreur: {error}</div>
    );
  }

  return <Historique messages={messages} />;
}