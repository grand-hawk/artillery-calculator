import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { mergeSx } from 'merge-sx';

import Link from '@/components/atoms/footer/Link';
import BMACIcon from '@/components/atoms/icons/BMAC';
import DiscordIcon from '@/components/atoms/icons/Discord';
import GitHubIcon from '@/components/atoms/icons/GitHub';
import LanguageSelector from '@/components/organisms/LanguageSelector';

import type { SxProps } from '@mui/joy/styles/types';

function Footer({ version, sx = {} }: { version: string; sx?: SxProps }) {
  return (
    <Box
      sx={mergeSx(sx, {
        display: 'flex',
        flexDirection: 'row',
        gap: 1,

        marginTop: 'auto',
        alignItems: 'center',
        justifyContent: 'space-between',
      })}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 0.75,
        }}
      >
        <Link data-umami-event="Discord" href="https://discord.gg/yHbVdPJ5vf">
          <DiscordIcon />
        </Link>

        <Link
          data-umami-event="GitHub"
          href="https://github.com/ari-party/mtc-artillery"
        >
          <GitHubIcon />
        </Link>

        <Link
          data-umami-event="Buy Me A Coffee"
          href="https://www.buymeacoffee.com/valk"
        >
          <BMACIcon />
        </Link>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <LanguageSelector />

        <Typography
          component="code"
          level="body-sm"
          sx={(theme) => ({ fontFamily: theme.fontFamily.code })}
        >
          {version}
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
