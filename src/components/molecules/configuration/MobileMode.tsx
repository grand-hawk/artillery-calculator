import Button from '@mui/joy/Button';
import React from 'react';

export type MobileModes = 'gun' | 'target';
export type MobileModeMutable = React.MutableRefObject<MobileModes>;

export default function MobileMode({
  mobileMode,
}: {
  mobileMode: MobileModeMutable;
}) {
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
      Switch selection to {visual === 'gun' ? 'target' : 'gun'}
    </Button>
  );
}
