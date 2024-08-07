import type { ConfigEnv, UserConfig } from "vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { pluginExposeRenderer } from "./vite.base.config";

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
      outDir: `.vite/renderer/${name}`,
    },
    plugins: [tsconfigPaths(), pluginExposeRenderer(name)],
    resolve: {
      preserveSymlinks: true,
    },
    clearScreen: false,
  };

  return config;
});
