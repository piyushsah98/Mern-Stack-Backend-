const express = require("express");
const connectDb = require("./config/db");
const NotesModel = require("./models/notes.model");

const app = express();
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
  res.send("okay got it");
});

app.get("/getNotes", async (req, res) => {
  const allNotes = await NotesModel.find();

  res.send({
    success: true,
    message: "found all notes",
    data: allNotes,
  });
});

app.post("/create", async (req, res) => {
  let { title, description } = req.body;

  const newNote = await NotesModel.create({
    title,
    description,
  });

  res.send({
    success: true,
    message: "Note created succesfully",
    data: newNote,
  });
});

app.put("/update/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let body = req.body;

    await NotesModel.findByIdAndUpdate(id, body, {
      new: true, // Return the document AFTER updates are applied
      runValidators: true, // Ensure the update respects schema validations
    });

    res.send({
      success: true,
      message: "note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.delete("/delete/:id", async (req, res) => {
  let { id } = req.params;

  await NotesModel.findByIdAndDelete(id);

  res.send({
    success: true,
    message: "note deleted successfully",
  });
});

module.exports = app;
