import { motion } from "framer-motion";

export default function Training() {
  const trainingPrograms = [
    {
      title: "Technical Skills",
      description: "Master ball control, passing, and shooting techniques",
      icon: "⚽",
      duration: "1.5 hours",
      level: "All Levels"
    },
    {
      title: "Tactical Understanding",
      description: "Learn positioning, game reading, and decision making",
      icon: "📒",
      duration: "2 hours",
      level: "Intermediate"
    },
    {
      title: "Physical Conditioning",
      description: "Improve speed, strength, and endurance",
      icon: "💪",
      duration: "1 hour",
      level: "All Levels"
    },
    {
      title: "Team Strategy",
      description: "Practice formations, set pieces, and team coordination",
      icon: "🤝",
      duration: "2 hours",
      level: "Advanced"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Training Programs</h1>
        <p className="text-xl text-gray-300">Elevate your game with our specialized training sessions</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {trainingPrograms.map((program, index) => (
          <motion.div
            key={program.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.03 }}
            className="bg-green-950 bg-opacity-50 p-6 rounded-lg shadow-xl"
          >
            <div className="flex items-start space-x-4">
              <div className="text-4xl">{program.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{program.title}</h3>
                <p className="text-gray-300 mb-4">{program.description}</p>
                <div className="flex space-x-4">
                  <span className="text-sm text-gray-400">
                    ⏱️ {program.duration}
                  </span>
                  <span className="text-sm text-gray-400">
                    📊 {program.level}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Football Animation */}
      <motion.div
        className="fixed top-20 right-10 text-4xl"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        ⚽
      </motion.div>
    </div>
  );
}