import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, set, remove } from "firebase/database";
import { database } from "./firebase";
import { Plus, X, Edit, Trash2, Sun, Moon, SmilePlus, ExternalLink } from "lucide-react";
import bgImg from "./Images/life-s-captured-sparks-omBEgDTkzLw-unsplash.webp";

const schools = ["Beryl", "Hickory"];

function App() {
  const [selectedSchool, setSelectedSchool] = useState(schools[0]);
  const [projects, setProjects] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [newName, setNewName] = useState("");
  const [newLink, setNewLink] = useState("");

  useEffect(() => {
    const projectsRef = ref(database, `schools/${selectedSchool}`);
    onValue(projectsRef, (snapshot) => {
      setProjects(snapshot.val() || {});
    });
  }, [selectedSchool]);

  const addProject = () => {
    if (newName && newLink) {
      const newRef = ref(database, `schools/${selectedSchool}/${newName}`);
      set(newRef, newLink);
      setNewName("");
      setNewLink("");
      setShowAddModal(false);
    }
  };

  const startEditing = (student, projectLink) => {
    setCurrentEdit({ student, projectLink });
    setShowEditModal(true);
  };

  const saveEdit = () => {
    if (currentEdit) {
      const newRef = ref(database, `schools/${selectedSchool}/${currentEdit.student}`);
      set(newRef, currentEdit.projectLink);
      setShowEditModal(false);
      setCurrentEdit(null);
    }
  };

  const deleteProject = (student) => {
    const projectRef = ref(database, `schools/${selectedSchool}/${student}`);
    remove(projectRef);
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="max-w-6xl mx-auto p-8">
        {/* Main Container */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl p-6 ring-1 ring-white/20 hover:bg-white/15 transition-all duration-300">
          {/* Top Section */}
          <div className="flex justify-start items-center mb-6">
            <h1 className="text-4xl font-semibold text-sky-700">
              Makecode Arcade Projects
            </h1>
          </div>

          {/* School Tabs */}
          <div className="p-8">
            <div className="relative flex bg-sky-700/5 backdrop-blur-xl rounded-full p-1.5 w-fit shadow-lg border border-white/20 hover:bg-sky-700/10 transition-all duration-300">
              <div
                className="absolute transition-all duration-300 bg-white/30 rounded-full shadow-sm"
                style={{
                  width: '100px',
                  height: '85%',
                  top: '50%',
                  left: '6px',
                  transform: `translateX(${schools.indexOf(selectedSchool) * 100}px) translateY(-50%)`
                }}
              />
              {schools.map((school) => (
                <button
                  key={school}
                  className={`relative z-10 py-1.5 text-sm font-medium transition-all duration-300 w-[100px] text-center
                    ${selectedSchool === school
                      ? "text-sky-700"
                      : "text-sky-700/70 hover:text-sky-700"
                    }`}
                  onClick={() => setSelectedSchool(school)}
                >
                  {school}
                </button>
              ))}
            </div>
          </div>

          {/* Projects List */}
          <div className="space-y-4">
            {Object.keys(projects).length === 0 ? (
              <div className="text-center py-8 text-sky-700/70 italic">
                No students added yet.
              </div>
            ) : (
              Object.entries(projects).map(([student, projectLink]) => (
                <div
                  key={student}
                  className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-4 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl ring-1 ring-white/20 hover:ring-white/30 group"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-sky-800 mb-1">
                        {student}
                      </h3>
                      <a
                        href={projectLink.startsWith("http") ? projectLink : `https://${projectLink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 hover:text-sky-400 transition-all duration-300 inline-flex items-center gap-2 bg-sky-500/10 px-3 py-1 rounded-full hover:bg-sky-500/20"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Project
                      </a>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => startEditing(student, projectLink)}
                        className="p-2 hover:bg-white/20 rounded-full transition-all duration-300"
                      >
                        <Edit className="h-5 w-5 text-yellow-500" />
                      </button>
                      <button
                        onClick={() => deleteProject(student)}
                        className="p-2 hover:bg-white/20 rounded-full transition-all duration-300"
                      >
                        <Trash2 className="h-5 w-5 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 bg-blue-500/60 backdrop-blur-xl p-4 rounded-full 
          shadow-lg hover:bg-blue-600/80 hover:scale-110 transition-all duration-300 
          border border-white/30 hover:shadow-xl hover:shadow-blue-500/25 ring-2 ring-white/20 hover:ring-white/40"
      >
        <Plus className="h-6 w-6 text-white" />
      </button>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl p-6 w-96 ring-1 ring-white/30 scale-100 hover:scale-[1.02] transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Add Project</h2>
              <button onClick={() => setShowAddModal(false)} className="text-white/70 hover:text-white transition-all duration-300">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Student Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 
                  placeholder-white/50 text-white focus:outline-none focus:ring-2 
                  focus:ring-white/30 transition-all duration-300"
              />
              <input
                type="text"
                placeholder="Project Link"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 
                  placeholder-white/50 text-white focus:outline-none focus:ring-2 
                  focus:ring-white/30 transition-all duration-300"
              />
              <button
                onClick={addProject}
                className="w-full py-3 bg-white/20 hover:bg-white/30 text-white 
                  rounded-lg transition-all duration-300 flex items-center justify-center gap-2 
                  ring-1 ring-white/30 hover:ring-white/50"
              >
                <SmilePlus className="h-5 w-5" />
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && currentEdit && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl p-6 w-96 ring-1 ring-white/30 scale-100 hover:scale-[1.02] transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Edit Project</h2>
              <button onClick={() => setShowEditModal(false)} className="text-white/70 hover:text-white transition-all duration-300">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={currentEdit.student}
                onChange={(e) => setCurrentEdit({ ...currentEdit, student: e.target.value })}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 
                  placeholder-white/50 text-white focus:outline-none focus:ring-2 
                  focus:ring-white/30 transition-all duration-300"
              />
              <input
                type="text"
                value={currentEdit.projectLink}
                onChange={(e) => setCurrentEdit({ ...currentEdit, projectLink: e.target.value })}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 
                  placeholder-white/50 text-white focus:outline-none focus:ring-2 
                  focus:ring-white/30 transition-all duration-300"
              />
              <button
                onClick={saveEdit}
                className="w-full py-3 bg-white/20 hover:bg-white/30 text-white 
                  rounded-lg transition-all duration-300 flex items-center justify-center gap-2
                  ring-1 ring-white/30 hover:ring-white/50"
              >
                <Edit className="h-5 w-5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;