import React from 'react';

export default function useArch() {
  const [arch, setArch] = React.useState<'x64' | 'arm' | null>(null);

  React.useEffect(() => {
    async function getArch() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgentData
      if (!navigator.userAgentData) return;

      const result = (await navigator.userAgentData.getHighEntropyValues([
        'architecture',
      ])) as Record<string, string>;

      const architecture = result.architecture.toLowerCase();
      if (architecture === 'x86') setArch('x64');
      else if (architecture === 'arm') setArch('arm');
    }

    getArch();
  });

  return arch;
}
