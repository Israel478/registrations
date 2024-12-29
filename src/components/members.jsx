import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function Members() {
  const registrations = useSelector((state) => state.registrations.registrations);
  const coaches = useSelector((state) => state.coaches.coaches);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">KDFCA Members</h1>
        <p className="text-xl text-gray-300">Our growing football family</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Players Section */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <span className="text-3xl mr-2">⚽</span> Players
          </h2>
          <div className="space-y-4">
            {registrations.map((player) => (
              <motion.div
                key={player.id}
                variants={item}
                className="bg-green-950 bg-opacity-50 p-6 rounded-lg shadow-xl"
              >
                <h3 className="text-xl font-bold text-white mb-2">{player.name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-300">Position: {player.position}</p>
                    <p className="text-gray-300">Age: {player.age}</p>
                  </div>
                  <div>
                    <p className="text-gray-300">Experience: {player.experience} years</p>
                    <span className="inline-block bg-green-600 text-white text-sm px-2 py-1 rounded mt-2">
                      {player.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
            {registrations.length === 0 && (
              <p className="text-gray-300 text-center">No players registered yet</p>
            )}
          </div>
        </motion.div>

        {/* Coaches Section */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <span className="text-3xl mr-2">👨‍🏫</span> Coaches
          </h2>
          <div className="space-y-4">
            {coaches.map((coach) => (
              <motion.div
                key={coach.id}
                variants={item}
                className="bg-green-950 bg-opacity-50 p-6 rounded-lg shadow-xl"
              >
                <h3 className="text-xl font-bold text-white mb-2">{coach.name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-300">Specialization: {coach.specialization}</p>
                    <p className="text-gray-300">Experience: {coach.experience} years</p>
                  </div>
                  <div>
                    <p className="text-gray-300">Certification: {coach.certifications}</p>
                    <span className="inline-block bg-green-600 text-white text-sm px-2 py-1 rounded mt-2">
                      {coach.status}
                    </span>
                  </div>
                </div>
                {coach.qualifications && (
                  <p className="text-gray-300 mt-4 text-sm">
                    {coach.qualifications}
                  </p>
                )}
              </motion.div>
            ))}
            {coaches.length === 0 && (
              <p className="text-gray-300 text-center">No coaches registered yet</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
