import app from "./app/app.js";
import { config } from "./config/config.js";
import { connectDB } from "./config/db.js";

const port = config.PORT;

await connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
