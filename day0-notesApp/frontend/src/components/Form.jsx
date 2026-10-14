import { useContext} from "react";
import useNotes from "../hooks/useNotes";
import { NotesContext } from "../context/NotesContext";
import { X } from "lucide-react";

const Form = () => {
  let { submitFormData } = useNotes();
  let { formData, onUpdate, setFormData, setShowForm } = useContext(NotesContext);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div
      className="border border-white/10 bg-gray-900 rounded-3xl p-5 flex flex-col gap-5 shadow-lg shadow-sky-500/15 relative"
    >
      <h1 className="text-2xl px-3">
        <span className="text-3xl font-semibold"> HELLO GUEST </span>
        <br />
        {onUpdate ? <span className="text-yellow-500">Edit the Note</span> : "What's On Your Mind Today?"}
      </h1>

      <form
        onSubmit={submitFormData}
        className="flex-1 flex flex-col space-y-5 bg-gray-800 rounded-3xl p-5"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="">Title</label>
          <input
            onChange={handleChange}
            name="title"
            value={formData.title}
            className="outline-none w-full py-2 rounded-xl bg-slate-600 border border-white/30 px-2"
            type="text"
            placeholder="enter the title"
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="">Description</label>
          <textarea
            onChange={handleChange}
            name="description"
            value={formData.description}
            className=" scrollbar-none outline-none h-full resize-none w-full py-2 rounded-xl bg-slate-600 border border-white/30 px-2"
            type="text"
            placeholder="write your description..."
          />
        </div>

        <button className="bg-blue-600 text-white w-full py-2 text-xl rounded-lg">
          {onUpdate ? "Update Note" : "Add Note"}
        </button>
      </form>

      <button onClick={() => setShowForm(false)} className="rounded-xl absolute top-6 right-6 font-semibold cursor-pointer">
        <X fontWeight={800} size={30}/>
      </button>
    </div>
  );
};

export default Form;
