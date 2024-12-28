import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../store/features/counter/counterSlice';

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 cyberpunk-grid">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-12 rounded-2xl animated-border relative overflow-hidden"
      >
        <div className="absolute inset-0 cyberpunk-grid opacity-20" />
        
        <motion.h1 
          className="text-6xl font-bold mb-8 gradient-text text-center"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {count}
        </motion.h1>

        <div className="flex gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="neon-button px-8 py-4 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-lg relative overflow-hidden"
            onClick={() => dispatch(decrement())}
          >
            <span className="relative z-10">-</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 hover:opacity-100 transition-opacity" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="neon-button px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg relative overflow-hidden"
            onClick={() => dispatch(increment())}
          >
            <span className="relative z-10">+</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 hover:opacity-100 transition-opacity" />
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="neon-button px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-lg mt-6 w-full relative overflow-hidden"
          onClick={() => dispatch(reset())}
        >
          <span className="relative z-10">Reset</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 hover:opacity-100 transition-opacity" />
        </motion.button>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500 rounded-full filter blur-[100px] opacity-20" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500 rounded-full filter blur-[100px] opacity-20" />
      </motion.div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-500 rounded-full"
          animate={{
            y: [-10, -30, -10],
            x: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
          }}
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
        />
      ))}
    </div>
  );
}
