const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const path = require("path");
const blogRoutes = require("./routes/blogRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MongoDB Connection
const connectDatabase = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/blogDB";

  try {
    await mongoose.connect(mongoUri, {
      autoCreate: true,
    });
    console.log(`MongoDB connected successfully at ${mongoUri}`);
  } catch (err) {
    console.error(`MongoDB connection failed for ${mongoUri}`);
    console.error("Make sure your local MongoDB server is running, then start the app again.");
    console.error(err.message || err);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectDatabase();

  // Home Route
  app.use("/", blogRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
