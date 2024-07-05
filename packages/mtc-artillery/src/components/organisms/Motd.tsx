import Typography from '@mui/joy/Typography';

import HeaderCard from '@/components/atoms/HeaderCard';
import ScrollBox from '@/components/molecules/ScrollBox';

function Motd({ message = '' }: { message: string | undefined }) {
  if (!message) return;

  return (
    <HeaderCard>
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
    </HeaderCard>
  );
}

export default Motd;
