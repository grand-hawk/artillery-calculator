import Close from '@mui/icons-material/Close';
import Minimize from '@mui/icons-material/Minimize';
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
          paddingY: 0.5,
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

        <Box
          sx={{
            zIndex: 2,
            borderRadius: 4,
            '& > button': { borderRadius: 0 },
          }}
        >
          <IconButton
            size="sm"
            onClick={async () => {
              try {
                const { getCurrentWebviewWindow } = await import(
                  '@tauri-apps/api/webviewWindow'
                );
                const appWindow = getCurrentWebviewWindow();

                appWindow.minimize();
              } catch (error) {
                console.error(error);
              }
            }}
          >
            <Minimize />
          </IconButton>
          <IconButton
            size="sm"
            onClick={async () => {
              try {
                const { getCurrentWebviewWindow } = await import(
                  '@tauri-apps/api/webviewWindow'
                );
                const appWindow = getCurrentWebviewWindow();

                appWindow.close();
              } catch (error) {
                console.error(error);
              }
            }}
          >
            <Close />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
