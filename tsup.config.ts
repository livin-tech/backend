import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src", "!src/**/__tests__/**", "!src/**/*.test.*"],
  splitting: false,
  sourcemap: true,
  clean: true,
  esbuildOptions(options, context) {
    options.assetNames = "assets/[name]";
  },
});
