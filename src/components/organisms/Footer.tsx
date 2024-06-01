import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { mergeSx } from 'merge-sx';

import Link from '@/components/atoms/footer/Link';
import BMACIcon from '@/components/atoms/icons/BMAC';
import DiscordIcon from '@/components/atoms/icons/Discord';
import GitHubIcon from '@/components/atoms/icons/GitHub';

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
      <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
        <Link href="https://discord.gg/yHbVdPJ5vf">
          <DiscordIcon />
        </Link>

        <Link href="https://github.com/ari-party/mtc-artillery">
          <GitHubIcon />
        </Link>

        <Link href="https://www.buymeacoffee.com/valk">
          <BMACIcon />
        </Link>
      </Stack>

      <Typography
        level="body-sm"
        component="code"
        sx={(theme) => ({ fontFamily: theme.fontFamily.code })}
      >
        {version}
      </Typography>
    </Stack>
  );
}

export default Footer;
