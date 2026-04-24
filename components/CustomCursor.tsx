"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const onEnter = () => dot.classList.add("hovering");
    const onLeave = () => dot.classList.remove("hovering");

    document.addEventListener("mousemove", onMove);

    const addListeners = () => {
      document
        .querySelectorAll("a, button, [role='button'], input, textarea, select")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };

    addListeners();

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      id="cursor-dot"
      ref={dotRef}
      aria-hidden="true"
      style={{ display: "block" }}
    />
  );
}
