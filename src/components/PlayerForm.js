import React, { useState } from 'react';

function PlayerForm({ onAddPlayer }) {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      onAddPlayer(playerName);
      setPlayerName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="player-form">
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Player name"
        className="player-input"
      />
      <button type="submit" className="add-btn">Add Player</button>
    </form>
  );
}

export default PlayerForm;
