import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/ai';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from '@google/genai';

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Moni! Hello! I am the BlueRide Assistant. How can I help you move around Malawi today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseStream = await sendMessageToGemini(userMessage.text);
      
      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      for await (const chunk of responseStream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
           fullText += c.text;
           setMessages(prev => {
             const newMessages = [...prev];
             newMessages[newMessages.length - 1] = { role: 'model', text: fullText };
             return newMessages;
           });
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Pepani! Sorry, I'm having trouble connecting right now. Please try again.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isOpen ? <X className="text-white" /> : <MessageSquare className="text-white" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[600px] h-[70vh]">
          {/* Header */}
          <div className="bg-blue-600 p-4 rounded-t-2xl flex items-center justify-between">
            <h3 className="text-white font-bold flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              BlueRide Assistant
            </h3>
            <span className="text-blue-100 text-xs bg-blue-700 px-2 py-1 rounded">24/7 Support</span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : msg.isError 
                        ? 'bg-red-50 text-red-600 border border-red-200 rounded-bl-none'
                        : 'bg-slate-100 text-slate-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-50 px-4 py-3 rounded-2xl rounded-bl-none flex items-center space-x-2">
                   <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                   <span className="text-xs text-slate-400">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about rides, rentals..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
