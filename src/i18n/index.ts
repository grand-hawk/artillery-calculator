// https://next-intl-docs.vercel.app/docs

import common from '@/i18n/common';
import deDE from '@/i18n/locales/de-DE.json';
import enUS from '@/i18n/locales/en-US.json';
import esES from '@/i18n/locales/es-ES.json';
import plPL from '@/i18n/locales/pl-PL.json';
import ruRU from '@/i18n/locales/ru-RU.json';
import ukUA from '@/i18n/locales/uk-UA.json';
import config from 'next.config.mjs';

const locales: Record<string, typeof enUS> = {
  'de-DE': deDE,
  'en-US': enUS,
  'es-ES': esES,
  'pl-PL': plPL,
  'ru-RU': ruRU,
  'uk-UA': ukUA,
};

for (const locale of Object.keys(locales))
  Object.assign(locales[locale]!, common);

export const defaultLocale = config.i18n?.defaultLocale;

export default locales;
