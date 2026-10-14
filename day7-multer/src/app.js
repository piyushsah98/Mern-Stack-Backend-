const express = require("express");
const fileRouter = require("./routes/file.route");

const app = express();
app.use(express.json());

app.use("/file", fileRouter);

module.exports = app;
