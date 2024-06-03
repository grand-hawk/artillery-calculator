import Button from '@mui/joy/Button';
import { useTranslations } from 'next-intl';
import React from 'react';

export type MobileModes = 'gun' | 'target';
export type MobileModeMutable = React.MutableRefObject<MobileModes>;

export default function MobileMode({
  mobileMode,
}: {
  mobileMode: MobileModeMutable;
}) {
  const t = useTranslations();

  const [visual, setVisual] = React.useState<MobileModes>(mobileMode.current);

  return (
    <Button
      variant="solid"
      color="primary"
      size="lg"
      onClick={() => {
        mobileMode.current = mobileMode.current === 'gun' ? 'target' : 'gun';
        setVisual(mobileMode.current);
      }}
    >
      {t('typography.switchSelectionTo', {
        value: visual === 'gun' ? t('typography.target') : t('typography.gun'),
      })}
    </Button>
  );
}
