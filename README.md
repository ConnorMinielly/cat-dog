# Cat-Dog!

A simple but complete API with with one job: take in any arbitrary JSON and return a version of it where all values of "dog" are replaced with "cat".

This API will not:

- replace "dog" in complex strings containing the word "dog" (e.g. "the dog runs" wont become "the cat runs")
- replace any json keys (e.g. {dog: "example"} will not become {cat: "example"})
