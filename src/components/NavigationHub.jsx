import { motion, AnimatePresence } from "framer-motion";
import { Home, Plus, School } from "lucide-react";
import { useState } from "react";

export default function NavigationHub({ onAddClick, currentPage, onPageChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const pages = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'schools', icon: School, label: 'Schools' },
    { id: 'add', icon: Plus, label: 'Add Project' }
  ];

  return (
    <motion.div 
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8"
      initial={false}
    >
      <motion.div
        className="relative flex bg-sky-900/50 backdrop-blur-2xl rounded-full p-1.5 
                   shadow-lg border border-white/30 hover:bg-sky-800/60 transition-all 
                   duration-300 ring-1 ring-white/50"
      >
        {pages.map((page) => (
          <motion.button
            key={page.id}
            onClick={() => {
              if (page.id === 'add') {
                onAddClick();
              } else {
                onPageChange(page.id);
              }
            }}
            className={`relative z-10 p-2 transition-all duration-300 rounded-full
              ${currentPage === page.id 
                ? "text-white bg-white/20" 
                : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <page.icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}