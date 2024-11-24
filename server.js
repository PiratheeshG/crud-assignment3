const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");

dotenv.config({ path: "./config/config.env" });

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// View Engine
app.set("view engine", "ejs");

// Database Connection
mongoose
  .connect(process.env.mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Database connection error:", err));

// Routes
app.use("/milestones", require("./routes/milestone-routes"));

// Home Route
app.get("/", (req, res) => {
  res.render("layouts/main", { content: "index" }); // Dynamically include index.ejs
});

// Start Server
const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
