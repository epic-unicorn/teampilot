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
          {/* grass stripes */}
          <rect x="0" y="0" width="400" height="100" fill="#2f7e1f" />
          <rect x="0" y="100" width="400" height="100" fill="#27721a" />
          <rect x="0" y="200" width="400" height="100" fill="#2f7e1f" />
          <rect x="0" y="300" width="400" height="100" fill="#27721a" />
          <rect x="0" y="400" width="400" height="100" fill="#2f7e1f" />
          <rect x="0" y="500" width="400" height="100" fill="#27721a" />

          {/* outer border */}
          <rect x="5" y="5" width="390" height="590" fill="none" stroke="#dff2d8" strokeWidth="4" rx="6" />

          {/* halfway line */}
          <line x1="0" y1="300" x2="400" y2="300" stroke="#dff2d8" strokeWidth="3" />

          {/* penalty boxes */}
          <rect x="0" y="150" width="80" height="300" fill="none" stroke="#dff2d8" strokeWidth="3" />
          <rect x="320" y="150" width="80" height="300" fill="none" stroke="#dff2d8" strokeWidth="3" />

          {/* center circle */}
          <circle cx="200" cy="300" r="60" fill="none" stroke="#dff2d8" strokeWidth="3" />
          <circle cx="200" cy="300" r="4" fill="#dff2d8" />
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
