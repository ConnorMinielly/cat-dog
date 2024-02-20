import express from "express";
import recursiveReplace from "./replace";

const app = express();

app.use(express.json());

// Cat-Dog API - ALL - Give a more useful unsupported method message response.
app.all("/", (req, res, next) => {
  if (!["POST", "GET", "HEAD"].includes(req.method)) {
    res
      .status(501)
      .send(
        `🔴 Unsupported ${req.method} HTTP Method (POST to this endpoint to swap 'dog' values with 'cat')`
      );
  }
  next();
});

// Cat-Dog API - GET - Gives a basic health check response.
app.get("/", (req, res, next) => {
  res
    .status(200)
    .send(
      "🟢 Cat-Dog Server Live! (POST to this endpoint to swap 'dog' values with 'cat')"
    );
  next();
});

// Cat-Dog API - POST - Takes a json and returns a copy with all instances of the value "dog" replaced with "cat".
app.post("/", (req, res, next) => {
  const updatedMessage = recursiveReplace(req.body, "dog", "cat");
  res.status(200).send(updatedMessage);
  next();
});

export default app;
