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
    // when a new version was pushed to production
    // vercel will automatically replace the existing version on the production domain
    // with that in mind, we fetch the /api/version endpoint which always returns
    // the latest version production is on

    const interval = setInterval(async () => {
      const remoteVersion = await getRemoteVersion();

      if (remoteVersion && remoteVersion !== currentVersion)
        setUpdateAvailable(true);
    }, 60 * 1_000);

    return () => clearInterval(interval);
  });

  return (
    updateAvailable && (
      <HeaderCard variant="solid" color="warning">
        {t('typography.newVersion')}
      </HeaderCard>
    )
  );
}
