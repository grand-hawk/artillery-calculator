import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/joy/IconButton';

import { useSettingsStateStore } from '@/stores/settings/state';

export default function SettingsToggle() {
  const open = useSettingsStateStore((s) => s.open);
  const setOpen = useSettingsStateStore((s) => s.setOpen);

  return (
    <IconButton size="sm" variant="outlined" onClick={() => setOpen(!open)}>
      <SettingsIcon />
    </IconButton>
  );
}
