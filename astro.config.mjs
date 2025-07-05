// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeRapide from "starlight-theme-rapide";
import mdx from "@astrojs/mdx";
// https://astro.build/config
export default defineConfig({
    integrations: [
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
        }),
        mdx(),
    ],
});
