import assert from "node:assert";
import { describe, it } from "node:test";
import recursiveReplace from "../src/replace";

describe("Recursive replace function", () => {
  it("should replace a match string with a replacement string if the source content strictly equals the match", () => {
    const source = "dog";
    const match = "dog";
    const replacement = "cat";
    const result = recursiveReplace(source, match, replacement);

    assert.strictEqual(result, replacement);
  });

  it("should replace all instances of match in a flat json", () => {
    const source = {
      animal1: "cow",
      animal2: "dog",
      animal3: "fish",
      isAnimal: true,
    };
    const match = "dog";
    const replacement = "cat";
    const result = recursiveReplace(source, match, replacement);

    const expected = {
      animal1: "cow",
      animal2: "cat",
      animal3: "fish",
      isAnimal: true,
    };
    assert.deepEqual(result, expected);
  });

  it("should replace all instances of match in an array", () => {
    const source = ["cow", "dog", "fish", "dog"];
    const match = "dog";
    const replacement = "cat";
    const result = recursiveReplace(source, match, replacement);

    const expected = ["cow", "cat", "fish", "cat"];
    assert.deepEqual(result, expected);
  });

  it("should replace all instances of match in a complicated mixed json structure", () => {
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
    const match = "dog";
    const replacement = "cat";
    const result = recursiveReplace(source, match, replacement);

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
    assert.deepEqual(result, expected);
  });

  it("should NOT replace string values that contain match value in a longer string", () => {
    const source = "dogs are great!";
    const match = "dog";
    const replacement = "cat";
    const result = recursiveReplace(source, match, replacement);

    assert.strictEqual(result, source);
  });
});
