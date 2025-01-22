import { Quill } from 'react-quill';

// Додаємо кастомний список кольорів
export const LIST_OF_COLOURS = [
  "#0290D7", // Синій
  "#4D4D4D", // Темно-сірий
  "#999999", // Світло-сірий
  "#F44E3B", // Червоний
  "#FE9200", // Помаранчевий
  "#FCDC00", // Жовтий
  "#DBDF00"  // Зелений
];

// Розміри шрифтів
const FontSize = Quill.import('attributors/style/size');
FontSize.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '30px', '36px'];
Quill.register(FontSize, true);

// Налаштування модулів
export const modules = {
  toolbar: [
    [{ size: FontSize.whitelist }], // Розміри шрифтів
    ['bold', 'italic', 'underline', 'strike', 'blockquote'], // Стилі тексту
    [{ list: 'ordered' }, { list: 'bullet' }], // Списки
    [{ color: LIST_OF_COLOURS }, { background: LIST_OF_COLOURS }], // Кольори тексту та фону
    ['clean'], // Скидання стилів
  ],
  clipboard: { matchVisual: false },
  history: {
    delay: 2000,
    maxStack: 100,
    userOnly: true,
  },
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
];
