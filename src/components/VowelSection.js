import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { vowels } from '../data/granthamLetters';
import { sectionTitleStyle, letterStyle, labelStyle } from './styles';

const VowelSection = () => (
  <Box mb={5}>
    <Typography sx={sectionTitleStyle}>Vowels</Typography>
    <Grid container spacing={2} justifyContent="center">
      {vowels.map(({ letter, label }, i) => (
        <Grid item key={i}>
          <Card sx={{ width: 120, height: 144, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent>
              <Box sx={letterStyle}>{letter}</Box>
              <Box sx={labelStyle}>{label}</Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default VowelSection;
