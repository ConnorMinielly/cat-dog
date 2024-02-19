import assert from "node:assert";
import { describe, it } from "node:test";
import request from "supertest";
import app from "../src/app";

describe("cat-dog API", () => {
  it("should respond with a 200 code when receiving a POST with json content", () => {
    request(app)
      .post("/")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
      });
  });

  it.todo(
    "should give a standard rejection message for other verbs or routes."
  );

  it.todo(
    "should replace values of 'dog' with 'cat' at the root level of a json structure",
    () => {}
  );

  it.todo(
    "should replace values of 'dog' with 'cat' nested deeply within a json structure",
    () => {}
  );

  it.todo("should return json unchanged if no values match 'dog'", () => {});
});
