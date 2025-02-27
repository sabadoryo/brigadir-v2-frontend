import { createI18n } from 'vue-i18n'

import en from './en.json'
import ru from './ru.json'

const savedLocale = localStorage.getItem("lang") || "ru";

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'ru',
  messages: {
    en,
    ru,
  },
})
