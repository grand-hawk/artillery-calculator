import React from 'react';

import HeaderCard from '@/components/atoms/HeaderCard';
import getRemoteVersion from '@/lib/client/getRemoteVersion';

export default function VersionAlert({
  currentVersion,
}: {
  currentVersion: string;
}) {
  const [updateAvailable, setUpdateAvailable] = React.useState<boolean>(false);

  React.useEffect(() => {
    const interval = setInterval(
      async () => {
        const remoteVersion = await getRemoteVersion();

        if (remoteVersion && remoteVersion !== currentVersion)
          setUpdateAvailable(true);
      },
      5 * 60 * 1_000,
    );

    return () => clearInterval(interval);
  });

  return (
    updateAvailable && (
      <HeaderCard variant="solid" color="warning">
        A new version has been published, refresh the page to apply it.
      </HeaderCard>
    )
  );
}
