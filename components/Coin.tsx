import React from 'react';
import { motion } from 'framer-motion';

interface CoinProps {
  color: string;
  onClick: () => void;
  isSelected: boolean;
  isMatched: boolean;
}

const Coin: React.FC<CoinProps> = ({ color, onClick, isSelected, isMatched }) => {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      animate={{ 
        scale: isMatched ? [1, 1.2, 0] : 1,
        opacity: isMatched ? [1, 1, 0] : 1,
      }}
      transition={{ 
        duration: isMatched ? 0.3 : 0.2,
        times: isMatched ? [0, 0.2, 1] : [0, 1],
      }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        animate={{ rotate: isSelected ? 360 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <defs>
          <radialGradient id={`grad-${color}`}>
            <stop offset="0%" stopColor={color} />
            <stop offset="90%" stopColor={color} />
            <stop offset="100%" stopColor={`${color}88`} />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill={`url(#grad-${color})`} stroke="#ffffff" strokeWidth="2" />
        <circle cx="35" cy="35" r="8" fill="#ffffff55" />
      </motion.svg>
    </motion.div>
  );
};

export default Coin;

