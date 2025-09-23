"use client";

import { useState } from "react";
import { Bot, X } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!msg.trim()) return;
    setMsg(msg.trim().toLowerCase());
    const userMessage = { role: "user", content: msg };
    
    setMessages([userMessage]);
    setMsg("");
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage.content }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("API error response:", errText);
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      console.log(userMessage.content, "Bot response:", data.answer);
      if (data.answer === "I don’t know.") {
        data.answer = "I am unable to provide an answer. Please visit our Discord server via the link in the navbar for more information.";
      }      
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer || "No response" },
      ]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error: " + err.message },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-12 right-6 z-50">
      {isOpen ? (
        <div className="w-80 h-96 lg:w-[30vw] lg:max-h-[50vh] bg-white shadow-lg rounded-lg flex flex-col text-black">
          <div className="flex items-center justify-between p-3 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <Bot size={18} /> Queries ?
            </h3>
            <button onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg w-auto max-w-[60%] ${
                  m.role === "user"
                    ? "bg-green-800 text-white ml-auto"
                    : "bg-gray-200 text-black"
                }`}
              >
                {m.content}
              </div>
            ))}
            {isLoading && (
              <div className="bg-gray-200 text-black p-2 rounded-lg w-auto max-w-[60%]">
                <div className="flex items-center gap-1">
                  <span>Thinking</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t">
            {msg.length > 100 && (
              <div className="mb-2 text-xs text-red-500 bg-red-50 p-2 rounded">
                ⚠️ Question too long! Please keep it under 100 characters. ({msg.length}/100)
              </div>
            )}
            <div className="flex items-center gap-2">
              <textarea
                rows={1}
                className="flex-1 border rounded-lg text-black px-3 py-2 text-sm resize-none focus:outline-none"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={150}
              />
              <button
                className={`px-3 py-2 rounded-lg text-white ${
                  msg.length > 100 || isLoading
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-green-800 hover:bg-green-700"
                }`}
                onClick={sendMessage}
                disabled={msg.length > 100 || isLoading}
              >
                Ask
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-yellow-600 text-white p-4 rounded-full shadow-lg"
        >
          <Bot size={24} />
        </button>
      )}
    </div>
  );
}