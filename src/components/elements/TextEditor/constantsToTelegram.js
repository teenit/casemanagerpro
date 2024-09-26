
  export const toolbarModulesTelegram = {
    characterFormats: ["bold", "italic", "underline", "strike", "blockquote"],
  };
  
  export const formatsSettingsTelegram = {
    characterFormats: [
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "align"
    ],
  };
  
  export const formatsTelegram = [
    ...formatsSettingsTelegram.characterFormats,
  ];
  
  export const modulesTelegram = {
    toolbar: [
      toolbarModulesTelegram.characterFormats,
    ],
    clipboard: { matchVisual: true },
    history: {
      delay: 2000,
      maxStack: 100,
      userOnly: true
    }
  };