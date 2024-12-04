'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Board from './Board';
import Score from './Score';
import { createInitialGrid, checkForMatches, generateRandomJewel } from '../utils/gameUtils';
import { playSound } from '../utils/soundEffects';

const Game: React.FC = () => {
  const [grid, setGrid] = useState(createInitialGrid());
  const [score, setScore] = useState(0);
  const [selectedJewel, setSelectedJewel] = useState<[number, number] | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [matchedJewels, setMatchedJewels] = useState<[number, number][]>([]);
  const [newJewels, setNewJewels] = useState<[number, number][]>([]);

  useEffect(() => {
    const checkAndUpdateGrid = () => {
      const matches = checkForMatches(grid);
      if (matches.length > 0) {
        setMatchedJewels(matches);
        setScore(prevScore => prevScore + matches.length);
        playSound('match');
        
        setTimeout(() => {
          const newGrid = [...grid];
          const newJewelsPositions: [number, number][] = [];
          matches.forEach(([row, col]) => {
            for (let i = row; i > 0; i--) {
              newGrid[i][col] = newGrid[i - 1][col];
              newJewelsPositions.push([i, col]);
            }
            newGrid[0][col] = generateRandomJewel();
            newJewelsPositions.push([0, col]);
          });
          setGrid(newGrid);
          setNewJewels(newJewelsPositions);
          setMatchedJewels([]);
          playSound('drop');
        
          setTimeout(() => {
            setNewJewels([]);
            setIsAnimating(false);
          }, 500);
        }, 300);
      
        return true;
      }
      return false;
    };

    if (!isAnimating) {
      const hasMatches = checkAndUpdateGrid();
      if (hasMatches) {
        setIsAnimating(true);
      }
    }
  }, [grid, isAnimating]);

  const handleJewelClick = (row: number, col: number) => {
    if (isAnimating) return;

    if (!selectedJewel) {
      setSelectedJewel([row, col]);
    } else {
      const [selectedRow, selectedCol] = selectedJewel;
      if (
        (Math.abs(row - selectedRow) === 1 && col === selectedCol) ||
        (Math.abs(col - selectedCol) === 1 && row === selectedRow)
      ) {
        setIsAnimating(true);
        const newGrid = grid.map(row => [...row]);  
        const temp = newGrid[row][col];
        newGrid[row][col] = newGrid[selectedRow][selectedCol];
        newGrid[selectedRow][selectedCol] = temp;
        
        const matches = checkForMatches(newGrid);
        
        if (matches.length === 0) {
          setTimeout(() => {
            const revertGrid = newGrid.map(row => [...row]);
            revertGrid[row][col] = revertGrid[selectedRow][selectedCol];
            revertGrid[selectedRow][selectedCol] = temp;
            setGrid(revertGrid);
            setIsAnimating(false);
            setSelectedJewel(null);
            playSound('swap');
          }, 500);
        } else {
          setGrid(newGrid);
          setMatchedJewels(matches);
          playSound('swap');
          setTimeout(() => {
            setIsAnimating(false);
            setSelectedJewel(null);
          }, 500);
        }
      } else {
        setSelectedJewel(null);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4">
      <motion.div 
        className="w-full max-w-sm relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-3xl font-bold mb-4 text-center text-white"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        >
          Coin Crush
        </motion.h1>
        <Score score={score} />
        <Board 
          grid={grid} 
          onJewelClick={handleJewelClick} 
          selectedJewel={selectedJewel}
          matchedJewels={matchedJewels}
          newJewels={newJewels}
        />
      </motion.div>
    </div>
  );
};

export default Game;
