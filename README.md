# Cat-Dog!

A simple but complete API with with one job: take in any arbitrary JSON and return a version of it where all values of "dog" are replaced with "cat".

This project is a technical display of how I might implement a robust Node API (without using serverless tools like AWS's API Gateway that abstract the implementation of an API to a couple lines of config). It seeks to display a full back/mid-end solution with testing, a simple but refined DX, and a deploy solution all in place. This is a demo app that could be turned into a production scale express API with probably less than a day of work.

# Example

The API is deployed automatically on pushes to the main branch, and is available to make HTTP request to at:

https://cat-dog-pejr.onrender.com/

so in your local terminal of choice you could run:

```bash
curl -X POST https://cat-dog-pejr.onrender.com --header "Content-Type: application/json" --header "Accept: application/json" --json '{"test": "dog"}'
```

and you'll receive a response of `{"test":"cat"}`

Alternatively you can clone this repository and run `docker compose up --build` to build and run the API locally in a docker container.

> NOTE: If the live endpoint takes a long time to respond, its because it will spin down when inactive. First requests might take as long as a minute due to cold starting, subsequent requests should be near instant however.

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

# Infrastructure Choices

As mentioned this demo app is "complete" in the sense that it has a full infrastructure setup, with testing and automatic builds and deploys. This is a very basic explanation of which tools were chosen:

Code:

- I used express as the API server framework, because it's tried and true and entirely reliable.
- I setup eslint and prettier for an seamless DX, using the simplified modern plugins to get eslint, prettier, and typescript all working together nicely (which used to be a real pain but is very easier now).

Testing:

- For the the core test runner I chose to use Node.js's new built-in testing tools, as I think they're fantastic and super simple and easy to use and the future of JS unit testing.
- I used `supertest` to enable unit testing of actual API requests, as opposed to setting up a more extensive tool like Postman for such a simple API.
- I also used node's built in code coverage reporter (so glad they're finally building these essential tools into the platform).

Build:

- I used `esbuild` in order to build the project because of it's lightning fast execution time and first class Typescript support, `esbuild` make building small projects like this almost instant.

Deploy:

- I used Docker to containerize this app and make it super portable, so that I can deploy it anywhere or easily test it locally.
- GitHub actions will run and confirm the automated tests on push to the `main` main branch and then trigger the docker deploy if they pass.
- [Render](https://render.com/) is used to host the docker container, with the deploys triggered by the afore mentioned GitHub Actions.

# Areas For Improvement

- Most production API's should include some sort of authentication, or at the very least rate limiting rules to prevent abuse.
- The CI/CD process could be improved a bit, with better test reporting and tracking of deploys.
- Could gracefully handle a larger variety error edge cases, like malformed JSON requests.
- Additionally if this was a real production API i'd have some kind of API version in the path, something like `https://cat-dog-pejr.onrender.com/v1/` to support future API versioning.
