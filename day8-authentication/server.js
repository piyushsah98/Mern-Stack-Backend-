import dotenv from "dotenv";
import app from "./src/app/app.js";
import { connectDB } from "./src/config/db.js";

dotenv.config();

await connectDB();

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
