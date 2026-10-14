# Re-Rendering React App on API Calls (Create, Read, Update, Delete)

This guide explains how to properly handle re-rendering in a React application when performing API operations (**CREATE**, **UPDATE**, **DELETE**).

---

## 💡 Key Concept: Why doesn't React re-render automatically?

In React:
- Component re-renders occur **ONLY when `state` or `props` change**.
- Calling an API (e.g., `axios.post`, `axios.delete`, `axios.put`) modifies the **backend database**, but **does NOT automatically update React state**.
- To reflect changes in the UI, you must update the frontend React state immediately after the API call completes successfully.

---

## 🎯 3 Ways to Handle Re-Rendering in React

Here are the standard, industry-proven approaches:

1. **Callback Refetching (Re-fetch from Server)**: Call the API, wait for success, and then invoke a function to re-fetch all notes from the backend. *(Simplest & ensures 100% data accuracy)*
2. **Local State Update (Optimistic / Direct State Update)**: Modify the local state array (`filter`, `map`, `[newNote, ...prev]`) directly after the API call succeeds. *(Fastest response time)*
3. **React Context API**: Use a central store (`NotesContext`) so any child component (`Form`, `NotesCard`, `AllNotes`) can update the shared state seamlessly.

---

## 🛠️ Implementation 1: Callback / Props Pattern (Recommended for Current Codebase)

### Step 1: Update API Functions to Return Data (`src/apis/notesApi.jsx`)

Ensure your API helpers `await` the response and return data so components know when the API call is done.

```javascript
import { axiosInstance } from "../config/axiosInstance";

// 🟢 GET All Notes
export const getAllNotes = async () => {
  try {
    const res = await axiosInstance.get("/allNotes");
    return res.data.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};

// 🔵 CREATE Note
export const createNotes = async (data) => {
  try {
    const res = await axiosInstance.post("/create", data);
    return res.data; // Return created note or success response
  } catch (error) {
    console.error("Error creating note:", error);
  }
};

// 🔴 DELETE Note
export const deleteNote = async (id) => {
  try {
    const res = await axiosInstance.delete(`/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

// 🟡 UPDATE Note
export const updateNote = async (id, updatedData) => {
  try {
    const res = await axiosInstance.put(`/${id}`, updatedData);
    return res.data;
  } catch (error) {
    console.error("Error updating note:", error);
  }
};
```

---

### Step 2: Manage Shared Notes State in Parent (`src/App.jsx`)

Lift the state up to `App.jsx` so both `Form.jsx` (Create) and `AllNotes.jsx` (Read/Delete/Update) share access to notes and the refetch trigger.

```jsx
import { useEffect, useState } from "react";
import Form from "./components/Form";
import AllNotes from "./components/AllNotes";
import { getAllNotes } from "./apis/notesApi";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Central function to fetch notes from Backend
  const fetchNotes = async () => {
    try {
      const data = await getAllNotes();
      setNotes(data || []);
    } catch (error) {
      console.error("Failed to load notes", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="h-screen w-full bg-linear-to-l from-[#02414e] to-[#090979] text-slate-300 px-5 sm:px-8 lg:px-20 py-10 grid grid-cols-[2fr_3fr] lg:grid-cols-[2fr_4fr] gap-5 font-mono">
      {/* Pass fetchNotes callback to Form */}
      <Form fetchNotes={fetchNotes} />

      {/* Pass notes and fetchNotes to AllNotes */}
      <AllNotes notes={notes} isLoading={isLoading} fetchNotes={fetchNotes} />
    </div>
  );
};

export default App;
```

---

## ⚡ Handling Specific Operations

### 1. 🟢 CREATE Operation (`Form.jsx`)

When creating a note, call `createNotes`, wait for `await`, then call `fetchNotes()` to re-render the app with the newly created item.

```jsx
import { useState } from "react";
import { createNotes } from "../apis/notesApi";

const Form = ({ fetchNotes }) => {
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitFormData = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    // 1. Call API
    await createNotes(formData);

    // 2. Reset Form
    setFormData({ title: "", description: "" });

    // 3. Re-render UI by triggering fetch
    await fetchNotes();
  };

  return (
    <form onSubmit={submitFormData}>
      {/* Form Inputs */}
      <input name="title" value={formData.title} onChange={handleChange} />
      <textarea name="description" value={formData.description} onChange={handleChange} />
      <button type="submit">Add Note</button>
    </form>
  );
};
```

---

### 2. 🔴 DELETE Operation (`NotesCard.jsx` & `AllNotes.jsx`)

When deleting a note, call `deleteNote(id)`, `await` completion, then call `fetchNotes()` (or filter local state).

```jsx
import { deleteNote } from "../apis/notesApi";

const NotesCard = ({ note, fetchNotes }) => {
  const handleDelete = async () => {
    // 1. Call Delete API
    await deleteNote(note._id);

    // 2. Re-render UI by fetching updated list
    await fetchNotes();
  };

  return (
    <div className="card">
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      <button onClick={handleDelete} className="bg-red-500">
        Delete
      </button>
    </div>
  );
};
```

---

### 3. 🟡 UPDATE Operation (`NotesCard.jsx` / Edit Modal)

When updating a note, send the updated payload via API, `await` the response, then call `fetchNotes()`.

```jsx
import { updateNote } from "../apis/notesApi";

const NotesCard = ({ note, fetchNotes }) => {
  const handleUpdate = async () => {
    const updatedTitle = prompt("Edit Title:", note.title);
    if (!updatedTitle) return;

    // 1. Call Update API
    await updateNote(note._id, {
      title: updatedTitle,
      description: note.description,
    });

    // 2. Re-render UI
    await fetchNotes();
  };

  return (
    <div className="card">
      <h3>{note.title}</h3>
      <button onClick={handleUpdate} className="bg-yellow-500">
        Edit
      </button>
    </div>
  );
};
```

---

## ⚡ Implementation 2: Local State Update (No Refetching)

If you don't want to make an extra network request to `getAllNotes()` after every action, update the `notes` array in local state directly:

| Action | Local State Code Pattern |
| :--- | :--- |
| **CREATE** | `setNotes((prev) => [newNote, ...prev]);` |
| **DELETE** | `setNotes((prev) => prev.filter((note) => note._id !== deletedId));` |
| **UPDATE** | `setNotes((prev) => prev.map((note) => note._id === updatedId ? updatedNote : note));` |

### Example for Delete without Refetching:
```javascript
const handleDelete = async (id) => {
  await deleteNote(id);
  // Re-render UI instantly by updating local state array
  setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
};
```

---

## 🌐 Implementation 3: Using React Context API

For scalable apps, wrap your app in a `NotesContext` so you don't have to pass props down multiple levels (Prop Drilling).

```jsx
// src/context/NotesContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import { getAllNotes, createNotes, deleteNote, updateNote } from "../apis/notesApi";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const data = await getAllNotes();
    setNotes(data || []);
  };

  const handleCreate = async (formData) => {
    await createNotes(formData);
    await fetchNotes(); // Re-render
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    await fetchNotes(); // Re-render
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NotesContext.Provider value={{ notes, fetchNotes, handleCreate, handleDelete }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
```

---

## 📊 Summary Matrix

| Operation | Step 1: API Call | Step 2: Trigger UI Re-render |
| :--- | :--- | :--- |
| **CREATE** | `await createNotes(data)` | Call `fetchNotes()` OR `setNotes([newNote, ...notes])` |
| **UPDATE** | `await updateNote(id, data)` | Call `fetchNotes()` OR `setNotes(notes.map(...))` |
| **DELETE** | `await deleteNote(id)` | Call `fetchNotes()` OR `setNotes(notes.filter(...))` |

---

### ✅ Best Practice Checklist
1. Always `await` API requests in `async` event handlers before calling re-render triggers.
2. Handle errors with `try...catch` so UI state stays consistent even if API fails.
3. Reset form fields after creation completes.
4. Disable buttons / show loading indicators while API requests are pending.
