import React, { useRef, useEffect, useState } from 'react';
import Player from './Player';

function Field({ players, onPlayersChange, onRemovePlayer }) {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      const c = containerRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handlePositionChange = (id, xPercent, yPercent) => {
    const next = players.map((p) => (p.id === id ? { ...p, xPercent, yPercent } : p));
    onPlayersChange(next);
  };

  return (
    <div className="field-container">
      <h2>Your Lineup</h2>
      <div className="field-svg-container" ref={containerRef}>
        <svg viewBox="0 0 400 600" className="field-svg" preserveAspectRatio="xMidYMid meet">
          <rect width="400" height="600" fill="#2d5016" />
          <line x1="0" y1="300" x2="400" y2="300" stroke="white" strokeWidth="2" />
          <rect x="0" y="75" width="50" height="450" fill="none" stroke="white" strokeWidth="2" />
          <rect x="350" y="75" width="50" height="450" fill="none" stroke="white" strokeWidth="2" />
          <circle cx="200" cy="300" r="60" fill="none" stroke="white" strokeWidth="2" />
        </svg>

        <div className="players-overlay" style={{ position: 'absolute', inset: 0 }}>
          {players.map((player) => (
            <Player
              key={player.id}
              player={player}
              containerRef={containerRef}
              onPositionChange={handlePositionChange}
              onRemove={onRemovePlayer}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Field;
