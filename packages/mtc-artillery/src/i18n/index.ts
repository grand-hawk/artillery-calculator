// https://next-intl-docs.vercel.app/docs

import common from './common.json';
import config from './config.json';
import deDE from '@/i18n/locales/de-DE.json';
import enUS from '@/i18n/locales/en-US.json';
import esES from '@/i18n/locales/es-ES.json';
import nlNL from '@/i18n/locales/nl-NL.json';
import plPL from '@/i18n/locales/pl-PL.json';
import ruRU from '@/i18n/locales/ru-RU.json';
import thTH from '@/i18n/locales/th-TH.json';
import ukUA from '@/i18n/locales/uk-UA.json';
import viVN from '@/i18n/locales/vi-VN.json';
import ltLT from '@/i18n/locales/lt-LT.json';

export type LocaleDictionary = string | { [key: string]: LocaleDictionary };

const locales: Record<string, LocaleDictionary> = {
  'de-DE': deDE,
  'en-US': enUS,
  'es-ES': esES,
  'nl-NL': nlNL,
  'pl-PL': plPL,
  'ru-RU': ruRU,
  'th-TH': thTH,
  'uk-UA': ukUA,
  'vi-VN': viVN,
  'lt-LT': ltLT
};

// add the data in common to all locales
for (const locale of Object.keys(locales))
  Object.assign(locales[locale]!, common);

export default locales;

export { config };
