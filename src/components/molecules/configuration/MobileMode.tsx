import Button from '@mui/joy/Button';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useDataStore } from '@/stores/data';

export type MobileModes = 'gun' | 'target';

export default function MobileMode() {
  const t = useTranslations();

  const mobileMode = useDataStore((s) => s.mobileMode);
  const setMobileMode = useDataStore((s) => s.setMobileMode);

  return (
    <Button
      color="primary"
      size="lg"
      variant="solid"
      onClick={() => {
        setMobileMode(mobileMode === 'gun' ? 'target' : 'gun');
      }}
    >
      {t('typography.switchSelectionTo', {
        value:
          mobileMode === 'gun' ? t('typography.target') : t('typography.gun'),
      })}
    </Button>
  );
}
