import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCoach } from "../features/coachesSlice";
import { motion, AnimatePresence } from "framer-motion";

export default function CoachRegistration() {
  const dispatch = useDispatch();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    certifications: "",
    phone: "",
    email: "",
    qualifications: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCoach({
      ...formData,
      id: Date.now(),
      status: 'pending'
    }));
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 3000);
    setFormData({
      name: "",
      specialization: "",
      experience: "",
      certifications: "",
      phone: "",
      email: "",
      qualifications: ""
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
        <h1 className="text-4xl font-bold text-white mb-4">Join KDFCA Coaching Team</h1>
        <p className="text-xl text-gray-300">Share your expertise with the next generation</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-green-950 bg-opacity-50 p-8 rounded-lg shadow-xl"
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
            <label className="block text-gray-300 mb-2" htmlFor="specialization">
              Specialization
            </label>
            <select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full bg-green-900 bg-opacity-50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">Select Specialization</option>
              <option value="Technical Coach">Technical Coach</option>
              <option value="Tactical Coach">Tactical Coach</option>
              <option value="Fitness Coach">Fitness Coach</option>
              <option value="Goalkeeper Coach">Goalkeeper Coach</option>
              <option value="Youth Development">Youth Development</option>
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
            <label className="block text-gray-300 mb-2" htmlFor="certifications">
              Highest Certification
            </label>
            <select
              id="certifications"
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              className="w-full bg-green-900 bg-opacity-50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">Select Certification</option>
              <option value="UEFA Pro License">UEFA Pro License</option>
              <option value="UEFA A License">UEFA A License</option>
              <option value="UEFA B License">UEFA B License</option>
              <option value="CAF A License">CAF A License</option>
              <option value="CAF B License">CAF B License</option>
              <option value="Other">Other</option>
            </select>
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

          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-2" htmlFor="qualifications">
              Additional Qualifications & Experience
            </label>
            <textarea
              id="qualifications"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              placeholder="Tell us about your coaching experience, achievements, and philosophy..."
              className="w-full bg-green-900 bg-opacity-50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 h-32"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full mt-8 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Submit Application
        </motion.button>
      </motion.form>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center space-x-2">
              <span className="text-2xl">✅</span>
              <p className="font-semibold">Application submitted successfully!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
