import React from 'react';

import { GunsContext } from '@/components/providers/GunsProvider';

export default function useGuns() {
  return React.useContext(GunsContext);
}
