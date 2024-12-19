import { motion } from "framer-motion";
import { School, Users } from "lucide-react";

export default function Dashboard({ projects, schools, onSchoolSelect }) {
  // Calculate stats for each school
  const schoolStats = schools.map(school => ({
    name: school,
    count: projects[school] ? Object.keys(projects[school]).length : 0
  }));

  // Calculate total projects
  const totalProjects = schools.reduce((sum, school) => {
    return sum + (projects[school] ? Object.keys(projects[school]).length : 0);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 p-4
                     shadow-lg ring-1 ring-white/30"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500/10 rounded-lg">
              <School className="h-6 w-6 text-sky-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-sky-700/70">Total Schools</h3>
              <p className="text-2xl font-semibold text-sky-700">{schools.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 p-4
                     shadow-lg ring-1 ring-white/30"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500/10 rounded-lg">
              <Users className="h-6 w-6 text-sky-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-sky-700/70">Total Projects</h3>
              <p className="text-2xl font-semibold text-sky-700">{totalProjects}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* School Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 
                   shadow-lg ring-1 ring-white/30 overflow-hidden"
      >
        <div className="p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-sky-700">School Statistics</h2>
        </div>
        <div className="divide-y divide-white/10">
          {schoolStats.map((school) => (
            <motion.button
              key={school.name}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              onClick={() => {
                onSchoolSelect(school.name);
              }}
              className="w-full p-4 flex items-center justify-between transition-all duration-300"
            >
              <span className="text-sky-700">{school.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-sky-700/70">{school.count}</span>
                <span className="text-sm text-sky-700/50">projects</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 