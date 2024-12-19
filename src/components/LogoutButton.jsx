import { motion } from "framer-motion";
import { LogOut } from "lucide-react";

export default function LogoutButton({ onLogout }) {
  return (
    <motion.button
      onClick={onLogout}
      className="fixed bottom-4 right-4 z-50 p-2.5 
                 bg-sky-800/60 backdrop-blur-2xl rounded-2xl
                 shadow-lg border border-white/30 
                 ring-1 ring-white/50 
                 text-white/70 hover:text-white hover:bg-sky-700/60
                 transition-all duration-300
                 sm:bottom-8 sm:right-8"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <LogOut className="h-5 w-5 sm:h-6 sm:w-6" />
    </motion.button>
  );
} 