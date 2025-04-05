"use client";
import React, { useState } from "react";
import GeminiChatbot from "@/component/GeminiChatbot";
//import SignIn from "@/component/SignIn";

export default function Home() {
  // const [user, setUser] = useState(null);

  // const handleSignOut = () => {
  //   setUser(null);
  // };

  return (
    <div>
      {/* {user ? (
        <GeminiChatbot user={user} onSignOut={handleSignOut} />
      ) : (
        <SignIn setUser={setUser} />
      )} */}
      <GeminiChatbot/>
    </div>
  );
}
