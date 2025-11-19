"use client";

import React, { useState } from "react";
import { useContact } from "./ContactContext";

const PHONE_NUMBER = "15900736092";
const PHONE_DISPLAY = "(15900736092)";
const AUTO_REPLY = `感谢您的咨询，请提供您的联系方式，我们的客服将在工作时间内尽快联系您。

您也可直接联系我们的业务人员：${PHONE_DISPLAY}`;

export default function LiveChat() {
  const { isChatOpen, openChat, closeChat } = useContact();
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages(prev => [...prev, { from: 'user', text }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: AUTO_REPLY }]);
    }, 600);
  };

  return (
    <div className="fixed z-50 right-4 bottom-4">
      {!isChatOpen ? (
        <button onClick={openChat} className="bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg">在线客服</button>
      ) : (
        <div className="w-80 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center justify-between p-3 bg-blue-600 text-white">
            <div className="font-semibold">在线客服</div>
            <div className="flex items-center gap-2">
              <button onClick={() => {
                // minimize to small button
                closeChat();
              }} className="text-sm opacity-90">最小化</button>
            </div>
          </div>

          <div className="p-3 h-56 overflow-auto bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-sm text-gray-500">您好！请在下方输入问题，我们会尽快回复。</div>
            ) : (
              messages.map((m, i) => (
                <div key={i} className={`mb-2 flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${m.from === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border'} p-2 rounded-lg max-w-[80%]`}>
                    {m.text}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-3 border-t">
            <div className="flex gap-2">
              <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 p-2 border rounded" placeholder="请输入消息" />
              <button onClick={send} className="bg-blue-600 text-white px-3 rounded">发送</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
