import { Outlet, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Layout() {
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const navLinks = [
    { to: "/home", label: "Home", icon: "🏠" },
    { to: "/news", label: "News", icon: "📰" },
    { to: "/contact", label: "Contact", icon: "📞" },
    { to: "/registration", label: "Registration", icon: "📝" },
    { to: "/counter", label: "Counter", icon: "🔢" },
    { to: "/todo", label: "Todo", icon: "✅" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-900 to-gray-900">
      {/* Animated background */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(600px at 0% 0%, rgba(29, 78, 216, 0.15), transparent 80%)",
            "radial-gradient(600px at 100% 0%, rgba(14, 165, 233, 0.15), transparent 80%)",
            "radial-gradient(600px at 100% 100%, rgba(29, 78, 216, 0.15), transparent 80%)",
            "radial-gradient(600px at 0% 100%, rgba(14, 165, 233, 0.15), transparent 80%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Mouse follower */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        style={{
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-black/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold gradient-text"
            >
              FutureApp
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setActiveLink(link.to)}
                  className="relative group px-4 py-2"
                >
                  <motion.div
                    className={`absolute inset-0 rounded-lg ${
                      activeLink === link.to ? 'bg-white/10' : 'bg-transparent'
                    } group-hover:bg-white/5 transition-colors duration-200`}
                    layoutId="navbar-active"
                  />
                  <motion.span
                    className="relative z-10 flex items-center space-x-2 text-sm font-medium text-gray-300 group-hover:text-cyan-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span>{link.label}</span>
                  </motion.span>
                  {activeLink === link.to && (
                    <motion.div
                      layoutId="navbar-line"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <span className="text-2xl">☰</span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10"
            >
              <div className="px-4 py-2 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => {
                      setActiveLink(link.to);
                      setIsMenuOpen(false);
                    }}
                  >
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                        activeLink === link.to
                          ? 'bg-white/10 text-cyan-400'
                          : 'text-gray-300'
                      }`}
                    >
                      <span className="text-lg">{link.icon}</span>
                      <span>{link.label}</span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
    </div>
  );
}