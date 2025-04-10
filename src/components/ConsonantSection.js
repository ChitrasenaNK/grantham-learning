import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { consonants } from '../data/granthamLetters';
import { sectionTitleStyle, letterStyle, labelStyle } from './styles';

const ConsonantSection = () => (
  <Box mb={5}>
    <Typography sx={sectionTitleStyle}>Consonants</Typography>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', // 5 columns always, responsive sizing
        gap: 2,
        px: 1,
      }}
    >
      {consonants.map(({ letter, label }, i) => (
        <Card
          key={i}
          sx={{
            width: '100%', // Fill grid cell
            height: { xs: 120, sm: 140, md: 144 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CardContent>
            <Box sx={letterStyle}>{letter}</Box>
            <Box sx={labelStyle}>{label}</Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  </Box>
);

export default ConsonantSection;
