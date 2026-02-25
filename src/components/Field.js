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
          <svg viewBox="0 0 900 600" className="field-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="grassStripe" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#2f8b1f" />
                <stop offset="100%" stopColor="#276f18" />
              </linearGradient>
              <radialGradient id="shade" cx="50%" cy="50%" r="75%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.06)" />
              </radialGradient>
            </defs>

            {/* draw alternating stripes */}
            <rect x="0" y="0" width="900" height="60" fill="#2f8b1f" />
            <rect x="0" y="60" width="900" height="60" fill="#2f7b1d" />
            <rect x="0" y="120" width="900" height="60" fill="#2f8b1f" />
            <rect x="0" y="180" width="900" height="60" fill="#2f7b1d" />
            <rect x="0" y="240" width="900" height="60" fill="#2f8b1f" />
            <rect x="0" y="300" width="900" height="60" fill="#2f7b1d" />
            <rect x="0" y="360" width="900" height="60" fill="#2f8b1f" />
            <rect x="0" y="420" width="900" height="60" fill="#2f7b1d" />
            <rect x="0" y="480" width="900" height="60" fill="#2f8b1f" />

            {/* subtle overlay shade */}
            <rect x="0" y="0" width="900" height="600" fill="url(#shade)" />

            {/* outer boundary */}
            <rect x="25" y="25" width="850" height="550" fill="none" stroke="#f6f9ef" strokeWidth="6" rx="8" />

            {/* halfway line */}
            <line x1="450" y1="25" x2="450" y2="575" stroke="#f6f9ef" strokeWidth="5" />

            {/* center circle and mark */}
            <circle cx="450" cy="300" r="80" fill="none" stroke="#f6f9ef" strokeWidth="5" />
            <circle cx="450" cy="300" r="6" fill="#f6f9ef" />

            {/* penalty boxes (left/right) */}
            <rect x="25" y="150" width="140" height="300" fill="none" stroke="#f6f9ef" strokeWidth="5" />
            <rect x="735" y="150" width="140" height="300" fill="none" stroke="#f6f9ef" strokeWidth="5" />

            {/* penalty arcs */}
            <path d="M165 300 A90 90 0 0 0 165 300" fill="none" stroke="#f6f9ef" strokeWidth="4" transform="translate(0,0)" />
            <path d="M735 300 A90 90 0 0 1 735 300" fill="none" stroke="#f6f9ef" strokeWidth="4" transform="translate(0,0)" />

            {/* penalty marks */}
            <circle cx="120" cy="300" r="4" fill="#f6f9ef" />
            <circle cx="780" cy="300" r="4" fill="#f6f9ef" />

            {/* small goal boxes */}
            <rect x="25" y="230" width="55" height="140" fill="none" stroke="#f6f9ef" strokeWidth="3" />
            <rect x="820" y="230" width="55" height="140" fill="none" stroke="#f6f9ef" strokeWidth="3" />

            {/* corner arcs */}
            <path d="M25 25 v20 a20 20 0 0 1 -20 -20 z" fill="none" stroke="#f6f9ef" strokeWidth="3" />
            <path d="M875 25 v20 a20 20 0 0 0 20 -20 z" fill="none" stroke="#f6f9ef" strokeWidth="3" />
            <path d="M25 575 v-20 a20 20 0 0 0 -20 20 z" fill="none" stroke="#f6f9ef" strokeWidth="3" />
            <path d="M875 575 v-20 a20 20 0 0 1 20 20 z" fill="none" stroke="#f6f9ef" strokeWidth="3" />

          </svg>
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
