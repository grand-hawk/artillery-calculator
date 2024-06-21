import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import React from 'react';

import LocaleFlag from '@/components/atoms/LocaleFlag';
import ScrollBox from '@/components/molecules/ScrollBox';
import config from '@/i18n/config.json';

export default function LanguageSelector() {
  const t = useTranslations();

  const router = useRouter();

  const [listboxOpen, setListboxOpen] = React.useState<boolean>(false);

  return (
    <Select
      listboxOpen={listboxOpen}
      size="sm"
      slotProps={{
        listbox: {
          placement: 'top-end',
        },
      }}
      startDecorator={<LocaleFlag locale={router.locale!} />}
      value={router.locale}
      variant="outlined"
      onChange={(event, newValue) => {
        router.push('/', '/', { locale: newValue || config.defaultLocale });
      }}
      onClose={() => setListboxOpen(false)}
      onListboxOpenChange={() => setListboxOpen(true)}
    >
      <ScrollBox dependency={listboxOpen}>
        {config.locales.map((locale, index) => (
          <Option key={index} value={locale}>
            <LocaleFlag locale={locale} /> {t(`languages.${locale}`)}
          </Option>
        ))}
      </ScrollBox>
    </Select>
  );
}
