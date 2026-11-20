import { useState } from "react";
import type { CSSProperties } from "react";
import { FB_BLUE, FB_TEXT } from "../../styles/palette";
import { MessageCard } from "./MessageCard";
import { useMessagesFeed } from "./useMessagesFeed";

const panelStyle: CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: "#FFFFFF",
  borderRadius: 8,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
};

const headerStyle: CSSProperties = {
  padding: "12px 16px",
  borderBottom: "1px solid #e0e0e0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: 16,
  fontWeight: 600,
  color: FB_BLUE,
};

const badgeStyle: CSSProperties = {
  padding: "2px 8px",
  borderRadius: 12,
  fontSize: 12,
  fontWeight: 500,
};

const listStyle: CSSProperties = {
  flex: 1,
  overflow: "auto",
  padding: 8,
};

const emptyStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  color: "#999",
  fontSize: 14,
};

export function MessagesPanel() {
  const { messages, error, connected } = useMessagesFeed();
  const [showOnlyNew, setShowOnlyNew] = useState(true);

  const displayedMessages = showOnlyNew ? messages.slice(-20) : messages;

  return (
    <div style={panelStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>Сообщения топика</h3>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span
            style={{
              ...badgeStyle,
              background: connected ? "#e8f5e9" : "#fce4ec",
              color: connected ? "#2e7d32" : "#c62828",
            }}
          >
            {connected ? "● онлайн" : "● офлайн"}
          </span>
          <span
            style={{
              ...badgeStyle,
              background: "#e3f2fd",
              color: "#1565c0",
            }}
          >
            {messages.length}
          </span>
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: 8,
            background: "#fce4ec",
            color: "#c62828",
            fontSize: 12,
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      <div style={listStyle}>
        {displayedMessages.length === 0 ? (
          <div style={emptyStyle}>Ожидание сообщений...</div>
        ) : (
          [...displayedMessages].reverse().map((msg) => (
            <MessageCard
              key={msg.id}
              id={msg.id}
              name={msg.name}
              description={msg.description}
              timestamp={msg.timestamp}
            />
          ))
        )}
      </div>

      <div
        style={{
          padding: 8,
          borderTop: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => setShowOnlyNew(!showOnlyNew)}
          style={{
            padding: "4px 12px",
            fontSize: 12,
            color: FB_BLUE,
            background: "none",
            border: "1px solid #e0e0e0",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          {showOnlyNew ? "Показать все" : "Показать новые"}
        </button>
      </div>
    </div>
  );
}
