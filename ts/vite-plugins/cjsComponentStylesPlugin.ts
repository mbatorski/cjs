import type { Plugin } from "vite";
import path from "path";
import fs from "fs";

const StylesDirectory = "_styles";

/**
 * Bundles component styles at build time, so they are available synchronously on the first render.
 *
 * For every `<FileName>.ts` that declares `class <FileName> extends CjsComponent` and has a sibling
 * `./_styles/<FileName>.css`, the css is imported as raw text and assigned to `<FileName>._bundledCss`.
 *
 * Files that already set `_bundledCss` themselves are left untouched.
 */
export default function cjsComponentStylesPlugin(): Plugin {
    return {
        name: "cjs-component-styles",
        enforce: "pre",

        transform(code, id) {
            const filePath = id.split("?")[0];

            if (!filePath.endsWith(".ts") || filePath.includes("/node_modules/")) return;
            if (code.includes("_bundledCss")) return;

            const className = path.basename(filePath, ".ts");
            const classDeclaration = new RegExp(`\\bclass\\s+${className}\\s+extends\\s+CjsComponent\\b`);

            if (!classDeclaration.test(code)) return;

            const cssPath = path.join(path.dirname(filePath), StylesDirectory, `${className}.css`);

            if (!fs.existsSync(cssPath)) return;

            const injected = [
                `import __cjsBundledCss from "./${StylesDirectory}/${className}.css?raw";`,
                `${className}._bundledCss = __cjsBundledCss;`,
            ].join("\n");

            return {
                code: `${code}\n${injected}\n`,
                map: null,
            };
        },
    };
}
