import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import astroExpressiveCode from 'astro-expressive-code';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import icon from "astro-icon";
import react from "@astrojs/react";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Font from 'vite-plugin-font';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

import mermaid from './src/plugins/mermaid.mjs';
import rehypeLazyLoadImage from './src/plugins/lazyLoadImage.mjs';

const require = createRequire(import.meta.url);

function getFontPlugin() {
  try {
    const cnPkg = require.resolve('cn-font-split/package.json');
    const distDir = path.join(path.dirname(cnPkg), 'dist');
    const platform = process.platform;
    const arch = process.arch;

    let binName = '';
    if (platform === 'linux') {
      binName = arch === 'arm64' ? 'libffi-aarch64-unknown-linux-gnu.so' : 'libffi-x86_64-unknown-linux-gnu.so';
    } else if (platform === 'win32') {
      binName = arch === 'arm64' ? 'libffi-aarch64-pc-windows-msvc.dll' : 'libffi-x86_64-pc-windows-msvc.dll';
    } else if (platform === 'darwin') {
      binName = arch === 'arm64' ? 'libffi-aarch64-apple-darwin.dylib' : 'libffi-x86_64-apple-darwin.dylib';
    }

    const binPath = binName ? path.join(distDir, binName) : '';
    const hasBinary =
      (binPath && fs.existsSync(binPath) && fs.statSync(binPath).size > 0) ||
      Boolean(process.env.CN_FONT_SPLIT_BIN);

    if (hasBinary) {
      return Font.vite({
        scanFiles: ['src/**/*.{ts,tsx,js,jsx,md,mdx,astro,yml}']
      });
    }

    console.warn(`[vite-plugin-font] Native binary (${binName || platform}) not found. Enabling fallback font plugin.`);
  } catch (err) {
    console.warn(`[vite-plugin-font] Error detecting native binary: ${err.message}. Enabling fallback font plugin.`);
  }

  return {
    name: 'vite-plugin-font-fallback',
    enforce: 'pre',
    resolveId(id) {
      if (/\.(ttf|otf|woff2?)(\?.*)?$/.test(id)) {
        return id;
      }
    },
    load(id) {
      if (/\.(ttf|otf|woff2?)(\?.*)?$/.test(id)) {
        return `export const css = { family: "LXGW WenKai Screen" }; export default css;`;
      }
    }
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://leminhnoz.github.io',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeLazyLoadImage],
    syntaxHighlight: false
  },
  integrations: [mermaid(), astroExpressiveCode({
    // You can use any of the themes bundled with Shiki by name,
    // specify a path to JSON theme file, or pass an instance
    // of the `ExpressiveCodeTheme` class here:
    themes: ['github-light', 'github-dark'],
    useDarkModeMediaQuery: false,
    themeCssSelector: (theme) => `[data-theme='${theme.type}']`,
    shiki: {
      // You can pass additional plugin options here,
      // e.g. to load custom language grammars:
      langs: [
        // import('./some-exported-grammar.mjs'),
        // JSON.parse(fs.readFileSync('./some-json-grammar.json', 'utf-8'))
      ]
    },
    plugins: [pluginCollapsibleSections(), pluginLineNumbers()]
  }), mdx(), sitemap(), icon(), react()],
  vite: {
    plugins: [
      getFontPlugin(),
    ]
  }
});
