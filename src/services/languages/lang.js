import ua from './lang_ua';
import en from './lang_en';

const LANGUAGES = ['ua', 'en'];

export function getLanguage(){
  const languages = { ua, en }
  const activeLang = localStorage.getItem('currentLang') || 'ua';
  return languages[activeLang]
}

export function setLanguage(lang){
  let newLanguage = 'ua';
  
  if (LANGUAGES.indexOf(lang.toLowerCase()) !== -1) {
    newLanguage = lang.toLowerCase();
  }

  localStorage.setItem('currentLang', newLanguage);
  window.location.reload();
}