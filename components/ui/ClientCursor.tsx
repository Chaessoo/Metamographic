"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const position = {
      distanceX: 0,
      distanceY: 0,
      distance: 0,
      pointerX: 0,
      pointerY: 0,
    };
    let previousPointerX = 0;
    let previousPointerY = 0;
    let angle = 0;
    let previousAngle = 0;
    let angleDisplace = 0;
    const degrees = 57.296;
    const cursorSize = 25;

    // set posisi awal + tampilkan setelah delay kecil
    cursor.style.opacity = "1";
    const showTimeout = setTimeout(() => {
      cursor.removeAttribute("hidden");
    }, 300);

    function rotate() {
      const unsortedAngle =
        Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) *
        degrees;
      previousAngle = angle;

      if (position.distanceX <= 0 && position.distanceY >= 0) {
        angle = 90 - unsortedAngle + 0;
      } else if (position.distanceX < 0 && position.distanceY < 0) {
        angle = unsortedAngle + 90;
      } else if (position.distanceX >= 0 && position.distanceY <= 0) {
        angle = 90 - unsortedAngle + 180;
      } else if (position.distanceX > 0 && position.distanceY > 0) {
        angle = unsortedAngle + 270;
      }

      if (isNaN(angle)) {
        angle = previousAngle;
      } else {
        if (angle - previousAngle <= -270) {
          angleDisplace += 360 + angle - previousAngle;
        } else if (angle - previousAngle >= 270) {
          angleDisplace += angle - previousAngle - 360;
        } else {
          angleDisplace += angle - previousAngle;
        }
      }

      if (cursor) {
  cursor.style.transform = `
    translate3d(
      ${position.pointerX}px,
      ${position.pointerY}px,
      0
    )
    translate(-50%, -50%)
    rotate(${angleDisplace}deg)
  `;
}
    }

    function handleMove(event: MouseEvent | TouchEvent) {
      const clientX =
        "touches" in event ? event.touches[0].clientX : event.clientX;
      const clientY =
        "touches" in event ? event.touches[0].clientY : event.clientY;

      previousPointerX = position.pointerX;
      previousPointerY = position.pointerY;
      position.pointerX = clientX;
      position.pointerY = clientY;
      position.distanceX = previousPointerX - position.pointerX;
      position.distanceY = previousPointerY - position.pointerY;
      position.distance = Math.sqrt(
        position.distanceY ** 2 + position.distanceX ** 2
      );

      if (!cursor) return;

if (position.distance > 1) {
  rotate();
}

cursor.style.transform = `
  translate3d(
    ${position.pointerX}px,
    ${position.pointerY}px,
    0
  )
  translate(-50%, -50%)
  rotate(${angleDisplace}deg)
`;
    }

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("touchmove", handleMove);

    return () => {
      clearTimeout(showTimeout);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("touchmove", handleMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      hidden
      style={{
        boxSizing: "border-box",
        position: "fixed",
        top: "50px",
        left: "50px",
        zIndex: 2147483647,
        width: "25px",
        height: "25px",
        transition: "opacity 250ms, transform 100ms",
        transform: 'translate(-50%, -50%)',
        userSelect: "none",
        pointerEvents: "none",
        opacity: 0,
        willChange:'transform',
      }}
    >
      <svg
        width="25"
        height="25"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2 L18 8 L11 11 L8 18 Z"
          strokeLinejoin="round" 
          stroke="#292927"
          fill="#fff"
          strokeWidth="0.7"
        />
      </svg>
    </div>
  );
}