import Form from "./components/Form";
import AllNotes from "./components/AllNotes";
import { useContext } from "react";
import { NotesContext } from "./context/NotesContext";

const App = () => {
  let { showForm, setShowForm } = useContext(NotesContext);

  return (
    <div
      className={`h-screen w-full overflow-hidden bg-linear-to-l from-[#02414e] to-[#090979] text-slate-300 px-5 sm:px-8 lg:px-20 py-10 font-mono ${showForm ? "grid grid-cols-[2fr_3fr] lg:grid-cols-[2fr_4fr] gap-5" : ""
        }`}
    >
      {showForm && <Form />}

      <AllNotes />
    </div>
  );
};

export default App;
