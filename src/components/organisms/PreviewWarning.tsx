import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { useLocalStorage } from 'usehooks-ts';

import { jsonSerializers } from '@/utils/jsonSerializers';

export default function PreviewWarning() {
  const [hidden, setHidden] = useLocalStorage<boolean>(
    'hide-preview',
    false,
    jsonSerializers,
  );

  return (
    !hidden && (
      <Typography
        color="warning"
        endDecorator={
          <IconButton
            color="warning"
            size="sm"
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
        variant="soft"
      >
        You currently are visiting the preview version. Changes are not final.
      </Typography>
    )
  );
}
