import React from 'react';
import { motion } from 'framer-motion';
import Coin from './Coin';

interface JewelProps {
  type: string;
  onClick: () => void;
  isSelected: boolean;
  isMatched: boolean;
  position: { row: number; col: number };
  isNew: boolean;
}

const Jewel: React.FC<JewelProps> = ({ type, onClick, isSelected, isMatched, position, isNew }) => {
  return (
    <motion.div
      layout
      initial={isNew ? { y: -100, opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 30,
        delay: isNew ? position.row * 0.1 : 0,
      }}
      className="w-full h-full"
    >
      <Coin color={getJewelColor(type)} onClick={onClick} isSelected={isSelected} isMatched={isMatched} />
    </motion.div>
  );
};

function getJewelColor(type: string) {
  switch (type) {
    case 'red':
      return '#ff4136';
    case 'blue':
      return '#0074d9';
    case 'green':
      return '#2ecc40';
    case 'yellow':
      return '#ffdc00';
    case 'purple':
      return '#b10dc9';
    default:
      return '#aaaaaa';
  }
}

export default Jewel;

