import React, { useState } from 'react';
import PlayerForm from './PlayerForm';
import Field from './Field';

function TeamSetup() {
  const [players, setPlayers] = useState([]);
  const [nextId, setNextId] = useState(1);

  const handleAddPlayer = (name) => {
    const newPlayer = {
      id: nextId,
      name,
    };
    setPlayers([...players, newPlayer]);
    setNextId(nextId + 1);
  };

  const handleRemovePlayer = (id) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  const handlePlayersChange = (newPlayers) => {
    setPlayers(newPlayers);
  };

  return (
    <div className="team-setup">
      <PlayerForm onAddPlayer={handleAddPlayer} />
      {players.length > 0 && (
        <Field
          players={players}
          onPlayersChange={handlePlayersChange}
          onRemovePlayer={handleRemovePlayer}
        />
      )}
      {players.length === 0 && (
        <div className="empty-state">
          <p>Add players to get started!</p>
        </div>
      )}
    </div>
  );
}

export default TeamSetup;
