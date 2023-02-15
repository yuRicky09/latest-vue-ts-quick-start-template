import { fileURLToPath, URL } from "url";
import svgLoader from "vite-svg-loader";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    Components({
      dts: "./src/declaration/components.d.ts",
      resolvers: [IconsResolver()],
      dirs: ["src/components", "src/layout"],
    }),
    AutoImport({
      dts: "./src/declaration/auto-imports.d.ts",
      dirs: ["./src/composables", "./src/stores", "./src/utils"],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: ["vue", "vue-router", "pinia"],
      eslintrc: {
        enabled: true,
      },
    }),
    Icons({ compiler: "vue3" }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",

        assetFileNames: ({ name }) => {
          if (/\.(jpe?g|png|svg|gif)$/.test(name ?? "")) {
            return "assets/images/[name]-[hash][extname]";
          }

          if (/\.(css$)/.test(name ?? "")) {
            return "assets/css/[name]-[hash][extname]";
          }

          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
