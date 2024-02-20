import express, { Request, Response, NextFunction } from "express";
import recursiveReplace from "./replace";

const app = express();

app.use(express.json());

// Links structure to make the API more discoverable, loosely following HATEOAS REST principles (https://en.wikipedia.org/wiki/HATEOAS)
const links = [
  {
    href: "/",
    description: "POST to this endpoint to swap 'dog' values with 'cat'.",
    type: "POST",
  },
  {
    href: "/",
    description: "Returns a basic health check message for the Cat-Dog server.",
    type: "GET",
  },
];

// Cat-Dog API - ALL - Give a more useful unsupported method message response.
app.all("/", (req: Request, res: Response, next: NextFunction) => {
  if (!["POST", "GET", "HEAD"].includes(req.method)) {
    res.status(501).send({
      message: `🔴 Unsupported ${req.method} HTTP Method`,
      errorCode: 501,
      links,
    });
  }
  next();
});

// Cat-Dog API - GET - Gives a basic health check response.
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    message: "🟢 Cat-Dog Server Live!",
    links,
  });
});

// Cat-Dog API - POST - Takes a json and returns a copy with all instances of the value "dog" replaced with "cat".
app.post("/", (req: Request, res: Response, next: NextFunction) => {
  const updatedMessage = recursiveReplace(req.body, "dog", "cat");
  // excluding HATEOAS links from the return here for the sake of simplicity.
  res.status(200).send(updatedMessage);
});

// Cat-Dog API - GET - 404 route doesn't exist
app.get("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({
    message: `🔴 Route doesn't exist`,
    errorCode: 404,
    links,
  });
});

export default app;
