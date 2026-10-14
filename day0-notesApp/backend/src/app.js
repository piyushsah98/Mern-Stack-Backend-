const express = require("express");
const dbConnect = require("../config/db");
const notesRoute = require("../routes/notes.route");
const cors = require("cors");

const app = express();
dbConnect();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/", (req, res) => {
  res.send("respose 200");
});

app.use("/notes", notesRoute);

module.exports = app;
