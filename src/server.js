import express from "express";

const app = express();
const port = 5173;

app.get("/test", (req, res) => {
  return res.json({ message: "hello world" });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
