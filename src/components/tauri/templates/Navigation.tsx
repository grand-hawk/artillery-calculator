import Close from '@mui/icons-material/Close';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import React from 'react';

export default function Navigation() {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          height: '100%',
          width: '100%',

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingX: 1.5,
        }}
      >
        <Box>
          <Box
            data-tauri-drag-region
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 1,
            }}
          />

          <Typography level="title-sm">
            Artillery<Typography level="body-sm">-</Typography>calculator
            <Typography level="body-sm">.com</Typography>
          </Typography>
        </Box>

        <IconButton
          size="sm"
          sx={{
            borderRadius: 0,
            height: '100%',
            zIndex: 2,
          }}
          onClick={async () => {
            // window cant be imported top-level for some reason, even with "use client"
            const { appWindow } = await import('@tauri-apps/api/window');
            appWindow.close();
          }}
        >
          <Close />
        </IconButton>
      </Box>
    </Box>
  );
}
