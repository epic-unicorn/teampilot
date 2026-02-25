import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function Player({ id, name, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="player-card"
      {...attributes}
      {...listeners}
    >
      <div className="player-number">{id}</div>
      <div className="player-name">{name}</div>
      <button
        onClick={() => onRemove(id)}
        className="remove-btn"
        aria-label="Remove player"
      >
        ✕
      </button>
    </div>
  );
}

export default Player;
