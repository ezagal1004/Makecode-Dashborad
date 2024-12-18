import React from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, ExternalLink } from "lucide-react";

const ProjectCard = ({ student, projectLink, onEdit, onDelete }) => {
  return (
    <motion.div
      // Slide in from slightly offscreen left
      initial={{ x: -20, opacity: 0 }}
      // Animate fully into view
      animate={{ x: 0, opacity: 1 }}
      // Slide out further left so it’s clearly offscreen before removal
      exit={{
        x: "-150%",
        opacity: 1,
        transition: {
          duration: 0.3,
          ease: "easeInOut"
        }
      }}
      layout
      className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-3 sm:p-4
             hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl
             ring-1 ring-white/20 hover:ring-white/30 group"
>
<div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between">
    <div>
      <h3 className="text-lg font-medium text-sky-800 mb-1">
        {student}
      </h3>
      <motion.a
        whileHover={{ scale: 1.05 }}
        href={projectLink.startsWith("http") ? projectLink : `https://${projectLink}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-600 hover:text-sky-400 transition-all duration-300 
                   inline-flex items-center gap-2 bg-sky-500/10 px-3 py-1 
                   rounded-full hover:bg-sky-500/20 text-sm sm:text-base"
      >
        <ExternalLink className="h-4 w-4" />
        View Project
      </motion.a>
    </div>
    <div className="flex gap-3 justify-end">
          <motion.button
          
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(student, projectLink)}
            className="p-2 hover:bg-white/20 rounded-full transition-all duration-300"
          >
            <Edit className="h-5 w-5 text-yellow-500" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(student)}
            className="p-2 hover:bg-white/20 rounded-full transition-all duration-300"
          >
            <Trash2 className="h-5 w-5 text-red-400" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
