import assert from "node:assert";
import { describe, it } from "node:test";
import request from "supertest";
import app from "../src/app";

const done = (err, res) => {
  if (err) throw err;
};

describe("cat-dog API", () => {
  it("should respond with a 200 code when receiving a POST or GET", () => {
    request(app).post("/").expect(200, done);
    request(app).get("/").expect(200, done);
  });

  it("should give a 501 unsupported status code for other methods.", () => {
    request(app).delete("/").expect(501, done);
  });

  it("should give a 404 unsupported status code for other methods.", () => {
    request(app).post("/test/").expect(404, done);
  });

  it("should replace values of 'dog' with 'cat' at the root level of a json structure", () => {
    const source = {
      animal1: "cow",
      animal2: "dog",
      animal3: "fish",
      isAnimal: true,
    };

    const expected = {
      animal1: "cow",
      animal2: "cat",
      animal3: "fish",
      isAnimal: true,
    };

    request(app)
      .post("/")
      .send(source)
      .expect(200, (err, res) => {
        if (err) throw err;
        assert.deepEqual(res.body, expected);
      });
  });

  it("should replace values of 'dog' with 'cat' nested deeply within a json structure", () => {
    const source = {
      yards: {
        front: "chicken",
        back: "dog",
      },
      barn: ["horse", "dog", "goat", "dog"],
      fields: {
        field1: ["cow", "dog"],
        field2: ["sheep", "dog", "sheep"],
      },
      kennel: "dog",
      nest: {
        nest: {
          nest: {
            nest: ["dog", "bird"],
          },
        },
      },
      numberOfAnimals: 14,
    };

    const expected = {
      yards: {
        front: "chicken",
        back: "cat",
      },
      barn: ["horse", "cat", "goat", "cat"],
      fields: {
        field1: ["cow", "cat"],
        field2: ["sheep", "cat", "sheep"],
      },
      kennel: "cat",
      nest: {
        nest: {
          nest: {
            nest: ["cat", "bird"],
          },
        },
      },
      numberOfAnimals: 14,
    };

    request(app)
      .post("/")
      .send(source)
      .expect(200, (err, res) => {
        if (err) throw err;
        assert.deepEqual(res.body, expected);
      });
  });

  it("should return json unchanged if no values match 'dog'", () => {
    const source = {
      yards: {
        front: "chicken",
        back: "goats",
      },
    };

    request(app)
      .post("/")
      .send(source)
      .expect(200, (err, res) => {
        if (err) throw err;
        assert.deepEqual(res.body, source);
      });
  });
});
