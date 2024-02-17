import express from "express";

const app = express();

app.post("/", (req, res) => {
  res.status(200).send("All good!");
});

export default app;
