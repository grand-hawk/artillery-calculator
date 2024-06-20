import Close from '@mui/icons-material/Close';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';

export default function Navigation() {
  return (
    <Box
      data-tauri-drag-region
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: 1.5,
      }}
    >
      <Typography level="title-sm" sx={{ userSelect: 'none' }}>
        Artillery overlay
      </Typography>

      <IconButton
        size="sm"
        sx={{ borderRadius: 0, height: '100%' }}
        onClick={async () => {
          // window cant be imported top-level for some reason, even with "use client"
          const { appWindow } = await import('@tauri-apps/api/window');
          appWindow.close();
        }}
      >
        <Close />
      </IconButton>
    </Box>
  );
}
