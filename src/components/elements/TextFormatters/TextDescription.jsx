import React from 'react';

const TextDescription = ({ text }) => {
  const formatText = text;
  // Форматуємо текст
  const formatTextWithLineBreaks = (formatText) => {
    // Замінюємо всі нові рядки на <br> для HTML
    if (!formatText) return formatText
    return formatText.replace(/\n/g, '<br />').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  };
  
  const formattedText = formatTextWithLineBreaks(formatText);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: formattedText }}
    />
  );
};

export default TextDescription;
