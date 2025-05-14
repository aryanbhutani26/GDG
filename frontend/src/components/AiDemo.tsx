import React, { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const AiDemo: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState<{ type: 'user' | 'ai'; text: string }[]>([
    { type: 'ai', text: "Hello! I'm your AI financial advisor. How can I help you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const message = userInput;
    setConversation(prev => [...prev, { type: 'user', text: message }]);
    setIsTyping(true);
    setUserInput('');

    try {
      const res = await axios.post("https://django-qkol.onrender.com/secondbot", {
        message
      });

      const botResponse = res.data.response;
      setConversation(prev => [...prev, { type: 'ai', text: botResponse }]);
    } catch (err) {
      console.error("AI bot error:", err);
      setConversation(prev => [...prev, { type: 'ai', text: "Oops! Something went wrong. Try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="w-full max-w-2xl mx-auto bg-gray-900/50 border-gray-800">
        <div className="p-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white">AI Financial Advisor Demo</h3>
        </div>

        <div className="h-[400px] overflow-y-auto p-4 space-y-4 scroll-smooth">
          <AnimatePresence>
            {conversation.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: msg.type === 'user' ? 20 : -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 100
                }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-[#00D395] text-white'
                      : 'bg-gray-800 text-gray-100'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-800 text-gray-100 p-3 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-800 flex gap-2">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
            placeholder="Ask about investments, savings, or market analysis..."
            className="bg-gray-800 border-gray-700 text-white"
          />
          <Button
            onClick={handleSend}
            className="bg-[#00D395] hover:bg-[#00D395]/90"
          >
            <i className="fas fa-paper-plane"></i>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default AiDemo;
