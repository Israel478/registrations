import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addTodo, toggleTodo, removeTodo, clearTodos } from '../store/features/todo/todoSlice';

export default function Todo() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const [newTodo, setNewTodo] = useState('');
  const [focusedInput, setFocusedInput] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()));
      setNewTodo('');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 }
  };

  return (
    <div className="min-h-screen p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto"
      >
        {/* Add Todo Form */}
        <div className="glass p-8 rounded-2xl mb-8">
          <h2 className="text-3xl font-bold mb-6 gradient-text text-center">Todo List</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <motion.input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onFocus={() => setFocusedInput(true)}
                onBlur={() => setFocusedInput(false)}
                placeholder="Add a new todo..."
                className="w-full bg-white/5 p-4 pr-12 rounded-lg outline-none transition-all"
                animate={{
                  boxShadow: focusedInput 
                    ? '0 0 0 2px rgba(34, 211, 238, 0.5)' 
                    : '0 0 0 1px rgba(255, 255, 255, 0.1)'
                }}
              />
              <motion.button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!newTodo.trim()}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </motion.button>
            </div>
          </form>
        </div>

        {/* Todo List */}
        <motion.div className="glass p-6 rounded-2xl space-y-4">
          <AnimatePresence mode="popLayout">
            {todos.length === 0 ? (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center text-gray-400 py-8"
              >
                No todos yet. Add one above!
              </motion.div>
            ) : (
              <>
                {todos.map((todo) => (
                  <motion.div
                    key={todo.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    className="group bg-white/5 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => dispatch(toggleTodo(todo.id))}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          todo.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-400 hover:border-cyan-400'
                        }`}
                      >
                        {todo.completed && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </motion.svg>
                        )}
                      </motion.button>
                      <span
                        className={`text-lg transition-colors ${
                          todo.completed ? 'text-gray-400 line-through' : 'text-white'
                        }`}
                      >
                        {todo.text}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => dispatch(removeTodo(todo.id))}
                      className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </motion.div>
                ))}
                <motion.div
                  layout
                  className="pt-4 flex justify-end"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => dispatch(clearTodos())}
                    className="text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    Clear All
                  </motion.button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
