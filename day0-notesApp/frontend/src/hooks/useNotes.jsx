import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { createNotes, deleteNote, getAllNotes, updateNote } from "../apis/notesApi";

const useNotes = () => {
  let {
    setIsLoading,
    setAllNotes,
    setOnUpdate,
    setFormData,
    onUpdate,
    updateId,
    formData,
    setUpdateId,
    setShowForm,
  } = useContext(NotesContext);

  // FIX: Parameter `showLoader` defaults to false to prevent UI screen flashing during background refetches.
  // Only shows loading screen when explicitly passed `true` (e.g. initial mount).
  const fetchedNotes = async (showLoader = false) => {
    try {
      if (showLoader) setIsLoading(true);
      let data = await getAllNotes();
      setAllNotes(data);
    } catch (error) {
      console.log("getting error in notes");
    } finally {
      setIsLoading(false);
    }
  };

  const submitFormData = async (e) => {
    e.preventDefault();
    if (onUpdate) {
      await updateNote(updateId, formData);
      setOnUpdate(false);
    } else {
      await createNotes(formData);
    }
    setFormData({
      title: "",
      description: "",
    });
    await fetchedNotes();
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    await fetchedNotes();
  };

  const handleUpdate = (note) => {
    setFormData({
      title: note.title,
      description: note.description,
    });
    setOnUpdate(true);
    setUpdateId(note._id);
    setShowForm(true);
  };

  return { fetchedNotes, submitFormData, handleDelete, handleUpdate };
};

export default useNotes;
