import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';

export default function BlastRadiusSupport() {
  const message = 'This projectile has blast radius data';

  return (
    <Tooltip placement="top" size="sm" variant="plain" title={message}>
      <Typography color="success">*</Typography>
    </Tooltip>
  );
}
