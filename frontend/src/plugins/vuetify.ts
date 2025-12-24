import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
import type { ThemeDefinition } from 'vuetify';
import { ja } from 'vuetify/locale';

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#1976D2',
  },
};

export const vuetify = createVuetify({
  locale: {
    locale: 'ja',
    fallback: 'en',
    messages: { ja },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: lightTheme,
    },
  },
});
