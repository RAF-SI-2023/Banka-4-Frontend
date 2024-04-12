import React from 'react';
import { Grid } from '@mui/material';
import styled from 'styled-components';
import CardOption from 'moduls/TerminskiUgovori/components/termKartice';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  gap: 10px;
`

const ContentWrapper = styled.div`
 padding: 40px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 20px;
  gap: 20px;
`

const Container = styled(Grid)`
  padding: 20px;
`;

const url = process.env.PUBLIC_URL


const cardData = [
    { title: 'Agriculture', description: 'Agriculture description', imageUrl: `${url}/geminiAgr.jpeg`, linkPath: '/contracts?type=Agriculture' },
    { title: 'Energy', description: 'Energy brief description', imageUrl: `${url}/bingEnergy.jpeg`, linkPath: '/contracts?type=Energy' },
    { title: 'Meats', description: 'Meats brief description', imageUrl: `${url}/geminiMeats.jpeg`, linkPath: '/contracts?type=Meats' },
    { title: 'Metals', description: 'Metals brief description', imageUrl: `${url}/bingMetals.jpeg`, linkPath: '/contracts?type=Metals' },
    { title: 'Softs', description: 'Softs brief description', imageUrl: `${url}/geminiSofts.jpeg`, linkPath: '/contracts?type=Softs' },
];


const TerminskiUgovoriPage = () => {
    return (
        <PageWrapper>
            <ContentWrapper>

                <Container container >
                    {cardData.map((card, index) => (
                        <Grid item xs={12} sm={6} md={2} key={index} sx={{
                            maxWidth: { md: '100%' }, flexGrow: { md: 1 }
                        }}
                        >
                            <CardOption {...card} />
                        </Grid>
                    ))}
                </Container>
            </ContentWrapper>
        </PageWrapper>

    );
};

export default TerminskiUgovoriPage;
