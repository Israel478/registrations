import { motion } from "framer-motion";
import ChildComponent from "./child";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function ParentComponent() {
  const [learnMoreButtonClicked, setLearnMoreButtonClicked] = useState(false);
  const vistors = useRef(0);

  useEffect(() => {
    // setVistors(vistors + 1)
    return () => {
      console.log("clean up");
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-white mb-4">Elite Football Academy</h1>
        <p className="text-xl text-gray-300">Transform Your Game with Professional Coaching</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature Cards */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-green-950 bg-opacity-50 p-6 rounded-lg shadow-xl"
        >
          <div className="text-4xl mb-4">⚽</div>
          <h3 className="text-xl font-bold text-white mb-2">Professional Training</h3>
          <p className="text-gray-300">Expert coaching from experienced professionals with proven track records</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-green-950 bg-opacity-50 p-6 rounded-lg shadow-xl"
        >
          <div className="text-4xl mb-4">🏃</div>
          <h3 className="text-xl font-bold text-white mb-2">Personalized Programs</h3>
          <p className="text-gray-300">Customized training programs tailored to your specific needs and goals</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-green-950 bg-opacity-50 p-6 rounded-lg shadow-xl"
        >
          <div className="text-4xl mb-4">🏆</div>
          <h3 className="text-xl font-bold text-white mb-2">Competition Ready</h3>
          <p className="text-gray-300">Prepare for matches with tactical training and competitive scenarios</p>
        </motion.div>
      </div>

      {/* Animated Soccer Ball */}
      <motion.div
        className="fixed bottom-10 right-10 text-6xl"
        animate={{
          rotate: [0, 360],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        ⚽
      </motion.div>

      {/* props */}
      <ChildComponent show={learnMoreButtonClicked ? "learnMore" : "quote"} />
      <p
        ref={vistors}
        className="text-2xl fixed bottom-0 left-0 text-white font-bold"
      >
        Vistors
      </p>
    </div>
  );
}