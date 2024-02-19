import express from "express";

const app = express();

// Cat-Dog API root - takes a json and returns a copy with all instances of the value "dog" replaced with "cat"
app.post("/", (req, res) => {
  res.status(200).send("All good!");
});

export default app;
