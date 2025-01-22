// export function invertColor(color) {
//     // Якщо колір у форматі HEX
//     if (color.startsWith("#")) {
//       let hex = color.replace("#", "");
  
//       // Якщо формат кольору короткий (наприклад, #FFF)
//       if (hex.length === 3) {
//         hex = hex.split('').map(char => char + char).join('');
//       }
  
//       // Перетворюємо шістнадцятковий колір у RGB
//       const r = parseInt(hex.substring(0, 2), 16);
//       const g = parseInt(hex.substring(2, 4), 16);
//       const b = parseInt(hex.substring(4, 6), 16);
  
//       // Інвертуємо кожен канал
//       const invertedR = (255 - r).toString(16).padStart(2, '0');
//       const invertedG = (255 - g).toString(16).padStart(2, '0');
//       const invertedB = (255 - b).toString(16).padStart(2, '0');
  
//       // Об'єднуємо інвертовані значення в форматі HEX
//       return `#${invertedR}${invertedG}${invertedB}`;
//     }
  
//     // Якщо колір у форматі rgb або rgba
//     if (color.startsWith("rgb")) {
//       // Витягуємо значення всередині дужок
//       const values = color.match(/\d+(\.\d+)?/g).map(Number);
  
//       // Інвертуємо канали R, G, B
//       const invertedR = 255 - values[0];
//       const invertedG = 255 - values[1];
//       const invertedB = 255 - values[2];
  
//       // Якщо це rgba, зберігаємо альфа-канал
//       if (color.startsWith("rgba")) {
//         const alpha = values[3];
//         return `rgba(${invertedR}, ${invertedG}, ${invertedB}, ${alpha})`;
//       }
  
//       return `rgb(${invertedR}, ${invertedG}, ${invertedB})`;
//     }
  
//     // Якщо формат кольору не підтримується
//     return null;
//   }
export function invertColor(color) {
  // Якщо колір у форматі HEX
  if (color.startsWith("#")) {
    let hex = color.replace("#", "");

    // Якщо формат кольору короткий (наприклад, #FFF)
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }

    // Перетворюємо шістнадцятковий колір у RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Розраховуємо відносну яскравість кольору
    const luminance = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);

    // Якщо яскравість більше 0.5, повертаємо чорний колір, інакше білий
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  }

  // Якщо колір у форматі rgb або rgba
  if (color.startsWith("rgb")) {
    // Витягуємо значення всередині дужок
    const values = color.match(/\d+(\.\d+)?/g).map(Number);
    const r = values[0];
    const g = values[1];
    const b = values[2];

    // Розраховуємо відносну яскравість кольору
    const luminance = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);

    // Якщо яскравість більше 0.5, повертаємо чорний колір, інакше білий
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  }

  // Якщо формат кольору не підтримується
  return null;
}
