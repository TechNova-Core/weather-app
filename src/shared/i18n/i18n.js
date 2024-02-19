import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from 'locales/en/translation.json';
import translationFA from 'locales/fa/translation.json';

const resources = {
	en: {translation: translationEN},
	fa: {translation: translationFA},
};
export const i18nInit = (lang) => i18n.use(initReactI18next).init({resources,longitude:lang,keySeparator: false,interpolation:{escapeValue: false}});
