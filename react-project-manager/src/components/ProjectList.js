// src/components/ProjectList.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectList);
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h2>📋 Liste des projets</h2>
      {projects.length === 0 ? (
        <p>Aucun projet trouvé.</p>
      ) : (
        <ul>
          {projects.map(project => (
            <li key={project.id}>
              <strong>{project.title}</strong><br />
              {project.description}<br />
              📅 {project.dueDate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectList;
