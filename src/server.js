// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import categoryRoute from "./routes/categoriesRoute.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import adminStatsRoute from "./routes/adminStats.js";
import profileRoute from "./routes/profile.js";

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

// user route
app.use("/api", userRoute);

// category route
app.use("/api", categoryRoute);

// product route
app.use("/api", productRoute);

// cart route
app.use("/api", cartRoute);

// profile route
app.use("/api", profileRoute);

// admin stats route
app.use("/api", adminStatsRoute);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
