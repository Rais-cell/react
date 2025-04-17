import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "projects"), {
        title,
        description,
        dueDate
      });

      alert("Projet ajouté !");
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un projet</h2>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      /><br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      /><br />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      /><br />
      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default ProjectForm;
