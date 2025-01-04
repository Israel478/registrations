import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { to: "/", label: "Home", icon: "🏠" },
    { to: "/training", label: "Training", icon: "⚽" },
    { to: "/coaches", label: "Coaches", icon: "👨‍🏫" },
    { to: "/join-team", label: "Join Team", icon: "📝" },
    { to: "/coach-registration", label: "Coach Registration", icon: "📋" },
    
    { to: "/members", label: "Members", icon: "👥" }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-800">
      <header className="bg-green-950 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-white">KDFCA</h1>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-4">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg transition-colors ${
                      isActive ? "bg-green-600 text-white" : "text-gray-300 hover:bg-green-900"
                    }`
                  }
                  end={item.to === "/"}
                >
                  <span className="text-xl mr-2">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-green-950"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg transition-colors ${
                      isActive ? "bg-green-600 text-white" : "text-gray-300 hover:bg-green-900"
                    }`
                  }
                  end={item.to === "/"}
                >
                  <span className="text-xl mr-2">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}