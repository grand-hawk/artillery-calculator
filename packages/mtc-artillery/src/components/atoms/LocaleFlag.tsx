import Box from '@mui/joy/Box';

import SmallFlag from '@/components/atoms/Flag';

export default function LocaleFlag({ locale }: { locale: string }) {
  const countryCode = locale.split('-')[1].toLowerCase();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <SmallFlag code={countryCode} />
      </Box>
    </Box>
  );
}
