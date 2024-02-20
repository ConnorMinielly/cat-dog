# Cat-Dog!

A simple but complete API with with one job: take in any arbitrary JSON and return a version of it where all values of "dog" are replaced with "cat".

This project is a technical display of how I might implement a robust Node API (without using serverless tools like AWS's API Gateway that abstract the implementation of an API to a couple lines of config). It seeks to display a full back/mid-end solution with testing, a simple but refined DX, and a deploy solution all in place. This is a demo app that could be turned into a production scale express API with probably less than a day of work.

# The API

As mentioned this is a simple API with only one action at the root path: it swaps any value of "dog" with the value "cat" in any arbitrary JSON structure posted to it, and then returns the structure with said values swapped.

This API will:

- Accept a `POST` with JSON content.
- be implemented in Typescript.
- have full unit test coverage.

This API will not:

- replace "dog" in complex strings containing the word "dog" (e.g. "the dog runs" wont become "the cat runs").
- replace any json keys (e.g. `{dog: "example"}` will not become `{cat: "example"}`).
- support any HTTP verbs other than `POST`.
- support complex error handling, rate limiting, or authentication (though those things could be implemented with ease via Express middlewares).

# Areas For Improvement

- Most production API's should include some sort of authentication, or at the very least rate limiting rules to prevent abuse.
- The CI/CD process could be improved a bit, with better test reporting and tracking of deploys.
