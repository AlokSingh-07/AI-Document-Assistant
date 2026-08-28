import "./Sidebar.css";
import { useRef } from "react";
import StatusDot from "../../../components/UI/StatusDot";

export default function Sidebar({
  file,
  uploading,
  uploadStatus,
  handleFileSelect,
  uploadPDF,
  newChat,
  isOpen = true,
  onClose,
  onOpen,
}) {
  const fileInputRef = useRef(null);

  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Top Header & Collapse Control */}
      <div className="sidebar-top">
        {isOpen && (
          <div className="brand">
            <div className="brand-logo">✦</div>
            <div>
              <h1>DocuChat</h1>
              <p>AI Document Assistant</p>
            </div>
          </div>
        )}

        <div className="sidebar-controls">
          <button
            className="icon-btn"
            onClick={isOpen ? onClose : onOpen}
            title={isOpen ? "Close sidebar" : "Open sidebar"}
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Content visible only when expanded */}
      {isOpen && (
        <div className="sidebar-content">
          <button className="new-chat-button" onClick={newChat}>
            <span>＋</span> New Chat
          </button>

          <div className="sidebar-section">
            <div className="sidebar-title">DOCUMENT</div>
            <div className="upload-card">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                hidden
              />

              <button
                className="choose-file"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="file-icon">↑</div>
                <div className="file-text">
                  <strong>{file ? file.name : "Choose PDF"}</strong>
                  <span>{file ? "Ready to upload" : "PDF files only"}</span>
                </div>
              </button>

              {file && (
                <button
                  className="upload-button"
                  onClick={uploadPDF}
                  disabled={uploading}
                >
                  {uploading ? "Processing..." : "Upload PDF"}
                </button>
              )}

              {uploadStatus && (
                <div className="upload-status">{uploadStatus}</div>
              )}
            </div>
          </div>

          <div className="sidebar-footer">
            <StatusDot label="Mistral AI" />
          </div>
        </div>
      )}
    </aside>
  );
}