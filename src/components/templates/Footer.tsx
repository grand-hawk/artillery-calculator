import Stack from '@mui/joy/Stack';
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
    <Stack
      direction="row"
      spacing={1}
      sx={mergeSx(sx, {
        marginTop: 'auto',
        alignItems: 'center',
        justifyContent: 'space-between',
      })}
    >
      <Stack alignItems="center" direction="row" spacing={0.75}>
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
      </Stack>

      <Stack alignItems="center" direction="row" spacing={2}>
        <LanguageSelector />

        <Typography
          component="code"
          level="body-sm"
          sx={(theme) => ({ fontFamily: theme.fontFamily.code })}
        >
          {version}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Footer;
