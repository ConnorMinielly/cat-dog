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
    js: "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
  },
  outExtension: {
    ".js": ".mjs",
  },
});
