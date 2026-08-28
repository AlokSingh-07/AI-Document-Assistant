import MessageItem from "./MessageItem";
import "./ChatWindow.css";

export default function ChatWindow({
  messages,
  question,
  setQuestion,
  askQuestion,
  handleKeyDown,
  newChat,
}) {
  return (
    <main className="main">
      <header className="header">
        <div className="assistant-info">
          <div className="assistant-avatar">✦</div>
          <div>
            <h2>Document Assistant</h2>
            <div className="online-status">
              <span></span> Online
            </div>
          </div>
        </div>
        <button className="clear-button" onClick={newChat}>Clear chat</button>
      </header>

      <section className="chat-container">
        <div className="messages" style={{ width: "100%", maxWidth: "850px", margin: "0 auto" }}>
          {messages.map((message, index) => (
            <MessageItem key={index} message={message} />
          ))}
        </div>
      </section>

      <div className="input-section">
        <div className="input-wrapper">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about the document..."
            rows={1}
          />
          <button onClick={askQuestion} className="send-button">➔</button>
        </div>
      </div>
    </main>
  );
}