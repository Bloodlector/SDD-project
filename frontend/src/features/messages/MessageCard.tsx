import type { CSSProperties } from "react";

interface MessageCardProps {
  id: string;
  name: string;
  description: string;
  timestamp?: string;
}

export function MessageCard({ id, name, description, timestamp }: MessageCardProps) {
  const cardStyle: CSSProperties = {
    padding: 12,
    borderRadius: 6,
    background: "#FFFFFF",
    border: "1px solid #e0e0e0",
    marginBottom: 8,
  };

  const nameStyle: CSSProperties = {
    fontWeight: 600,
    color: "#1a1a1a",
    marginBottom: 4,
    fontSize: 14,
  };

  const descStyle: CSSProperties = {
    color: "#666",
    fontSize: 13,
    marginBottom: 6,
    overflowWrap: "break-word",
  };

  const timeStyle: CSSProperties = {
    color: "#999",
    fontSize: 11,
  };

  const idStyle: CSSProperties = {
    color: "#bbb",
    fontSize: 10,
    fontFamily: "monospace",
  };

  return (
    <div style={cardStyle}>
      <div style={nameStyle}>{name}</div>
      {description && <div style={descStyle}>{description}</div>}
      {timestamp && <div style={timeStyle}>{new Date(timestamp).toLocaleString()}</div>}
      <div style={idStyle}>{id}</div>
    </div>
  );
}
