import type { CSSProperties } from "react";
import { FB_BACKGROUND, FB_BLUE, FB_TEXT } from "../../styles/palette";
import { HEADER_HEIGHT, HomeHeader } from "./HomeHeader";
import { HomeSidebar, SIDEBAR_WIDTH } from "./HomeSidebar";
import { RecordForm } from "../records/RecordForm";
import { MessagesPanel } from "../messages/MessagesPanel";

interface HomePageProps {
  username: string | null;
  onLogout: () => void;
}

const mainStyle: CSSProperties = {
  position: "fixed",
  top: HEADER_HEIGHT,
  left: SIDEBAR_WIDTH,
  right: 0,
  bottom: 0,
  overflow: "hidden",
  display: "flex",
  flexDirection: "row",
  gap: 24,
  padding: 24,
  boxSizing: "border-box",
};

const leftPanelStyle: CSSProperties = {
  flex: "0 0 400px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 24,
  overflow: "auto",
};

const rightPanelStyle: CSSProperties = {
  flex: "1 1 auto",
  minWidth: 0,
  overflow: "hidden",
};

const greetingCardStyle: CSSProperties = {
  width: "100%",
  padding: 32,
  borderRadius: 8,
  background: "#FFFFFF",
  color: FB_TEXT,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  boxSizing: "border-box",
};

export function HomePage({ username, onLogout }: HomePageProps) {
  const trimmed = username?.trim() ?? "";
  const hasName = trimmed !== "";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: FB_BACKGROUND,
        fontFamily: "Helvetica, Arial, sans-serif",
      }}
    >
      <HomeHeader username={hasName ? trimmed : null} />
      <HomeSidebar onLogout={onLogout} />
      <main style={mainStyle}>
        <div style={leftPanelStyle}>
          <div style={greetingCardStyle}>
            <h1 style={{ margin: "0 0 16px", color: FB_BLUE, overflowWrap: "anywhere" }}>
              {hasName ? `Добро пожаловать, ${trimmed}!` : "Добро пожаловать!"}
            </h1>
            <p style={{ margin: 0, color: "#65676B" }}>Вы успешно авторизовались в системе</p>
          </div>
          <RecordForm />
        </div>
        <div style={rightPanelStyle}>
          <MessagesPanel />
        </div>
      </main>
    </div>
  );
}
