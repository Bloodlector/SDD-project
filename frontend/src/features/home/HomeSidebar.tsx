import type { CSSProperties } from "react";
import { FB_BLUE } from "../../styles/palette";
import { HEADER_HEIGHT } from "./HomeHeader";
import { MenuItem } from "./MenuItem";

export const SIDEBAR_WIDTH = 220;

interface HomeSidebarProps {
  onLogout: () => void;
}

const sidebarStyle: CSSProperties = {
  position: "fixed",
  top: HEADER_HEIGHT,
  left: 0,
  bottom: 0,
  width: SIDEBAR_WIDTH,
  zIndex: 100,
  background: "#FFFFFF",
  boxShadow: "1px 0 2px rgba(0, 0, 0, 0.05)",
  display: "flex",
  flexDirection: "column",
  padding: "12px 8px",
  boxSizing: "border-box",
};

export function HomeSidebar({ onLogout }: HomeSidebarProps) {
  return (
    <aside style={sidebarStyle}>
      <nav aria-label="Главное меню">
        <MenuItem label="Раздел 1" />
        <MenuItem label="Раздел 2" />
        <MenuItem label="Раздел 3" />
      </nav>
      <div style={{ borderTop: "1px solid #E4E6EB", marginTop: "auto", paddingTop: 12 }}>
        <button
          type="button"
          onClick={onLogout}
          style={{
            width: "100%",
            minHeight: 40,
            padding: "10px 12px",
            border: "none",
            background: "none",
            color: FB_BLUE,
            fontSize: 15,
            fontWeight: 600,
            textAlign: "left",
            cursor: "pointer",
          }}
        >
          Выйти
        </button>
      </div>
    </aside>
  );
}
