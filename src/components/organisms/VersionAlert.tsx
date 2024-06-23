import { useTranslations } from 'next-intl';
import React from 'react';

import HeaderCard from '@/components/atoms/HeaderCard';
import getRemoteVersion from '@/lib/client/getRemoteVersion';

export default function VersionAlert({
  currentVersion,
}: {
  currentVersion: string;
}) {
  const t = useTranslations();

  const [updateAvailable, setUpdateAvailable] = React.useState<boolean>(false);

  React.useEffect(() => {
    // dont bother if development mode
    if (process.env.NODE_ENV === 'development') return;

    const interval = setInterval(
      async () => {
        const remoteVersion = await getRemoteVersion();

        if (remoteVersion && remoteVersion !== currentVersion)
          setUpdateAvailable(true);
      },
      60 * 2 * 1_000,
    );

    return () => clearInterval(interval);
  });

  return (
    updateAvailable && (
      <HeaderCard color="warning" variant="solid">
        {t('typography.newVersion')}
      </HeaderCard>
    )
  );
}
