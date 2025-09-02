import postcssPresetEnv from "postcss-preset-env";
import postcssGlobalData from "@csstools/postcss-global-data";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const mediaFile = resolve(__dirname, "src/styles/media.tokens.css");

export default {
  plugins: [
    postcssGlobalData({ files: [mediaFile] }),
    postcssPresetEnv({
      stage: 3,
      features: { "custom-media-queries": true },
    }),
  ],
};
