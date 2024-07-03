import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  base: "https://designedbydan.art/SWIFTVF/",
  plugins: [
    react(),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        postcssPresetEnv({ stage: 0 }), // Include all future CSS syntax features
      ],
    },
  },
});
