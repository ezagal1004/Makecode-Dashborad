import React from "react";
import { motion } from "framer-motion";
import { X, SmilePlus } from "lucide-react";

const AddProjectModal = ({ 
  onClose, 
  onAdd, 
  name, 
  setName, 
  link, 
  setLink, 
  schools, 
  selectedSchool, 
  setSelectedSchool, 
  showSchoolSelect = false 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd();
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
          <h2 className="text-xl font-semibold text-white">Add Project</h2>
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
          {showSchoolSelect && (
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 
                text-white focus:outline-none focus:ring-2 
                focus:ring-white/30 transition-all duration-300"
            >
              {schools.map(school => (
                <option key={school} value={school} className="bg-sky-900 text-white">
                  {school}
                </option>
              ))}
            </select>
          )}
          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 
              placeholder-white/50 text-white focus:outline-none focus:ring-2 
              focus:ring-white/30 transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Project Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
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
            <SmilePlus className="h-5 w-5" />
            Add Project
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddProjectModal;