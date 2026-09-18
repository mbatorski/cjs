

export const _CSSRangeRule = {
   processSelector(selector: string, dimension: "width" | "height" = "width") {
        const parts = selector.split(" ");
        const determiner = parts[1];
        const value = parts[2];
        const mapping: Record<string, string> = {};
        const valueParts = (() => {
            let number = "";
            let unit = "";

            for (const char of value.split("")) {
                if (isNaN(Number(char))) unit += char;
                else number += char;
            }

            return { number: parseInt(number), unit };
        })();

        const { number, unit } = valueParts;

        mapping["<"] = `max-${dimension}: ${number - 1}${unit}`;
        mapping["<="] = `max-${dimension}: ${number}${unit}`;
        mapping[">"] = `min-${dimension}: ${number + 1}${unit}`;
        mapping[">="] = `min-${dimension}: ${number}${unit}`;

        return `@media only screen and (${
            mapping[determiner]
        })`
    }
}