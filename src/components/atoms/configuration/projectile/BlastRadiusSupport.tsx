import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';

export default function BlastRadiusSupport() {
  return (
    <Tooltip
      placement="top"
      size="sm"
      variant="plain"
      title="This projectile has blast radius data"
    >
      <Typography color="success">*</Typography>
    </Tooltip>
  );
}
