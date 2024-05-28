import { Box, Typography } from "@mui/material";
import styled from 'styled-components';

const GifWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  margin: 30px;
`


const NotFoundPage = () => {
    const gif = Math.random() < 0.5;

    return (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <GifWrapper>
                {gif ? <img src={process.env.PUBLIC_URL + "/404gif1.gif"} alt="gif1"></img> :
                    <img src={process.env.PUBLIC_URL + "/404gif2.gif"} alt="gif2"></img>}
            </GifWrapper>
            <Typography variant="body2" sx={{ mt: 2, marginLeft: 'auto', marginRight: 'auto' }}>
                404 Page not found
            </Typography>
        </Box>
    );
};

export default NotFoundPage;
