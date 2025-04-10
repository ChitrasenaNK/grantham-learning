import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { consonantBlocks } from '../data/granthamLetters';
import { sectionTitleStyle, letterStyle, labelStyle } from './styles';

const ConsonantComboSection = () => (
  <Box>
    <Typography sx={sectionTitleStyle}>Consonant Combinations</Typography>
    {consonantBlocks.map(({ base, combinations }, blockIdx) => (
      <Box key={blockIdx} mt={4}>
        <Grid container spacing={2} justifyContent="center">
          {combinations.map(({ letter, label }, i) => (
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
    ))}
  </Box>
);

export default ConsonantComboSection;
