import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, styled } from '@mui/material';

const StyledCard = styled(Card)`
  max-width: 250px;
  margin: 15px;
  transition: box-shadow 0.3s;


  &:hover {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15); 
  }
`;

type CardOptionParams = {
    title: string, 
    description: string, 
    imageUrl: string, 
    linkPath: string
}

const CardOption = ({ title, description, imageUrl, linkPath } : CardOptionParams) => {
  return (
    <StyledCard>
      <Link to={linkPath} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="160"
          image={imageUrl}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Link>
    </StyledCard>
  );
};

export default CardOption;
