import { Typography } from '@mui/joy';

export default function Kbd({
  renderText,
}: {
  renderText: () => React.ReactNode;
}) {
  return (
    <Typography
      component="kbd"
      sx={(theme) => ({
        borderRadius: theme.radius.sm,
        backgroundColor: theme.palette.neutral.softBg,

        fontSize: 12,
        paddingX: 0.5,
      })}
      variant="outlined"
    >
      {renderText()}
    </Typography>
  );
}
