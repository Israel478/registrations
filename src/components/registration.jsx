import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRegistration } from "../features/registrationsSlice";
import { motion, AnimatePresence } from "framer-motion";

export default function Registration() {
  const dispatch = useDispatch();
  const registrations = useSelector((state) => state.registrations.registrations);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    position: "",
    experience: "",
    phone: "",
    email: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRegistration({
      ...formData,
      id: Date.now(),
      status: 'pending'
    }));
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 3000);
    setFormData({
      name: "",
      age: "",
      position: "",
      experience: "",
      phone: "",
      email: ""
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Join KDFCA Academy</h1>
        <p className="text-xl text-gray-300">Start your football journey with us</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-green-950 bg-opacity-50 p-8 rounded-lg shadow-xl"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-green-900 bg-opacity-50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2" htmlFor="age">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full bg-green-900 bg-opacity-50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2" htmlFor="position">
                Preferred Position
              </label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full bg-green-900 bg-opacity-50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              >
                <option value="">Select Position</option>
                <option value="Goalkeeper">Goalkeeper</option>
                <option value="Defender">Defender</option>
                <option value="Midfielder">Midfielder</option>
                <option value="Forward">Forward</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2" htmlFor="experience">
                Years of Experience
              </label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full bg-green-900 bg-opacity-50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-green-900 bg-opacity-50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-green-900 bg-opacity-50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full mt-8 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Submit Registration
          </motion.button>
        </motion.form>

        {/* Registered Players List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-green-950 bg-opacity-50 p-8 rounded-lg shadow-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="text-3xl mr-2">📋</span> Registered Players
          </h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {registrations.map((player) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
            {registrations.length === 0 && (
              <p className="text-gray-300 text-center">No players registered yet</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <span className="text-2xl">✅</span>
              <p className="font-semibold">Registration submitted successfully!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}