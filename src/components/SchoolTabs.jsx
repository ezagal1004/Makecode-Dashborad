import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function SchoolTabs({ schools, selectedSchool, onSelectSchool }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.div layout className="p-8">
      {/* Desktop View */}
      <div className="hidden sm:flex relative bg-sky-700/5 backdrop-blur-xl rounded-full p-1.5 w-fit shadow-lg border border-white/20 hover:bg-sky-700/10 transition-all duration-300">
        <motion.div
          layout
          className="absolute bg-white/30 rounded-full shadow-sm"
          initial={false}
          animate={{
            width: 100,
            x: schools.indexOf(selectedSchool) * 100,
            height: '85%',
            top: '7.5%',
          }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
        {schools.map((school) => (
          <motion.button
            key={school}
            layout
            onClick={() => onSelectSchool(school)}
            className={`relative z-10 py-1.5 text-sm font-medium transition-all duration-300 w-[100px] text-center
              ${selectedSchool === school
                ? "text-sky-700"
                : "text-sky-700/70 hover:text-sky-700"
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {school}
          </motion.button>
        ))}
      </div>

      {/* Mobile View */}
      <div className="sm:hidden flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-sky-700/5 backdrop-blur-xl p-2 rounded-full shadow-lg 
                     border border-white/20 hover:bg-sky-700/10 transition-all duration-300"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-sky-700" />
          ) : (
            <Menu className="h-6 w-6 text-sky-700" />
          )}
        </motion.button>

        <div className="bg-sky-700/5 backdrop-blur-xl px-4 py-1.5 rounded-full 
                      border border-white/20 shadow-lg">
          <span className="text-sm font-medium text-sky-700">
            {selectedSchool}
          </span>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute left-0 right-0 mt-2 mx-4 bg-sky-900/50 backdrop-blur-2xl 
                        rounded-lg border border-white/30 shadow-xl overflow-hidden z-50
                        ring-1 ring-white/50 top-24"
            >
              {schools.map((school) => (
                <motion.button
                  key={school}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onSelectSchool(school);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full p-3 text-left transition-all duration-300 font-medium
                    ${selectedSchool === school
                      ? "bg-sky-800/60 text-white"
                      : "text-white/90 hover:bg-sky-800/40 hover:text-white"
                    }`}
                >
                  {school}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}