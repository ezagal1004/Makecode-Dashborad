import { motion } from "framer-motion";
import { Home, Plus, School } from "lucide-react";

export default function NavigationHub({ onAddClick, currentPage, onPageChange }) {
  const leftPages = [{ id: 'home', icon: Home, label: 'Home' }];
  const rightPages = [{ id: 'schools', icon: School, label: 'Schools' }];

  return (
    <motion.div 
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
      initial={false}
    >
      <motion.div
        className="bg-sky-800/60 backdrop-blur-2xl rounded-2xl p-2 
                   shadow-lg border border-white/30 
                   ring-1 ring-white/50 flex items-center relative gap-1"
      >
        {/* Left side buttons */}
        {leftPages.map((page) => (
          <motion.button
            key={page.id}
            onClick={() => onPageChange(page.id)}
            className={`relative z-10 p-2.5 transition-all duration-300 rounded-xl
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

        {/* Add button in the middle */}
        <motion.button
          onClick={onAddClick}
          className="relative z-20 p-3 mx-2 transition-all duration-300 rounded-xl
                     bg-sky-500/80 hover:bg-sky-500 text-white shadow-lg
                     ring-2 ring-white/50 hover:ring-white/80"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="h-6 w-6 sm:h-7 sm:w-7" />
        </motion.button>

        {/* Right side buttons */}
        {rightPages.map((page) => (
          <motion.button
            key={page.id}
            onClick={() => onPageChange(page.id)}
            className={`relative z-10 p-2.5 transition-all duration-300 rounded-xl
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