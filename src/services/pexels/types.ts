type HexColor = string;
function assertHexColor(value: string): asserts value is HexColor {
    const hexRegex = /^#([0-9a-fA-F]{2}){3}$/;
    if (!hexRegex.test(value)) {
        throw new Error(`${value} is not a valid hexadecimal color code.`);
    }
}

export type Orientation = "portrait" | "landscape" | "square";
export type Size = "small" | "medium" | "large";
export type Color =
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "turquoise"
    | "blue"
    | "violet"
    | "pink"
    | "brown"
    | "black"
    | "grey"
    | "white"
    | HexColor;
export type Locale = string;

export type Photo = {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: HexColor;
    src: {
        original: string;
        large2x: string;
        large: string;
        medium: string;
        small: string;
        portrait: string;
        landscape: string;
        tiny: string;
    };
    liked: boolean;
    alt: string;
};
