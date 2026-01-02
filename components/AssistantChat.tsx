
import React, { useState, useRef, useEffect } from 'react';
import { getStyleAssistantResponse } from '../services/gemini';
import { Message } from '../types';

export const AssistantChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Sou o assistente da Man\'s Space. Em que posso te ajudar hoje? Quer uma sugestão de corte?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await getStyleAssistantResponse(input);
    setMessages(prev => [...prev, { role: 'assistant', content: response || '...' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white w-80 h-[450px] rounded-2xl border border-gray-100 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-black p-4 flex justify-between items-center">
            <h3 className="font-bold text-white flex items-center gap-2 text-sm uppercase tracking-widest">
              <span>💈</span> Assistant
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:opacity-70 font-bold">✕</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                  ? 'bg-black text-white' 
                  : 'bg-white border border-gray-100 text-gray-700 shadow-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-3 rounded-2xl text-xs text-gray-400 animate-pulse">
                  Digitando...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-gray-100 flex gap-2 bg-white">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pergunte sobre estilos..."
              className="flex-1 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:border-black"
            />
            <button 
              onClick={handleSend}
              className="bg-black p-2 rounded-lg text-white hover:bg-gray-800 transition-colors font-bold"
            >
              ➔
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-black hover:bg-gray-800 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 text-xl"
        >
          💬
        </button>
      )}
    </div>
  );
};
