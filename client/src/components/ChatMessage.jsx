import * as React from "react";
import "./ChatMessage.css";

export const ChatMessage = ({ message, isFromMe }) => (
  <div className={`chat-message-container ${isFromMe ? "from-me" : ""}`}>
    <div className={`chat-message ${isFromMe ? "from-me" : ""}`}>
      <small>{isFromMe ? `You` : message.userName}</small>
      <div>{message.content}</div>
      <footer>{message.date.toLocaleString()}</footer>
    </div>
  </div>
);
