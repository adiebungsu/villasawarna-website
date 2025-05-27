import React, { useState } from "react";
import { askAI } from "../api/aiChatApi";

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "ai", text: "Halo! Saya Asisten AI Villa Sawarna. Silakan tanya apa saja tentang villa, lokasi, promo, atau wisata di Sawarna." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
    setLoading(true);
    try {
      const aiReply = await askAI(input);
      setMessages(msgs => [...msgs, { from: "ai", text: aiReply }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { from: "ai", text: "Maaf, terjadi gangguan. Silakan coba lagi nanti." }]);
    }
    setLoading(false);
  };

  return (
    <div>
      <button className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg z-50"
        onClick={() => setOpen(o => !o)}
        aria-label="Buka chat asisten">💬</button>
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-2xl z-50 flex flex-col">
          <div className="bg-blue-600 text-white p-3 rounded-t-lg font-bold">Asisten AI Sawarna</div>
          <div className="flex-1 p-3 overflow-y-auto" style={{ maxHeight: 320 }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-2 ${msg.from === "ai" ? "text-left" : "text-right"}`}>
                <span className={`inline-block px-3 py-2 rounded-lg ${msg.from === "ai" ? "bg-gray-100 text-gray-800" : "bg-blue-500 text-white"}`}>
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && <div className="text-gray-400 text-sm">Mengetik...</div>}
          </div>
          <div className="flex border-t">
            <input
              className="flex-1 p-2 outline-none"
              placeholder="Tulis pertanyaan..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
            <button className="p-2 text-blue-600 font-bold" onClick={handleSend} disabled={loading}>Kirim</button>
          </div>
        </div>
      )}
    </div>
  );
} 