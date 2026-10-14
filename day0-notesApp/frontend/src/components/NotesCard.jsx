import { useContext, useState } from "react";
import useNotes from "../hooks/useNotes";
import { X } from "lucide-react";

const NotesCard = ({ note }) => {
  let { handleDelete, handleUpdate } = useNotes();
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className="flex min-h-40 flex-col rounded-3xl bg-gray-800 p-5 cursor-pointer">
      <h1 className="text-md font-semibold underline decoration-sky-700 underline-offset-5">
        {note.title}
      </h1>

      <p className="text-sm mt-4 line-clamp-3 text-slate-300">
        {note.description}
      </p>

      <div className="mt-5 flex justify-end px-2">
        <button
          onClick={() => setShowNotes(true)}
          className="px-3 py-2 w-fit bg-sky-600 font-semibold text-xs rounded-md cursor-pointer"
        >
          view
        </button>
      </div>

      {showNotes && (
        <div
          onClick={() => setShowNotes(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[80vh] rounded-3xl border border-white/10 bg-gray-900 p-6 text-white shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowNotes(false)}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-lg text-gray-400 transition hover:bg-gray-700 hover:text-white"
            >
              <X />
            </button>

            {/* Header */}
            <div className="mb-5 border-b border-gray-700 pb-4 pr-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
                Note
              </p>

              <h1 className="text-2xl font-bold leading-tight text-white">
                {note.title}
              </h1>
            </div>

            {/* Description */}
            <div className="max-h-[50vh] overflow-y-auto scrollbar-none pr-2">
              <p className="whitespace-pre-wrap leading-7 text-gray-300">
                {note.description}
              </p>
            </div>

            {/* Button */}
            <div className="mt-auto flex pt-5 justify-between">
              <button
                onClick={() => {
                  handleUpdate(note);
                  setShowNotes(false)
                }}
                className="text-xs font-semibold cursor-pointer rounded-lg bg-yellow-500 px-3 py-2 text-black transition-all hover:scale-105 active:scale-95"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(note._id)}
                className="text-xs font-semibold cursor-pointer rounded-lg bg-red-500 px-3 py-2 transition-all hover:scale-105 active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// PERFORMANCE FIX: Wrapped with React.memo to prevent unnecessary card re-renders when other components update.
export default NotesCard;
