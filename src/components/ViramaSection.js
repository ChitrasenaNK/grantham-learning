import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { consonants } from '../data/granthamLetters';
import { sectionTitleStyle, letterStyle, labelStyle } from './styles';

const ViramaSection = () => (
  <Box mb={5}>
    <Typography sx={sectionTitleStyle}>Consonant Basic (Consonant + Virāma)</Typography>
    <Grid container spacing={2} justifyContent="center">
      {consonants.map(({ letter, label }, i) => (
        <Grid item key={i}>
          <Card sx={{ width: 120, height: 144, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent>
              <Box sx={letterStyle}>{letter + '𑍍'}</Box>
              <Box sx={labelStyle}>{label.replace(/a$/, '')}</Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default ViramaSection;
