import i18n from 'i18next';

import { getTranslations } from './i18n-util';

// i18n translations configurations
i18n
  .init({
    resources: getTranslations(),
    lng: 'en',
    fallbackLng: 'en',
  }).catch(err => console.error('i18next init error', err));;

export default i18n;
