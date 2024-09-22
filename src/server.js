// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import categoryRoute from "./routes/categoriesRoute.js";

const app = express();
const port = 3000;

dotenv.config();
app.use(cors());
app.use(express.json());

connectDB();

// test route
app.get("/test", (req, res) => {
  return res.json({ message: "hello world" });
});

// category route
app.use("/api", categoryRoute);

// user route

// cart route

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
