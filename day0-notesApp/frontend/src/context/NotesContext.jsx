import { createContext, useState, useMemo } from "react";

export const NotesContext = createContext();

export const NotesContextProvider = ({ children }) => {
  const [showNotes, setShowNotes] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [allNotes, setAllNotes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [onUpdate, setOnUpdate] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [updateId, setUpdateId] = useState(null);

  const value = useMemo(
    () => ({
      allNotes,
      setAllNotes,
      isLoading,
      setIsLoading,
      onUpdate,
      setOnUpdate,
      formData,
      setFormData,
      updateId,
      setUpdateId,
      showNotes,
      setShowNotes,
      showForm,
      setShowForm,
    }),
    [allNotes, isLoading, onUpdate, formData, updateId, showNotes, showForm],
  );

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};

export default NotesContextProvider;
