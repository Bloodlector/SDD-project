import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

const CAT_SIZE = 30;
const CAT_STOP_DISTANCE = 28;
const CAT_MAX_SPEED = 5;
const CAT_SPEED_FACTOR = 0.08;
const CAT_ORANGE = "#E8832A";
const CAT_ORANGE_DARK = "#C4631A";

const BOWL_SIZE = 35;
const BOWL_MARGIN = 20;
const BOWL_COLOR = "#D32F2F";
const BOWL_HIGHLIGHT = "#F44336";

const catStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: CAT_SIZE,
  height: CAT_SIZE,
  pointerEvents: "none",
  zIndex: 1000,
  willChange: "transform",
};

const bowlStyle: CSSProperties = {
  position: "fixed",
  top: BOWL_MARGIN,
  left: BOWL_MARGIN,
  width: BOWL_SIZE,
  height: BOWL_SIZE,
  pointerEvents: "none",
  zIndex: 999,
};

export function Cat() {
  const catRef = useRef<HTMLDivElement>(null);
  const frontLegRef = useRef<SVGGElement>(null);
  const backLegRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const getBowlPosition = () => ({
      x: BOWL_MARGIN + BOWL_SIZE / 2,
      y: BOWL_MARGIN + BOWL_SIZE / 2,
    });

    const target = getBowlPosition();
    const position = { x: target.x - 120, y: target.y };
    let direction = 1;
    let phase = 0;
    let frameId = 0;
    let isMouseInWindow = false;

    const onMouseMove = (event: MouseEvent) => {
      isMouseInWindow = true;
      target.x = event.clientX;
      target.y = event.clientY;
    };

    const onMouseLeave = () => {
      isMouseInWindow = false;
      const bowl = getBowlPosition();
      target.x = bowl.x;
      target.y = bowl.y;
    };

    const onResize = () => {
      if (!isMouseInWindow) {
        const bowl = getBowlPosition();
        target.x = bowl.x;
        target.y = bowl.y;
      }
    };

    const onBlur = () => {
      isMouseInWindow = false;
      const bowl = getBowlPosition();
      target.x = bowl.x;
      target.y = bowl.y;
    };

    const tick = () => {
      const cat = catRef.current;
      if (cat) {
        const dx = target.x - position.x;
        const dy = target.y - position.y;
        const distance = Math.hypot(dx, dy);
        const isRunning = distance > CAT_STOP_DISTANCE;

        if (isRunning) {
          const step = Math.min(CAT_MAX_SPEED, (distance - CAT_STOP_DISTANCE) * CAT_SPEED_FACTOR + 1);
          position.x += (dx / distance) * step;
          position.y += (dy / distance) * step;
          phase += 0.45;
          if (Math.abs(dx) > 2) {
            direction = dx > 0 ? 1 : -1;
          }
        } else {
          phase = 0;
        }

        const bob = isRunning ? Math.abs(Math.sin(phase)) * -2 : 0;
        const swing = isRunning ? Math.sin(phase) * 30 : 0;
        cat.style.transform = `translate(${String(position.x - CAT_SIZE / 2)}px, ${String(position.y - CAT_SIZE / 2 + bob)}px) scaleX(${String(direction)})`;
        frontLegRef.current?.setAttribute("transform", `rotate(${String(swing)} 19 21)`);
        backLegRef.current?.setAttribute("transform", `rotate(${String(-swing)} 9 21)`);
      }
      frameId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);
    window.addEventListener("blur", onBlur);
    frameId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("blur", onBlur);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div style={bowlStyle} aria-hidden="true">
        <svg width={BOWL_SIZE} height={BOWL_SIZE} viewBox="0 0 35 35">
          <ellipse cx="17.5" cy="18" rx="14" ry="13" fill={BOWL_COLOR} />
          <ellipse cx="17.5" cy="15" rx="12" ry="10" fill={BOWL_HIGHLIGHT} />
          <ellipse cx="17.5" cy="15" rx="9" ry="7" fill="#FFF" opacity="0.3" />
        </svg>
      </div>
      <div ref={catRef} style={catStyle} aria-hidden="true">
        <svg width={CAT_SIZE} height={CAT_SIZE} viewBox="0 0 30 30">
          <path d="M5 18 Q0 12 4 7" stroke={CAT_ORANGE} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <g ref={backLegRef}>
            <rect x="7.8" y="21" width="2.6" height="7" rx="1.2" fill={CAT_ORANGE_DARK} />
          </g>
          <ellipse cx="13" cy="19" rx="9" ry="5.2" fill={CAT_ORANGE} />
          <path d="M10 14.2 L11 18 M14 13.9 L15 18.3 M18 14.3 L18.5 18" stroke={CAT_ORANGE_DARK} strokeWidth="1.1" strokeLinecap="round" />
          <g ref={frontLegRef}>
            <rect x="17.8" y="21" width="2.6" height="7" rx="1.2" fill={CAT_ORANGE_DARK} />
          </g>
          <polygon points="19,9 20,3.5 23.5,7.5" fill={CAT_ORANGE} />
          <polygon points="23,7.5 26.5,3.5 27.5,9" fill={CAT_ORANGE} />
          <circle cx="23.3" cy="13" r="5.6" fill={CAT_ORANGE} />
          <circle cx="25" cy="12.2" r="0.9" fill="#1C1E21" />
          <circle cx="21.2" cy="12.2" r="0.9" fill="#1C1E21" />
          <path d="M24.2 14.8 L25.4 14.8 L24.8 15.6 Z" fill="#F4A6A6" />
        </svg>
      </div>
    </>
  );
}
