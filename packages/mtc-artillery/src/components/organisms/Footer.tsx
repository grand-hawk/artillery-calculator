import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { mergeSx } from 'merge-sx';
import { useMediaQuery } from 'usehooks-ts';

import SettingsToggle from './footer/SettingsToggle';
import DataContainer from '../atoms/DataContainer';
import Link from '@/components/atoms/footer/Link';
import BMACIcon from '@/components/atoms/icons/BMAC';
import DiscordIcon from '@/components/atoms/icons/Discord';
import GitHubIcon from '@/components/atoms/icons/GitHub';
import Status from '@/components/molecules/footer/Status';
import LanguageSelector from '@/components/organisms/LanguageSelector';
import useIsSmallScreen from '@/hooks/useIsSmallScreen';

import type { SxProps } from '@mui/joy/styles/types';

function Footer({ version, sx = {} }: { version: string; sx?: SxProps }) {
  const isSmallScreen = useIsSmallScreen();
  const isSuperSmallScreen = useMediaQuery('(max-width: 450px)');

  return (
    <Box
      sx={mergeSx(
        {
          display: 'flex',
          flexDirection: 'row',
          gap: 1,

          marginTop: 'auto',
          alignItems: 'center',
          justifyContent: 'space-between',

          width: isSmallScreen ? '100%' : 'unset',

          ...(isSuperSmallScreen && {
            flexDirection: 'column',
            alignItems: 'stretch',

            '& > div:last-child': {
              justifyContent: 'space-between',
            },
          }),
        },
        sx,
      )}
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

        <Status />
      </Box>

      <DataContainer>
        <DataContainer>
          <SettingsToggle />

          <LanguageSelector />
        </DataContainer>

        <Typography
          component="code"
          level="body-sm"
          sx={(theme) => ({
            fontFamily: theme.fontFamily.code,
            marginX: 1,
          })}
        >
          {version}
        </Typography>
      </DataContainer>
    </Box>
  );
}

export default Footer;
