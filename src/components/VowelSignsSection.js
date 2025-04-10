import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { vowelSigns } from '../data/granthamLetters';
import { sectionTitleStyle, letterStyle, labelStyle } from './styles';

const VowelSignsSection = () => (
  <Box mb={5}>
    <Typography sx={sectionTitleStyle}>Vowel Signs (Mātras)</Typography>
    <Grid container spacing={2} justifyContent="center">
      {vowelSigns.map(({ sign, label }, i) => (
        <Grid item key={i}>
          <Card sx={{ width: 120, height: 144, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent>
              <Box sx={letterStyle}>{sign || '◌'}</Box>
              <Box sx={labelStyle}>{label}</Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default VowelSignsSection;
