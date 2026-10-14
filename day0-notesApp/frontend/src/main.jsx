import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import NotesContextProvider from "./context/NotesContext.jsx";

createRoot(document.getElementById("root")).render(
  <NotesContextProvider>
    <App />
  </NotesContextProvider>
);
