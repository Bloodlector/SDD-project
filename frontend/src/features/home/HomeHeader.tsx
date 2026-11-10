import { useState } from "react";
import type { CSSProperties } from "react";
import { FB_BLUE, FB_TEXT } from "../../styles/palette";

export const HEADER_HEIGHT = 56;

interface HomeHeaderProps {
  // Уже обрезанное имя или null. Обрезка выполняется в HomePage.
  username: string | null;
}

const headerStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: HEADER_HEIGHT,
  zIndex: 100,
  background: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 16px",
  boxSizing: "border-box",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
};

export function HomeHeader({ username }: HomeHeaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const initial = username ? username.charAt(0).toUpperCase() : null;
  let background = "#E4E6EB";
  if (isPressed) {
    background = "#C9CCD1";
  } else if (isHovered) {
    background = "#D8DADF";
  }

  return (
    <header style={headerStyle} aria-label="Баннер">
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, flex: 1 }}>
        <div
          aria-hidden="true"
          style={{ width: 36, height: 36, borderRadius: 8, background: "#E4E6EB", flexShrink: 0 }}
        />
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: FB_BLUE,
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          Название продукта
        </span>
      </div>
      <button
        type="button"
        aria-label="Профиль"
        title="Профиль — в разработке"
        style={{
          flexShrink: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background,
          color: FB_TEXT,
          fontWeight: 700,
          fontSize: 16,
          cursor: "pointer",
          border: "none",
        }}
        onMouseEnter={() => { setIsHovered(true); }}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => { setIsPressed(true); }}
        onMouseUp={() => { setIsPressed(false); }}
      >
        {initial ?? <span aria-hidden="true">●</span>}
      </button>
    </header>
  );
}
