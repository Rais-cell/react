// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });
  const [taskInput, setTaskInput] = useState('');

  const handleAddProjectClick = () => {
    setShowForm(true);
    setSelectedProject(null);
    setFormData({ title: '', description: '', dueDate: '' });
  };

  const handleSave = () => {
    const newProject = {
      ...formData,
      id: Date.now(),
      tasks: []
    };
    setProjects([...projects, newProject]);
    setShowForm(false);
   
  };
  

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setShowForm(false);
  };

  const handleDeleteProject = () => {
    setProjects(projects.filter(p => p.id !== selectedProject.id));
    setSelectedProject(null);
  };

  const handleAddTask = () => {
    if (!taskInput.trim()) return;
    const updatedProject = {
      ...selectedProject,
      tasks: [...selectedProject.tasks, taskInput]
    };
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
    setSelectedProject(updatedProject);
    setTaskInput('');
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>YOUR PROJECTS</h2>
        <button className="add-btn" onClick={handleAddProjectClick}>+ Add Project</button>
        <div className="project-list">
          {projects.map(p => (
            <div
              key={p.id}
              className={`project-item ${selectedProject?.id === p.id ? 'selected' : ''}`}
              onClick={() => handleSelectProject(p)}
            >
              {p.title}
            </div>
          ))}
        </div>
      </aside>
      <main className="main-content">
        {!selectedProject && !showForm && (
          <div className="empty-state">
            <img src="/clipboard.jpg" alt="clipboard" className="icon" />
            <p>Select a project or get started with a new one</p>
            <button className="create-btn" onClick={handleAddProjectClick}>Create New Project</button>
          </div>
        )}

        {showForm && (
          <div className="form-container">
            <label>TITLE</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <label>DESCRIPTION</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <label>DUE DATE</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
            <div className="form-actions">
              <span onClick={handleCancel} className="cancel">Cancel</span>
              <button className="save-btn" onClick={handleSave}>Save</button>
            </div>
          </div>
        )}

        {selectedProject && !showForm && (
          <div className="project-details">
            <div className="header">
              <h2>{selectedProject.title}</h2>
              <button className="delete-btn" onClick={handleDeleteProject}>Delete</button>
            </div>
            <p className="date">{new Date(selectedProject.dueDate).toLocaleDateString()}</p>
            <p>{selectedProject.description}</p>
            <hr />
            <h3>Tasks</h3>
            <div className="task-input">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
              />
              <button onClick={handleAddTask}>Add</button>
            </div>
            <ul className="task-list">
              {selectedProject.tasks.length === 0 ? (
                <li className="no-task">No tasks</li>
              ) : (
                selectedProject.tasks.map((task, index) => <li key={index}>{task}</li>)
              )}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
