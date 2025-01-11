import React, { useRef } from "react";

function HorizontallyScrollable({ children, className = "" }) {
  const scrollRef = useRef();

  const handleMouseDown = (evt) => {
    const startX = evt.pageX;
    const startScrollLeft = scrollRef.current.scrollLeft;

    const handleMouseMove = (evt) => {
      const currentX = evt.pageX;
      const deltaX = currentX - startX;

      scrollRef.current.scrollLeft = startScrollLeft - deltaX;
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={`horizontally-scrollable ${className}`}
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      style={{
        overflowX: "scroll",
        whiteSpace: "nowrap",
        cursor: "grab",
        scrollbarWidth: "none", // Firefox-specific
        msOverflowStyle: "none", // IE/Edge-specific
      }}
    >
      {children}
    </div>
  );
}

export default HorizontallyScrollable;
