import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

type LogEntry = {
  timestamp: string;
  level: string;
  message: string;
  details?: string;
};

function LogsDisplay({ logs }: { logs: LogEntry[] }) {
  return (
    <div className="flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Logs Système
        </h2>

        {logs.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
            Aucun log disponible
          </div>
        ) : (
          <div className="space-y-4 overflow-y-auto max-h-[70vh]">
            {logs.map((log, index) => (
              <div
                key={index}
                className={`border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200 ${
                  log.level === 'ERROR' ? 'bg-red-50 border-red-200' : 
                  log.level === 'WARNING' ? 'bg-yellow-50 border-yellow-200' : 
                  'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className={`font-medium ${
                    log.level === 'ERROR' ? 'text-red-600' :
                    log.level === 'WARNING' ? 'text-yellow-600' :
                    log.level === 'INFO' ? 'text-blue-600' :
                    'text-gray-600'
                  }`}>
                    {log.level}
                  </div>
                  <div className="text-gray-500 font-mono text-xs">
                    {log.timestamp}
                  </div>
                </div>
                <div className="text-gray-700 leading-relaxed bg-white p-3 rounded-md border border-gray-100">
                  {log.message}
                </div>
                {log.details && (
                  <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100 font-mono">
                    {log.details}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function LogsWrapper() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
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
        console.log("Logs API Response:", response.data);

        // Transform the API response into our LogEntry format
        // With axios, the parsed JSON is directly available in response.data
        const formatted: LogEntry[] = response.data.map((log: any) => ({
          timestamp: new Date(log.timestamp).toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }),
          level: log.level || 'INFO',
          message: log.message,
          details: log.details
        }));

        setLogs(formatted);
      } catch (error) {
        console.error("Erreur lors de la récupération des logs :", error);
        // Axios errors have response property
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
      <div className="text-center p-6 text-gray-500">Chargement des logs système...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 text-red-500">Erreur: {error}</div>
    );
  }

  return <LogsDisplay logs={logs} />;
}