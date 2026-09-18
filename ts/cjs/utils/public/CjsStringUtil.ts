
const RandomCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const SafeRandomCharacters = "abcdefghijklmnopqrstuvwxyz0123456789"

export const CjsStringUtil = {
    getRandom(length: number, safeCharacters: boolean = true): string {
        let result = "";

        const characters = safeCharacters
            ? SafeRandomCharacters
            : RandomCharacters;
        const charactersLength = characters.length;

        let counter = 0;

        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }

        if(safeCharacters) {
            const isFirstCharacterANumber = (string: string): boolean => {
                return !isNaN(Number(string.substring(0, 1)));
            };

            while (isFirstCharacterANumber(result)) {
                result = this.getRandom(length, safeCharacters);
            }
        }

        return result;
    },
    /**
     * Provides similarity of two strings (float precision)
     * @author https://stackoverflow.com/users/6145207/overlord1234
     */
    getSimilarity(str1: string, str2: string): number {
        function editDistance(s1: string, s2: string) {
            s1 = s1.toLowerCase();
            s2 = s2.toLowerCase();

            let costs = new Array();

            for (let i = 0; i <= s1.length; i++) {
                let lastValue = i;

                for (let j = 0; j <= s2.length; j++) {
                    if (i == 0) {
                        costs[j] = j;
                    } else {
                        if (j > 0) {
                            let newValue = costs[j - 1];

                            if (s1.charAt(i - 1) != s2.charAt(j - 1)) {
                                newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                            }
                                
                            costs[j - 1] = lastValue;
                            lastValue = newValue;
                        
                        }
                    }
                }

                if (i > 0) {
                    costs[s2.length] = lastValue;
                }
                
            }

            return costs[s2.length];
        }

        let longer = str1;
        let shorter = str2;

        if (str1.length < str2.length) {
            longer = str2;
            shorter = str1;
        }
        
        let longerLength = longer.length;
        
        if (longerLength == 0) {
            return 1.0;
        }
        
        return (longerLength - editDistance(longer, shorter)) / parseFloat(`${longerLength}`);
    },
    /**
     * Creates a unique numeric ID from a string
     * (DJB2 hash)
     */
    getHash(string: string): number {

        let hash = 5381;

        for (let i = 0; i < string.length; i++) {
            const char = string.charCodeAt(i);
            hash = (hash * 33) ^ char;
        }

        return hash >>> 0; // force positive integer
    },
    /**
     * Remove HTML tags from the input, keeping inner content
     */
    removeHtmlTags(input: string): string {
        return input.replace(/<[^>]*>/g, "");
    },
    /**
     * Capitalizes first letter of the string
     */
    capitalize(value: string): string {
        if (!value) return value;

        return value.charAt(0).toUpperCase() + value.slice(1);
    },
    kebabCaseToCamelStyle(str: string): string {
        return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    },

    snakeStyleToCamelCase(str: string): string {
        return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    },

    camelStyleToKebabCase(str: string): string {
        return str.replace(/([A-Z])/g, "-$1").toLowerCase();
    },

    camelStyleToSnakeStyle(str: string): string {
        return str.replace(/([A-Z])/g, "_$1").toLowerCase();
    }
};