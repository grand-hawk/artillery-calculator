import { useMediaQuery } from 'usehooks-ts';

import { theme } from '@/components/utils/Theme';

export default function useIsSmallScreen(): boolean {
  const isSmallScreen = !useMediaQuery(
    theme.breakpoints.up('md').replace('@media ', ''),
  );

  return isSmallScreen;
}
