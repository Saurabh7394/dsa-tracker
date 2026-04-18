require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const startServer = async () => {
  await connectDB();   // ✅ WAIT for DB

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();