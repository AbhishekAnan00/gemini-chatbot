"use client";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { IoMdArrowRoundUp } from "react-icons/io";
import { MdStopCircle } from "react-icons/md";

const socket = io("http://localhost:5000");

export default function GeminiChatbot({ user, onSignOut }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("message");
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const config = user
        ? { headers: { Authorization: `Bearer ${user.token}` } }
        : {};
      const { data } = await axios.post(
        "http://localhost:5000/api/send",
        { message: input },
        config
      );
      setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
    } catch (error) {
      console.error("Error in GeminiChatbot:", error);
    }
    setLoading(false);
  };

  const userAvatar = "https://cdn-icons-png.flaticon.com/512/727/727399.png";
  const aiAvatar = "https://cdn-icons-png.flaticon.com/512/4712/4712027.png";

  return (
    <div className="flex flex-col h-screen bg-gray-100 items-center justify-center">
      <div className="relative w-full max-w-sm h-[700px] bg-white rounded-3xl shadow-md flex flex-col overflow-hidden">
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">Gemini Bot</h1>
          {user && (
            <div className="flex items-center space-x-2">
              <span className="text-sm">Hi, {user.username}</span>
              <button
                onClick={onSignOut}
                className="text-xs bg-blue-400 hover:bg-blue-700 px-2 py-1 rounded"
                title="Sign Out"
              >
                ☰
              </button>
            </div>
          )}
        </header>

        <main className="flex-1 overflow-y-auto px-3 py-4 bg-[url('https://www.transparenttextures.com/patterns/white-leather.png')]">
          <div className="space-y-4">
            {messages.map((msg, i) => {
              const isUser = msg.sender === "user";
              const avatar = isUser ? userAvatar : aiAvatar;
              return (
                <div
                  key={i}
                  className={`flex items-start ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full mr-2 self-end"
                    />
                  )}
                  <div
                    className={`max-w-[70%] rounded-xl px-4 py-2 ${
                      isUser
                        ? "bg-blue-500 text-white rounded-tr-none"
                        : "bg-gray-200 text-gray-800 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {isUser && (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full ml-2 self-end"
                    />
                  )}
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>
          {loading && (
            <div className="text-center mt-4">
              <span className="text-gray-500">Loading reply...</span>
            </div>
          )}
        </main>

        <footer className="p-3 border-t border-gray-300 bg-white">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-l-full px-4 py-2 outline-0 text-black"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              className={`px-4 py-2 rounded-r-full transition-colors ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 bg-gradient-to-r from-blue-600 to-purple-600 text-white cursor-pointer"
              }`}
              disabled={loading}
            >
              {loading ? <MdStopCircle /> : <IoMdArrowRoundUp />}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}



//logic written 

// "use client";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000");

// export default function GeminiChatbot({ user }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     socket.on("message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });
//     return () => socket.off("message");
//   }, []);

//   const handleSend = async () => {
//     if (!input.trim()) return;
//     setMessages((prev) => [...prev, { sender: "user", text: input }]);
//     try {
//       const config = user ? { headers: { Authorization: `Bearer ${user.token}` } } : {};
//       const { data } = await axios.post(
//         "http://localhost:5000/api/send",
//         { message: input },
//         config
//       );
//       setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
//     } catch (error) {
//       console.error("Error in GeminiChatbot:", error);
//     }
//     setInput("");
//   };

//   return (
//     <div>
//       <h2>Hi, I am GeminiChatbot!</h2>
//       <div>
//         {messages.map((msg, i) => (
//           <p key={i}>{msg.text}</p>
//         ))}
//       </div>
//       <div>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Enter your messages..."
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// }
