import { messagesRecu } from "../data/StaticMessages"; 

type Message = {
  numero: string;
  texte: string;
  date: string;
};

interface MessageRecuProps {
  messages: Message[];
}

function MessageRecu({ messages }: MessageRecuProps) {
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
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    {message.numero}
                  </div>
                  <div className="text-gray-500">
                    {new Date(message.date).toLocaleString()}
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
  return <MessageRecu messages={messagesRecu} />; 
}

export default MessageRecuWrapper;