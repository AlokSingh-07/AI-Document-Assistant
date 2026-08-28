// src/App.jsx
import { useState } from "react";
import Sidebar from "./features/chat/components/Sidebar";
import ChatWindow from "./features/chat/components/ChatWindow";
import { useChatApi } from "./features/chat/hooks/useChatApi";

export default function App() {
  const chatProps = useChatApi();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="app">
      <Sidebar
        {...chatProps}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpen={() => setIsSidebarOpen(true)}
      />
      <ChatWindow
        messages={chatProps.messages}
        question={chatProps.question}
        setQuestion={chatProps.setQuestion}
        askQuestion={chatProps.askQuestion}
        handleKeyDown={chatProps.handleKeyDown}
        newChat={chatProps.newChat}
        isSidebarOpen={isSidebarOpen}
        onOpenSidebar={() => setIsSidebarOpen(true)}
      />

      
    </div>
  );
}