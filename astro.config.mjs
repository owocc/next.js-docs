// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeRapide from "starlight-theme-rapide";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from 'astro-auto-import';
// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [
        AutoImport({
            imports: [
                {
                    "./src/components/image.astro": [['default', 'Image']],
                }
            ]
        }),
        starlight({
            plugins: [starlightThemeRapide()],
            title: "Next Docs",
            social: [
                {
                    icon: "github",
                    label: "GitHub",
                    href: "https://github.com/withastro/starlight",
                },
            ],
            customCss: [
                './src/styles/global.css'
            ]
        }),
        mdx(),
    ],
});
