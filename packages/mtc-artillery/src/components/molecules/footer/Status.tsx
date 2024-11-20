import Box from '@mui/joy/Box';
import { useTranslations } from 'next-intl';

import Circle from '@/components/atoms/Circle';
import Link from '@/components/atoms/footer/Link';

export default function Status() {
  const t = useTranslations();

  const url = process.env.NEXT_PUBLIC_STATUS_URL;

  return (
    url && (
      <Box
        sx={{
          display: 'flex',
          gap: 'inherit',
        }}
      >
        {(process.env.NEXT_PUBLIC_DISCORD_URL ||
          process.env.NEXT_PUBLIC_GITHUB_URL) && (
          <Circle
            sx={(theme) => ({
              height: 4,
              width: 4,
              backgroundColor: theme.palette.neutral.solidBg,
            })}
          />
        )}

        <Link data-umami-event="Status" href={url}>
          {t('typography.status')}
        </Link>
      </Box>
    )
  );
}
