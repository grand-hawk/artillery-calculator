import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import React from 'react';

import Flag from '@/components/molecules/languageSelector/Flag';
import ScrollBox from '@/components/molecules/ScrollBox';
import config from '@/i18n/config.json';

export default function LanguageSelector() {
  const t = useTranslations();

  const router = useRouter();

  const [listboxOpen, setListboxOpen] = React.useState<boolean>(false);

  return (
    <Select
      value={router.locale}
      onChange={(event, newValue) => {
        router.push('/', '/', { locale: newValue || config.defaultLocale });
      }}
      slotProps={{
        listbox: {
          placement: 'top-end',
        },
      }}
      listboxOpen={listboxOpen}
      onListboxOpenChange={() => setListboxOpen(true)}
      onClose={() => setListboxOpen(false)}
      variant="outlined"
      size="sm"
      startDecorator={<Flag locale={router.locale!} />}
    >
      <ScrollBox dependency={listboxOpen}>
        {Object.keys(config.locales).map((locale, index) => (
          <Option key={index} value={locale}>
            <Flag locale={locale} /> {t(`languages.${locale}`)}
          </Option>
        ))}
      </ScrollBox>
    </Select>
  );
}
