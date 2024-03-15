import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

interface UrlTrackerProps {
  url?: string;
}

const UrlTracker: React.FC<UrlTrackerProps> = ({ url }) => {
  const [isUrlValid, setIsUrlValid] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsUrlValid(!!url && /^https?:\/\/.+/.test(url));
  }, [url]);

  return (
    <Box>
      {isUrlValid ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', wordWrap:'break-word'}}>
          <Typography sx={{wordWrap:'break-word'}} variant="h6">I'm analyzing</Typography>
            <Typography sx={{textWrap:'balance', wordBreak:'break-word'}}>{url}</Typography>
          <Box sx={{ display: 'flex', gap: 2, marginTop: 2, alignItems: 'center', }}>
            <CircularProgress size={24} />
            <Typography>Please wait...</Typography>
          </Box>
          <Box sx={{ marginTop: 2 }}>
          </Box>
        </Box>
      ) : (
null)}
    </Box>
  );
};

export default UrlTracker;
