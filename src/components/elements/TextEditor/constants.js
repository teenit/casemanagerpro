import { Quill } from 'react-quill';

// Додаємо кастомний список кольорів
export const LIST_OF_COLOURS = [
  "#F28B82", "#EA4335", "#C5221F",
  "#FBBC04", "#F29900", "#E37400",
  "#FFF475", "#FBC02D", "#E6C200",
  "#81C995", "#34A853", "#188038",
  "#78D9EC", "#00ACC1", "#007C91",
  "#8AB4F8", "#4285F4", "#174EA6",
  "#C58AF9", "#A142F4", "#681DA8",
  "#F48FB1", "#E91E63", "#880E4F",
  "#E0E0E0", "#9E9E9E", "#616161",
  "#FFFFFF", "#000000",
  "#FFD700", "#40E0D0", "#7B68EE",
  "#FFB6C1", "#708090", "#8B0000"
];

// Розміри шрифтів
const FontSize = Quill.import('attributors/style/size');
FontSize.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '30px', '36px'];
Quill.register(FontSize, true);


const defaultBindings = Quill.import('modules/keyboard').bindings;
console.log(defaultBindings)

// Налаштування модулів
export const modules = {
  toolbar: [
    [{ size: FontSize.whitelist }], // Розміри шрифтів
    ['bold', 'italic', 'underline', 'strike', 'blockquote'], // Стилі тексту
    [{ list: 'ordered' }, { list: 'bullet' }], // Списки
    [{ color: LIST_OF_COLOURS }, { background: LIST_OF_COLOURS }], // Кольори тексту та фону
    ['link'], 
    ['clean'], // Скидання стилів
  ],
  clipboard: { matchVisual: false },
  history: {
    delay: 2000,
    maxStack: 100,
    userOnly: true,
  },
   keyboard: {
      bindings: {
      list: null,
      list_bullet: null,
      list_ordered: null
    }
  }
};

// Дозволені формати
export const formats = [
  'header',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'color',
  'background',
  'link'
];
