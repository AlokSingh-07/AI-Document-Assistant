





// src/features/chat/hooks/useChatApi.js
import { useState } from "react";

const API_URL = "http://127.0.0.1:8000";
const INITIAL_MESSAGE = {
  role: "assistant",
  content: "Hello! 👋\n\nUpload a PDF and ask me anything about the document.",
};

export function useChatApi() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [asking, setAsking] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files?.[0]; // यहाँ .[0] सही किया गया है
    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
      setFile(null);
      setUploadStatus("❌ Please select a PDF file.");
      return;
    }

    setFile(selectedFile);
    setUploadStatus("");
  };

  const uploadPDF = async () => {
    if (!file) {
      setUploadStatus("❌ Please select a PDF first.");
      return;
    }

    setUploading(true);
    setUploadStatus("Processing PDF...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "PDF upload failed.");

      setUploadStatus(`✓ ${file.name} uploaded successfully`);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `### PDF Ready ✅\n\nI've processed **${file.name}** successfully.\n\nYou can now ask questions about the document.`,
        },
      ]);
    } catch (error) {
      setUploadStatus(`❌ ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const askQuestion = async () => {
    const text = question.trim();
    if (!text || asking) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setQuestion("");
    setAsking(true);

    try {
      const formData = new FormData();
      formData.append("question", text);

      const response = await fetch(`${API_URL}/ask`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Unable to get answer.");

      setMessages((prev) => [...prev, { role: "assistant", content: data.answer }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `❌ ${error.message}` },
      ]);
    } finally {
      setAsking(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      askQuestion();
    }
  };

  const newChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setQuestion("");
    setFile(null);
    setUploadStatus("");
  };

  return {
    messages,
    question,
    setQuestion,
    file,
    uploading,
    uploadStatus,
    handleFileSelect,
    uploadPDF,
    askQuestion,
    handleKeyDown,
    newChat,
  };
}

