import React from "react";
import { motion } from "framer-motion";
import { X, Edit } from "lucide-react";

const EditProjectModal = ({ project, onClose, onSave, setCurrentEdit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl p-6 w-96 ring-1 ring-white/30"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Edit Project</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-white/70 hover:text-white transition-all duration-300"
          >
            <X className="h-6 w-6" />
          </motion.button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={project.student}
            onChange={(e) => setCurrentEdit({ 
              ...project, 
              student: e.target.value,
              originalStudent: project.originalStudent 
            })}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 
              placeholder-white/50 text-white focus:outline-none focus:ring-2 
              focus:ring-white/30 transition-all duration-300"
          />
          <input
            type="text"
            value={project.projectLink}
            onChange={(e) => setCurrentEdit({ ...project, projectLink: e.target.value })}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 
              placeholder-white/50 text-white focus:outline-none focus:ring-2 
              focus:ring-white/30 transition-all duration-300"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-white/20 hover:bg-white/30 text-white 
              rounded-lg transition-all duration-300 flex items-center justify-center gap-2
              ring-1 ring-white/30 hover:ring-white/50"
          >
            <Edit className="h-5 w-5" />
            Save Changes
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditProjectModal;