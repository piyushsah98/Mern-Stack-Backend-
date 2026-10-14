const express = require("express");
const {
  createNotesController,
  getAllNotesController,
  getSingleNoteController,
  updateSingleNoteController,
  deleteNoteController,
} = require("../controllers/notes.controllers");

const router = express.Router();

// Create
router.post("/create", createNotesController);

// Get all notes
router.get("/allNotes", getAllNotesController);

// Get a single note
router.get("/:id", getSingleNoteController);

// Update a single note
router.put("/:id", updateSingleNoteController);

// Delete a single note
router.delete("/:id", deleteNoteController);

module.exports = router;
