import React from 'react';
import Jewel from './Jewel';

interface BoardProps {
  grid: string[][];
  onJewelClick: (row: number, col: number) => void;
  selectedJewel: [number, number] | null;
  matchedJewels: [number, number][];
  newJewels: [number, number][];
}

const Board: React.FC<BoardProps> = ({ grid, onJewelClick, selectedJewel, matchedJewels, newJewels }) => {
  return (
    <div className="relative w-full aspect-square bg-gray-700 p-2 rounded-lg shadow-lg overflow-hidden">
      <div className="grid grid-cols-5 gap-2 w-full h-full">
        {grid.map((row, rowIndex) =>
          row.map((jewel, colIndex) => (
            <Jewel
              key={`${rowIndex}-${colIndex}`}
              type={jewel}
              onClick={() => onJewelClick(rowIndex, colIndex)}
              isSelected={selectedJewel?.[0] === rowIndex && selectedJewel?.[1] === colIndex}
              isMatched={matchedJewels.some(([r, c]) => r === rowIndex && c === colIndex)}
              isNew={newJewels.some(([r, c]) => r === rowIndex && c === colIndex)}
              position={{ row: rowIndex, col: colIndex }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
