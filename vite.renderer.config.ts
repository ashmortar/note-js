import type { ConfigEnv, UserConfig } from "vite";
import { defineConfig } from "vite";
import { pluginExposeRenderer } from "./vite.base.config";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<"renderer">;
  const { root, mode, forgeConfigSelf } = forgeEnv;
  const name = forgeConfigSelf.name ?? "";

  const config: UserConfig = {
    root,
    mode,
    base: "./",
    build: {
      target: "esnext",
      outDir: `.vite/renderer/${name}`,
    },
    plugins: [wasm(), topLevelAwait(), pluginExposeRenderer(name)],
    resolve: {
      preserveSymlinks: true,
    },
    clearScreen: false,
    esbuild: {
      supported: {
        "top-level-await": true,
      },
    },
  };

  return config;
});
