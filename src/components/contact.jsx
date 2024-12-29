import { motion } from "framer-motion";

export default function Coaches() {
  const coach = {
    name: "Kassa Degefa",
    role: "Head Coach & Founder",
    specialization: "Professional Football Development",
    experience: "20+ years",
    certifications: [
      "UEFA Pro License",
      "FIFA Certified Coach",
      "Youth Development Specialist"
    ],
    achievements: [
      "Former Professional Player",
      "National Team Experience",
      "Developed 50+ Professional Players"
    ],
    philosophy: "Building champions through discipline, dedication, and technical excellence"
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Meet Our Head Coach</h1>
        <p className="text-xl text-gray-300">Excellence in Football Training</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-green-950 bg-opacity-50 p-8 rounded-lg shadow-xl"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center">
            <motion.div
              className="text-9xl mb-4 mx-auto"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              👨‍🏫
            </motion.div>
            <h2 className="text-3xl font-bold text-white">{coach.name}</h2>
            <p className="text-xl text-cyan-400 font-semibold">{coach.role}</p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Expertise</h3>
              <p className="text-gray-300">{coach.specialization}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2">Experience</h3>
              <p className="text-gray-300">{coach.experience}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2">Certifications</h3>
              <ul className="list-disc list-inside text-gray-300">
                {coach.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2">Achievements</h3>
              <ul className="list-disc list-inside text-gray-300">
                {coach.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-green-900 bg-opacity-50 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-2">Coaching Philosophy</h3>
          <p className="text-gray-300 italic">"{coach.philosophy}"</p>
        </div>
      </motion.div>

      {/* Floating Football Animation */}
      <motion.div
        className="fixed bottom-20 left-10 text-4xl"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        ⚽
      </motion.div>
    </div>
  );
}