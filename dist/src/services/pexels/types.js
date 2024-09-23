function assertHexColor(value) {
    var hexRegex = /^#([0-9a-fA-F]{2}){3}$/;
    if (!hexRegex.test(value)) {
        throw new Error("".concat(value, " is not a valid hexadecimal color code."));
    }
}
export { };
