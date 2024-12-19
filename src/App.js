import React, { useState, useEffect } from "react";
import { ref, onValue, set, remove, update } from "firebase/database";
import { database } from "./firebase";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import bgImg from "./Images/life-s-captured-sparks-omBEgDTkzLw-unsplash.webp";


// Components
import SchoolTabs from "./components/SchoolTabs";
import ProjectList from "./components/ProjectList";
import AddProjectModal from "./components/AddProjectModal";
import EditProjectModal from "./components/EditProjectModal";
import NavigationHub from './components/NavigationHub';
import Dashboard from './components/Dashboard';

const schools = ["Beryl", "Hickory"];

export default function App() {
  // State management code remains the same
  const [selectedSchool, setSelectedSchool] = useState(schools[0]);
  const [projects, setProjects] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [newName, setNewName] = useState("");
  const [newLink, setNewLink] = useState("");
  const [currentPage, setCurrentPage] = useState('schools');
  const [showSchoolSelect, setShowSchoolSelect] = useState(false);
  const [allProjects, setAllProjects] = useState({});



  // Firebase listeners and CRUD operations remain the same
  useEffect(() => {
    const projectsRef = ref(database, `schools/${selectedSchool}`);
    onValue(projectsRef, (snapshot) => {
      setProjects(snapshot.val() || {});
    });
  }, [selectedSchool]);

  useEffect(() => {
    const allProjectsRef = ref(database, 'schools');
    onValue(allProjectsRef, (snapshot) => {
      setAllProjects(snapshot.val() || {});
    });
  }, []);

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
    setCurrentEdit({
      student,
      projectLink,
      originalStudent: student // Keep track of original name
    });
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    if (!currentEdit) return;

    const oldPath = `schools/${selectedSchool}/${currentEdit.originalStudent}`;
    const newPath = `schools/${selectedSchool}/${currentEdit.student}`;
    
    if (currentEdit.originalStudent === currentEdit.student) {
      // Just update the link
      const projectRef = ref(database, oldPath);
      set(projectRef, currentEdit.projectLink)
        .then(() => {
          setShowEditModal(false);
          setCurrentEdit(null);
        })
        .catch((error) => {
          console.error("Error updating project:", error);
        });
    } else {
      // Handle name change: remove old entry and add new one
      const updates = {};
      updates[oldPath] = null; // Delete old entry
      updates[newPath] = currentEdit.projectLink; // Add new entry
      
      update(ref(database), updates)
        .then(() => {
          setShowEditModal(false);
          setCurrentEdit(null);
        })
        .catch((error) => {
          console.error("Error updating project:", error);
        });
    }
  };

  const deleteProject = (student) => {
    const projectRef = ref(database, `schools/${selectedSchool}/${student}`);
    remove(projectRef);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="max-w-6xl mx-auto p-4 sm:p-8">
        <motion.div
          layout
          className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 
      shadow-xl p-4 sm:p-6 ring-1 ring-white/20 hover:bg-white/15 transition-all duration-300"
        >
          {/* Header */}
          <motion.div layout className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-semibold text-sky-700">
              {currentPage === 'home' ? 'Dashboard' : 'Makecode Arcade Projects'}
            </h1>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentPage === 'home' ? (
                <Dashboard 
                  projects={allProjects} 
                  schools={schools}
                  onSchoolSelect={(school) => {
                    setSelectedSchool(school);
                    setCurrentPage('schools');
                  }}
                />
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <SchoolTabs
                      schools={schools}
                      selectedSchool={selectedSchool}
                      onSelectSchool={setSelectedSchool}
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setShowSchoolSelect(false);
                        setShowAddModal(true);
                      }}
                      className="p-2 hover:bg-white/20 rounded-full transition-all duration-300
                               bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
                    >
                      <Plus className="h-5 w-5 text-sky-700" />
                    </motion.button>
                  </div>
                  <ProjectList
                    projects={projects}
                    onEdit={startEditing}
                    onDelete={deleteProject}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <NavigationHub 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onAddClick={() => {
          setShowSchoolSelect(true);
          setShowAddModal(true);
        }}
      />

      {/* Modals */}
      <AnimatePresence>
        {showAddModal && (
          <AddProjectModal
            onClose={() => {
              setShowAddModal(false);
              setShowSchoolSelect(false);
            }}
            onAdd={addProject}
            name={newName}
            setName={setNewName}
            link={newLink}
            setLink={setNewLink}
            schools={schools}
            selectedSchool={selectedSchool}
            setSelectedSchool={setSelectedSchool}
            showSchoolSelect={showSchoolSelect}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditModal && currentEdit && (
          <EditProjectModal
            project={currentEdit}
            onClose={() => {
              setShowEditModal(false);
              setCurrentEdit(null);
            }}
            onSave={handleEditSave}
            setCurrentEdit={setCurrentEdit}
          />
        )}
      </AnimatePresence>
    </div>
  );
}