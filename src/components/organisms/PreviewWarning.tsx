import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { useLocalStorage } from 'usehooks-ts';

export default function PreviewWarning() {
  const [hidden, setHidden] = useLocalStorage<boolean>('hide-preview', false, {
    serializer(value) {
      return String(value ? 1 : 0);
    },
    deserializer(value) {
      return Number(value) === 1;
    },
  });

  return (
    !hidden && (
      <Typography
        variant="soft"
        color="warning"
        endDecorator={
          <IconButton
            size="sm"
            color="warning"
            variant="outlined"
            onClick={() => setHidden(true)}
          >
            <CloseIcon />
          </IconButton>
        }
        sx={{
          width: '100%',
          borderRadius: 0,

          paddingX: 2.5,
          paddingY: 1.5,
          marginInline: 0,

          textAlign: 'center',
          fontSize: 13,

          '& .MuiTypography-endDecorator': {
            marginLeft: 'auto',
          },
        }}
      >
        You currently are visiting the preview version. Changes are not final.
      </Typography>
    )
  );
}
