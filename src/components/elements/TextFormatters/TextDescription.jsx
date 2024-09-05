import React from 'react';

const TextDescription = ({ text }) => {
  // Форматуємо текст
  const formatTextWithLineBreaks = (text) => {
    // Замінюємо всі нові рядки на <br> для HTML
    return text.replace(/\n/g, '<br />');
  };
  
  const formattedText = formatTextWithLineBreaks(text);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: formattedText }}
    />
  );
};

export default TextDescription;
