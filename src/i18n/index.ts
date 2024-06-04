// https://next-intl-docs.vercel.app/docs

import common from '@/i18n/common';
import deDE from '@/i18n/locales/de-DE';
import enUS from '@/i18n/locales/en-US';
import ruRU from '@/i18n/locales/ru-RU';
import ukUA from '@/i18n/locales/uk-UA';
import config from 'next.config.mjs';

const locales: Record<string, typeof enUS> = {
  'de-DE': deDE,
  'en-US': enUS,
  'ru-RU': ruRU,
  'uk-UA': ukUA,
};

for (const locale of Object.keys(locales))
  Object.assign(locales[locale]!, common);

export const defaultLocale = config.i18n?.defaultLocale;

export default locales;
