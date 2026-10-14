import { axiosInstance } from "../config/axiosInstance";

export const createNotes = async (data) => {
  try {
    let notes = await axiosInstance.post("/create", data);
  } catch (error) {
    console.log("error in creating notes", error);
  }
};

export const getAllNotes = async () => {
  try {
    let res = await axiosInstance.get("/allNotes");
    return res.data.data;
  } catch (error) {
    console.log("error in getting notes", error);
  }
};

// FIX: Added leading slash '/' so URL resolves correctly to /notes/:id instead of concatenating /notes:id
export const deleteNote = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
  } catch (error) {
    console.log("error in deleting notes", error);
  }
};


// FIX: Added leading slash '/' so URL resolves correctly to /notes/:id instead of concatenating /notes:id
export const updateNote = async (id, data) => {
  try {
    await axiosInstance.put(`/${id}`, data);
  } catch (error) {
    console.log("error in updating notes", error);
  }
};
