import { useState, useEffect } from 'react';

type Message = {
  numero: string;
  texte: string;
  date: string;
  type: string; // 'read' or 'unread'
};

interface MessageRecuProps {
  messages: Message[];
  onRefresh?: () => void;
  loading?: boolean;
}

function MessageRecu({ messages, onRefresh, loading }: MessageRecuProps) {
  const formatDate = (timestamp: string) => {
    // Convert ESP32 timestamp (milliseconds since boot) to readable format
    const seconds = parseInt(timestamp) / 1000;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    return `${hours}h ${minutes}m ${secs}s (depuis le démarrage)`;
  };

  const unreadCount = messages.filter(msg => msg.type === 'unread').length;
  const readCount = messages.filter(msg => msg.type === 'read').length;

  return (
    <div className="flex justify-center p-6 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Messages Reçus</h2>
            <div className="flex gap-4 mt-2 text-sm">
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">
                {unreadCount} non lu{unreadCount !== 1 ? 's' : ''}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                {readCount} lu{readCount !== 1 ? 's' : ''}
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {messages.length} total
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m6-8v2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2M9 7h6"></path>
            </svg>
            <p className="text-lg">Aucun message reçu pour le moment</p>
            <p className="text-sm mt-2">Les nouveaux messages apparaîtront ici automatiquement</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`border rounded-lg shadow-sm p-4 hover:shadow-md transition-all duration-200 ${
                  message.type === 'unread' 
                    ? 'bg-red-50 border-red-200 border-l-4 border-l-red-500' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex justify-between items-center mb-3 text-sm">
                  <div className="font-medium text-green-600 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <span className="font-semibold">{message.numero}</span>
                  </div>
                  <div className="text-gray-500 flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      message.type === 'unread' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {message.type === 'unread' ? (
                        <>
                          <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                          </svg>
                          Non lu
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          Lu
                        </>
                      )}
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

function MessageRecuWrapper() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ESP32_IP = "192.168.146.44"; // Replace with your ESP32 IP
  
  const fetchReceivedMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://${ESP32_IP}/messages-received`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setMessages(data.messages || []);
      } else {
        throw new Error('Failed to fetch messages from ESP32');
      }
    } catch (err) {
      console.error('Error fetching received messages:', err);
      setError('Erreur lors du chargement des messages. Vérifiez la connexion à l\'ESP32.');
      // Fallback to empty array on error
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshMessages = async () => {
    try {
      // Trigger manual refresh on ESP32
      await fetch(`http://${ESP32_IP}/refresh-messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Then fetch the updated messages
      await fetchReceivedMessages();
    } catch (err) {
      console.error('Error refreshing messages:', err);
      // Still try to fetch even if refresh failed
      await fetchReceivedMessages();
    }
  };

  useEffect(() => {
    fetchReceivedMessages();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchReceivedMessages, 30000);
    
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
                onClick={fetchReceivedMessages}
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

  return <MessageRecu messages={messages} onRefresh={refreshMessages} loading={loading} />;
}

export default MessageRecuWrapper;