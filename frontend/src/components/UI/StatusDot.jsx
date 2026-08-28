// src/components/UI/StatusDot.jsx
export default function StatusDot({ label }) {
  return (
    <div className="ai-status">
      <span className="status-dot"></span>
      <span>{label}</span>
    </div>
  );
}