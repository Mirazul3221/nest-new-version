// components/DraggableButton.js
'use client'
import { useState, useRef } from 'react';

const DraggableButton = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 300, y: 100 });
  const buttonRef = useRef(null);

  const onMouseDown = (e) => {
    setIsDragging(true);
    // Disable text selection while dragging
    document.body.style.userSelect = 'none';

    // Set initial position relative to mouse pointer
    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;

    const onMouseMove = (moveEvent) => {
      if (isDragging) {
        const newX = moveEvent.clientX - offsetX;
        const newY = moveEvent.clientY - offsetY;
        setPosition({ x: newX, y: newY });
      }
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = 'auto';
      // Remove event listeners
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    // Attach mousemove and mouseup listeners to the document
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <button
    onClick={()=>setPosition({ x: 600, y: 500 })}
      ref={buttonRef}
      onMouseDown={onMouseDown}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: 'pointer',
        padding: '10px 20px',
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        transition: 'all 0.2s',
      }}
    >
      Drag Me
    </button>
  );
};

export default DraggableButton;
