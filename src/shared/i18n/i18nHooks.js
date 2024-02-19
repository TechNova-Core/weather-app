import i18n from "i18next";
import backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

export const i18nInit = (lang) => i18n
  .use(backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: lang,
    fallbackLng: 'en', // use en if detected longitude is not available
	keySeparator: false,
	react: { useSuspense: false},
  });