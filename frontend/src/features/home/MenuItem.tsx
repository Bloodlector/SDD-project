import { useState } from "react";
import { FB_TEXT } from "../../styles/palette";

interface MenuItemProps {
  label: string;
}

export function MenuItem({ label }: MenuItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  let background = "transparent";
  if (isPressed) {
    background = "#E4E6EB";
  } else if (isHovered) {
    background = "#F2F3F5";
  }

  return (
    <button
      type="button"
      title="Раздел в разработке"
      style={{
        width: "100%",
        minHeight: 40,
        padding: "10px 12px",
        marginBottom: 4,
        borderRadius: 6,
        border: "none",
        background,
        color: FB_TEXT,
        fontSize: 15,
        fontWeight: 600,
        textAlign: "left",
        cursor: "pointer",
      }}
      onMouseEnter={() => { setIsHovered(true); }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => { setIsPressed(true); }}
      onMouseUp={() => { setIsPressed(false); }}
    >
      {label}
    </button>
  );
}
