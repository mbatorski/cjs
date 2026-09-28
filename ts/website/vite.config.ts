import { defineConfig } from "vite";
import path from "path";
import fs from "fs";
import cjsComponentStylesPlugin from "../vite-plugins/cjsComponentStylesPlugin";

export default defineConfig({
  plugins: [
    cjsComponentStylesPlugin(),
    {
      // Assets are referenced at runtime (e.g. svg("pen") -> "src/assets/svg/pen.svg"), so they are copied as they are
      name: 'copy-runtime-assets',
      apply: 'build',
      closeBundle() {
        fs.cpSync(path.join(__dirname, "src/assets"), path.join(__dirname, "dist/src/assets"), { recursive: true });
      }
    }
  ],
  resolve: {
    alias: {
      cjs: path.resolve(__dirname, "./lib/cjs.mjs") // map "cjs" → your lib file
    }
  },
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});