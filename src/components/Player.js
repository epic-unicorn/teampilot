import React, { useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';

function Player({ player, containerRef, onPositionChange, onRemove }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const px = player.xPercent * rect.width;
    const py = player.yPercent * rect.height;
    setPos({ x: Math.round(px), y: Math.round(py) });
  }, [player.xPercent, player.yPercent, containerRef]);

  const handleStop = (e, data) => {
    const container = containerRef?.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const newX = data.x;
    const newY = data.y;
    const newPercentX = Math.min(1, Math.max(0, newX / rect.width));
    const newPercentY = Math.min(1, Math.max(0, newY / rect.height));
    setPos({ x: newX, y: newY });
    onPositionChange(player.id, newPercentX, newPercentY);
  };

  return (
    <Draggable
      position={pos}
      bounds="parent"
      onStop={handleStop}
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className="player-card" style={{ touchAction: 'none' }}>
        <div className="player-number">{player.id}</div>
        <div className="player-name">{player.name}</div>
        <button
          onClick={() => onRemove(player.id)}
          className="remove-btn"
          aria-label="Remove player"
        >
          ✕
        </button>
      </div>
    </Draggable>
  );
}

export default Player;
