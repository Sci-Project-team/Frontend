import { useState, useEffect } from 'react';

type Message = {
  numero: string;
  texte: string;
  date: string;
  type?: string;
};

interface HistoriqueProps {
  messages: Message[];
  onRefresh?: () => void;
  loading?: boolean;
}

function Historique({ messages, onRefresh, loading }: HistoriqueProps) {
  const formatDate = (dateTimeStr: string) => {
    // Handle both new format (DD/MM/YYYY HH:MM) and fallback uptime format
    if (dateTimeStr.includes('/')) {
      return dateTimeStr; // Already in DD/MM/YYYY HH:MM format
    } else if (dateTimeStr.startsWith('Uptime:')) {
      return dateTimeStr; // Uptime fallback format
    } else {
      // Legacy format - convert seconds to readable format
      const seconds = parseInt(dateTimeStr);
      if (!isNaN(seconds)) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hours}h ${minutes}m ${secs}s (depuis le démarrage)`;
      }
      return dateTimeStr; // Return as-is if can't parse
    }
  };

  return (
    <div className="flex justify-center p-6 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Historique des Messages Envoyés</h2>
            <div className="flex gap-4 mt-2 text-sm">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {messages.length} message{messages.length !== 1 ? 's' : ''} envoyé{messages.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              {loading ? 'Actualisation...' : 'Actualiser'}
            </button>
          )}
        </div>
        
        {loading ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Chargement des messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
            <p className="text-lg">Aucun message envoyé pour le moment</p>
            <p className="text-sm mt-2">Les messages que vous envoyez apparaîtront ici</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className="bg-green-50 border border-green-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200 border-l-4 border-l-green-500"
              >
                <div className="flex justify-between items-center mb-3 text-sm">
                  <div className="font-medium text-blue-600 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <span className="font-semibold">{message.numero}</span>
                  </div>
                  <div className="text-gray-500 flex items-center gap-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                      </svg>
                      Envoyé
                    </span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {formatDate(message.date)}
                    </span>
                  </div>
                </div>
                <div className="text-gray-700 leading-relaxed bg-white p-4 rounded-md border border-gray-100 shadow-sm">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    <span className="flex-1">{message.texte}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function HistoriqueWrapper() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ESP32_IP = "192.168.146.87"; 
  
  // Parse the plain text SMS logs from ESP32
  const parseSMSLogs = (logText: string): Message[] => {
    if (!logText || logText.trim() === "No sent SMS logs found") {
      return [];
    }

    const messages: Message[] = [];
    const logEntries = logText.split('=== SMS Sent ===');
    
    for (let i = 1; i < logEntries.length; i++) { // Skip first empty entry
      const entry = logEntries[i].trim();
      if (!entry) continue;
      
      const lines = entry.split('\n');
      let time = '';
      let phone = '';
      let message = '';
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('Time: ')) {
          time = trimmedLine.substring(6).replace('s', ''); // Remove 's' suffix
        } else if (trimmedLine.startsWith('Phone: ')) {
          phone = trimmedLine.substring(7);
        } else if (trimmedLine.startsWith('Message: ')) {
          message = trimmedLine.substring(9);
        }
      }
      
      if (time && phone && message) {
        messages.push({
          numero: phone,
          texte: message,
          date: time,
          type: 'sent'
        });
      }
    }
    
    return messages;
  };
  
  const fetchSentMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://${ESP32_IP}/messages-sent`, {
        method: 'GET',
        headers: {
          'Content-Type': 'text/plain',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const logText = await response.text();
      const parsedMessages = parseSMSLogs(logText);
      
      // Sort messages by date (newest first)
      // For new format, parse DD/MM/YYYY HH:MM for proper sorting
      const sortedMessages = parsedMessages.sort((a: Message, b: Message) => {
        // Try to parse as DD/MM/YYYY HH:MM format first
        const parseDateTime = (dateStr: string): number => {
          if (dateStr.includes('/') && dateStr.includes(':')) {
            const [datePart, timePart] = dateStr.split(' ');
            const [day, month, year] = datePart.split('/').map(Number);
            const [hour, minute] = timePart.split(':').map(Number);
            return new Date(year, month - 1, day, hour, minute).getTime();
          }
          // Fallback to numeric comparison for legacy formats
          const num = parseInt(dateStr);
          return isNaN(num) ? 0 : num;
        };
        
        return parseDateTime(b.date) - parseDateTime(a.date);
      });
      
      setMessages(sortedMessages);
    } catch (err) {
      console.error('Error fetching sent messages:', err);
      setError('Erreur lors du chargement des messages. Vérifiez la connexion à l\'ESP32.');
      // Fallback to empty array on error
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSentMessages();
    
    // Auto-refresh every 15 seconds
    const interval = setInterval(fetchSentMessages, 15000);
    
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="flex justify-center p-6 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-red-600 mb-4 font-medium">{error}</p>
            <div className="space-y-2">
              <button
                onClick={fetchSentMessages}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg mr-2"
              >
                Réessayer
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Assurez-vous que l'ESP32 est connecté et accessible à l'adresse: {ESP32_IP}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Historique messages={messages} onRefresh={fetchSentMessages} loading={loading} />;
}

export default HistoriqueWrapper;