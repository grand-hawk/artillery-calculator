import { useMediaQuery } from 'usehooks-ts';

import { normalTheme } from '@/components/utils/Theme';

export default function useIsSmallScreen(): boolean {
  const isSmallScreen = !useMediaQuery(
    normalTheme.breakpoints.up('md').replace('@media ', ''),
  );

  return isSmallScreen;
}
