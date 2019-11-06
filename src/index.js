import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import languages from "./i18nResources/languages.js";
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: languages,
        lng: "en",
        fallbackLng: "en",
        keySeparator: false,
        interpolation: {
            escapeValue: false
        }
    });

ReactDOM.render(<App />, document.getElementById('root'));