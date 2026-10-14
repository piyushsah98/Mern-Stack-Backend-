import { memo, useContext, useEffect } from "react";
import { AdIcon, Plus, X } from "lucide-react";
import NotesCard from "./NotesCard";
import { NotesContext } from "../context/NotesContext";
import useNotes from "../hooks/useNotes";

const AllNotes = () => {
  let { fetchedNotes } = useNotes();
  let { isLoading, allNotes, setShowForm } = useContext(NotesContext);

  useEffect(() => {
    fetchedNotes(true);
  }, []);

  if (isLoading)
    return (
      <div className="bg-slate-700 rounded-3xl p-5 shadow-lg shadow-sky-500/15 overflow-auto">
        Loading notes....
      </div>
    );

  if (!allNotes || allNotes.length === 0) {
    return (
      <div className="bg-slate-700 rounded-3xl p-5 shadow-lg shadow-sky-500/15 flex flex-col relative h-full">
        <h1 className="text-3xl font-semibold pl-2 mb-5 ">Your Notes</h1>
        <div className="flex-1 flex justify-center items-center h-64">
          <p className="text-xl">No Notes Found... Add Notes To Get Started</p>
        </div>
        <div className="absolute right-10 top-10">
          <div className="group relative">
            <button onClick={() => setShowForm(prev => !prev)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 transition-all duration-200 hover:scale-105 hover:bg-blue-500 active:scale-95">
              <Plus size={22} strokeWidth={3} />
            </button>

            <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-black px-3 py-1 text-sm text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              Add Note
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full border border-white/10 bg-gray-900 rounded-3xl p-5 shadow-lg shadow-sky-500/15 overflow-auto relative">
      <h1 className="text-3xl font-semibold pl-2 mb-5 ">Your Notes</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {allNotes.map((note) => {
          return <NotesCard key={note._id} note={note} />;
        })}
      </div>

      <div className="absolute right-10 top-10">
        <div className="group relative">
          <button onClick={() => setShowForm(prev => !prev)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 transition-all duration-200 hover:scale-105 hover:bg-blue-500 active:scale-95">
            <Plus size={22} strokeWidth={3} />
          </button>

          <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-black px-3 py-1 text-sm text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
            Add Note
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(AllNotes);
