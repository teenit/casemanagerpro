export function rgbToHex(rgbString) {
    const result = rgbString.match(/\d+/g);
    
    if (!result || result.length !== 3) {
        throw new Error('Invalid RGB string format');
    }

    const [r, g, b] = result.map(Number);

    const toHex = (component) => {
        const hex = component.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
