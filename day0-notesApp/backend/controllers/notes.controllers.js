const NotesModel = require("../models/notes.model");

const createNotesController = async (req, res) => {
  try {
    let { title, description } = req.body;

    const newNote = await NotesModel.create({
      title,
      description,
    });

    return res.status(201).json({
      message: "Notes created successfully",
      data: newNote,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllNotesController = async (req, res) => {
  try {
    const allNotes = await NotesModel.find();

    return res.status(200).json({
      message: "All notes fetched",
      data: allNotes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getSingleNoteController = async (req, res) => {
  try {
    let Id = req.params.id;

    const Note = await NotesModel.findById(Id);

    return res.status(200).json({
      message: "Note fetched successfully",
      data: Note,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateSingleNoteController = async (req, res) => {
  try {
    let Id = req.params.id;
    let body = req.body;

    await NotesModel.findByIdAndUpdate(Id, body);

    return res.status(200).json({
      message: "updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteNoteController = async (req, res) => {
  try {
    let Id = req.params.id;

    await NotesModel.findByIdAndDelete(Id);

    return res.status(200).json({
      message: "deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createNotesController,
  getAllNotesController,
  getSingleNoteController,
  updateSingleNoteController,
  deleteNoteController,
};
