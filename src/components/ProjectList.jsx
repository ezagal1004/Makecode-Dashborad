import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";

export default function ProjectList({ projects, onEdit, onDelete }) {
  const entries = Object.entries(projects);

  return (
    <div className="relative min-h-[100px]">
      <AnimatePresence mode="popLayout">
        {entries.length > 0 ? (
          <motion.div 
            key="list" 
            className="space-y-4"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {entries.map(([student, projectLink]) => (
              <ProjectCard
                key={student}
                student={student}
                projectLink={projectLink}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center text-sky-700/70 italic"
          >
            No students added yet.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
