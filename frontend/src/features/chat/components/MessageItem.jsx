// src/features/chat/components/MessageItem.jsx
import ReactMarkdown from "react-markdown";
import "./MessageItem.css"; // Imported locally

export default function MessageItem({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`message-row ${isUser ? "user-row" : "assistant-row"}`}>
      {!isUser && <div className="small-avatar">✦</div>}
      <div className={`message ${isUser ? "user-message" : "assistant-message"}`}>
        {isUser ? <p>{message.content}</p> : <ReactMarkdown>{message.content}</ReactMarkdown>}
      </div>
    </div>
  );
}
