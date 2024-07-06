import Link from '@mui/joy/Link';
import React from 'react';

export default function OverlayCardLink({
  renderText,
}: {
  renderText: () => React.ReactNode;
}) {
  return (
    <Link href="https://download.artillery-calculator.com" target="_blank">
      {renderText()}
    </Link>
  );
}
