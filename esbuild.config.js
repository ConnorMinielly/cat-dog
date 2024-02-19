import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  outfile: "./build/app.js",
  minify: true,
  format: "esm",
  target: "esnext",
  platform: "node",
  banner: {
    js: "import { createRequire } from 'module';const require = createRequire(import.meta.url);", // This is required to fix an issue with building some node std lib stuff for ESM
  },
  outExtension: {
    ".js": ".mjs",
  },
});
