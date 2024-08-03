const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/user");
const postsRoutes = require("./routes/posts");

dotenv.config();

const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbUrl = process.env.MONGODB_URL;

mongoose
  .connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbUrl}`)
  .then(() => {
    console.log("Connected to MongoDB database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
      origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
