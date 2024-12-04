import React from 'react';
import { motion } from 'framer-motion';

interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    <motion.div 
      className="text-xl font-bold mb-4 text-center w-full text-white bg-gray-700 p-2 rounded-lg shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Score: {score}
    </motion.div>
  );
};

export default Score;

