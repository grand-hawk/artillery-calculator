import Link from '@mui/joy/Link';
import React from 'react';

export default function DownloadOverlayCardLink() {
  return (
    <Link href={process.env.NEXT_PUBLIC_DOWNLOAD_OVERLAY_URL}>
      {new URL(process.env.NEXT_PUBLIC_DOWNLOAD_OVERLAY_URL!).hostname}
    </Link>
  );
}
