import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import translationEnglish from './locales/en';
import translationPolish from './locales/pl';

const resources =
{
    en: {translation: translationEnglish},
    pl: {translation: translationPolish}
};

const DETECTION_OPTIONS = {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage']
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
            detection: DETECTION_OPTIONS,
            resources,
            fallbackLng: "pl",
            interpolation: {escapeValue: false},
         });

export default i18n;

