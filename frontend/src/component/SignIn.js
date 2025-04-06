"use client";
import React, { useState } from "react";
import axios from "axios";

export default function SignIn({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const { data } = await axios.post("http://localhost:5000/auth/signin", {
        username,
        password,
      });
      setUser({ username: data.username, token: data.token });
    } catch (err) {
      console.error("Sign in error:", err);
      setError("Invalid input, Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4 ">
      <div className="w-full max-w-md bg-gray-800 shadow-2xl rounded-2xl p-8 bg-[url('https://www.transparenttextures.com/patterns/white-leather.png')]">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 mb-2">
            <svg
              className="w-full h-full text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15l-5-5 1.414-1.414L11 13.172l6.586-6.586L19 8l-8 9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Gemini Chatbot</h1>
          <p className="text-gray-400 mt-1">
            Welcome back! Sign in to continue
          </p>
        </div>
        {error && (
          <div className="mb-4 text-center text-red-500 text-sm">{error}</div>
        )}
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Username, Email, or Phone
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-300 text-sm">
              <input type="checkbox" className="mr-2 h-4 w-4" />
              Remember me
            </label>
            <button type="button" className="text-blue-500 text-sm hover:underline">
              Forgot Password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-400 text-sm">Don't have an account?</span>
          <button type="button" className="text-blue-500 text-sm font-medium ml-1 hover:underline">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}



// "use client";
// import React, { useState } from "react";
// import axios from "axios";

// export default function SignIn({ setUser }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("http://localhost:5000/auth/signin", {
//         username,
//         password,
//       });
//       setUser({ username: data.username, token: data.token });
//     } catch (error) {
//       console.error("Sign in error:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSignIn}>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit">Sign In</button>
//     </form>
//   );
// }


