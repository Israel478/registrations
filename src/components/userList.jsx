import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function UserList() {
  const registrations = useSelector((state) => state.registrations.registrations);
  const coaches = useSelector((state) => state.coaches.coaches);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">KDFCA Members</h1>
        <p className="text-xl text-gray-300">Our Growing Football Family</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Players Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-green-950 bg-opacity-50 p-6 rounded-lg shadow-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="text-3xl mr-2">⚽</span> Registered Players
          </h2>
          {registrations.length > 0 ? (
            <div className="space-y-4">
              {registrations.map((player) => (
                <motion.div
                  key={player.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-green-900 bg-opacity-50 p-4 rounded-lg"
                >
                  <h3 className="text-xl font-bold text-white">{player.name}</h3>
                  <p className="text-gray-300">Position: {player.position}</p>
                  <p className="text-gray-300">Age: {player.age}</p>
                  <p className="text-gray-300">Experience: {player.experience} years</p>
                  <div className="mt-2">
                    <span className="inline-block bg-green-600 text-white text-sm px-2 py-1 rounded">
                      {player.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-300 text-center">No players registered yet</p>
          )}
        </motion.div>

        {/* Coaches Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-green-950 bg-opacity-50 p-6 rounded-lg shadow-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="text-3xl mr-2">👨‍🏫</span> Coaching Staff
          </h2>
          {coaches.length > 0 ? (
            <div className="space-y-4">
              {coaches.map((coach) => (
                <motion.div
                  key={coach.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-green-900 bg-opacity-50 p-4 rounded-lg"
                >
                  <h3 className="text-xl font-bold text-white">{coach.name}</h3>
                  <p className="text-gray-300">Specialization: {coach.specialization}</p>
                  <p className="text-gray-300">Experience: {coach.experience} years</p>
                  <p className="text-gray-300">Certifications: {coach.certifications}</p>
                  <div className="mt-2">
                    <span className="inline-block bg-green-600 text-white text-sm px-2 py-1 rounded">
                      {coach.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-300 text-center">No coaches registered yet</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
