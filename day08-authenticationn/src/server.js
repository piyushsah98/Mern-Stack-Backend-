import app from "./app/app.js";
import { config } from "./config/config.js";
import { connectToDB } from "./config/db.js";

try {
  await connectToDB();

  app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
  });
} catch (error) {
  console.error("Server failed to start:", error.message);
  process.exit(1);
}
