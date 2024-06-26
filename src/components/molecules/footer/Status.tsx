import Box from '@mui/joy/Box';

import Circle from '@/components/atoms/Circle';
import Link from '@/components/atoms/footer/Link';

export default function Status() {
  const url = process.env.NEXT_PUBLIC_STATUS_URL;

  return (
    url && (
      <Box
        sx={{
          display: 'flex',
          gap: 1,
        }}
      >
        <Circle
          sx={(theme) => ({
            height: 4,
            width: 4,
            backgroundColor: theme.palette.neutral.solidBg,
          })}
        />

        <Link data-umami-event="Status" href={url}>
          Status
        </Link>
      </Box>
    )
  );
}
