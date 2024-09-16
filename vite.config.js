import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteCommonjs, esbuildCommonjs } from "@originjs/vite-plugin-commonjs";

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/xboard/' : '',
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
  },

  resolve: {
    alias: {
      "@": "/src",
      "@utils": "/src/utils",
      "@i18n": "/src/i18n",
      "@layouts": "/src/layouts",
      "@assets": "/src/assets",
      "@Store": "/src/Store",
      "@Components": "/src/Components",
      "@Main": "/src/Screens/Main",
      "@Hooks": "/src/Hooks",
      "@constants": "/src/utils/constants",
    },
  },
  build: {
    //outDir: "build", // default: dist
    outDir: "dist", // default: dist
    sourcemap: true,

    commonjsOptions: {
      include: [/node_modules/],
      extensions: [".js", ".cjs"],
      strictRequires: true,
      // https://stackoverflow.com/questions/62770883/how-to-include-both-import-and-require-statements-in-the-bundle-using-rollup
      transformMixedEsModules: true,
    },
  },

  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(["react-s3"])],
    },
  },
});
