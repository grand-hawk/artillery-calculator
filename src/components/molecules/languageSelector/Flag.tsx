import Box from '@mui/joy/Box';

import SmallFlag from '@/components/atoms/SmallFlag';

export default function Flag({ locale }: { locale: string }) {
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
        <SmallFlag code={locale.split('-')[1]} />
      </Box>
    </Box>
  );
}
