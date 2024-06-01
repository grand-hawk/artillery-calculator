import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';

import ScrollBox from '@/components/molecules/ScrollBox';

function Motd({ message = '' }: { message: string | undefined }) {
  if (!message) return;

  return (
    <Card
      role="alert"
      sx={{
        paddingX: 2,
        maxHeight: 75,
        overflow: 'auto',
      }}
      size="sm"
      variant="soft"
      orientation="horizontal"
    >
      <ScrollBox dependency={message}>
        <Typography
          sx={{
            textOverflow: 'ellipsis',
            whiteSpace: 'wrap',
            overflowWrap: 'break-word',
            height: 'fit-content',
          }}
        >
          {message}
        </Typography>
      </ScrollBox>
    </Card>
  );
}

export default Motd;
