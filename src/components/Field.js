import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Player from './Player';

function Field({ players, onPlayersChange, onRemovePlayer }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      distance: 8,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = players.findIndex((p) => p.id === active.id);
      const newIndex = players.findIndex((p) => p.id === over.id);
      onPlayersChange(arrayMove(players, oldIndex, newIndex));
    }
  };

  return (
    <div className="field-container">
      <h2>Your Lineup</h2>
      <div className="field-svg-container">
        <svg viewBox="0 0 400 600" className="field-svg">
          {/* Field background */}
          <rect width="400" height="600" fill="#2d5016" />
          
          {/* Field lines */}
          <line x1="0" y1="300" x2="400" y2="300" stroke="white" strokeWidth="2" />
          <line x1="0" y1="0" x2="400" y2="0" stroke="white" strokeWidth="2" />
          <line x1="0" y1="600" x2="400" y2="600" stroke="white" strokeWidth="2" />
          <line x1="0" y1="0" x2="0" y2="600" stroke="white" strokeWidth="2" />
          <line x1="400" y1="0" x2="400" y2="600" stroke="white" strokeWidth="2" />
          
          {/* Goal areas */}
          <rect x="0" y="75" width="50" height="450" fill="none" stroke="white" strokeWidth="2" />
          <rect x="350" y="75" width="50" height="450" fill="none" stroke="white" strokeWidth="2" />
          
          {/* Center circle */}
          <circle cx="200" cy="300" r="60" fill="none" stroke="white" strokeWidth="2" />
          <circle cx="200" cy="300" r="5" fill="white" />
        </svg>
        
        <div className="players-grid">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={players.map((p) => p.id)}
              strategy={verticalListSortingStrategy}
            >
              {players.map((player) => (
                <Player
                  key={player.id}
                  id={player.id}
                  name={player.name}
                  onRemove={onRemovePlayer}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}

export default Field;
