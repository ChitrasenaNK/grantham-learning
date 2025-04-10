import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

import Navbar from './Navbar';

import VowelSection from './components/VowelSection';
import ConsonantSection from './components/ConsonantSection';
import ViramaSection from './components/ViramaSection';
import VowelSignsSection from './components/VowelSignsSection';
import ConsonantComboSection from './components/ConsonantComboSection';

const sectionMap = {
  Vowels: <VowelSection />,
  Consonants: <ConsonantSection />,
  'Consonant + Virama': <ViramaSection />,
  'Vowel Signs': <VowelSignsSection />,
  'Consonant Combinations': <ConsonantComboSection />,
};

const drawerWidth = 240;

const Learn = () => {
  const [selectedSection, setSelectedSection] = useState('Vowels');
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: drawerWidth }}>
      <Typography
        variant="h6"
        align="center"
        sx={{
          fontFamily: 'Noto Sans Grantha',
          fontWeight: 'bold',
          py: 2,
          fontSize:'1rem',
          color:'#8B4513'
        }}
      >
      Akshamalika 𑌅𑌕𑍍𑌶𑌮𑌾𑌲𑌿𑌕𑌾
      </Typography>
      <List
  sx={{
    p: 1,
    borderRadius: 2,
    bgcolor: '#fff5ee',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e0e0e0',
  }}
>
  {Object.keys(sectionMap).map((text) => (
    <ListItem key={text} disablePadding sx={{ mb: 1 }}>
      <ListItemButton
        onClick={() => {
          setSelectedSection(text);
          if (isMobile) setMobileOpen(false);
        }}
        sx={{
          borderRadius: 1,
          transition: 'background-color 0.2s',
          '&:hover': {
            backgroundColor: '#ffe4c4', // a soft peach
          },
          '&.Mui-selected': {
            backgroundColor: '#ffdab9',
            fontWeight: 'bold',
          },
        }}
        selected={selectedSection === text}
      >
        <ListItemText
          primary={text}
          sx={{
            color: '#2F4F4F',
            textTransform: 'capitalize',
            pl: 1,
          }}
        />
      </ListItemButton>
    </ListItem>
  ))}
</List>

    </Box>
  );

  return (
    <>
      <Navbar />

      {/* Small screen AppBar with title */}
      {isMobile && (
        <AppBar position="static" color="#fff5ee" sx={{ mt: '20px' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 1, fontFamily: 'Noto Sans Grantha',color:'lightpink' }}>
              Akshamalika 𑌅𑌕𑍍𑌶𑌮𑌾𑌲𑌿𑌕𑌾
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Layout */}
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar */}
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#fff5ee',
              top: isMobile ? 0 : 64, // adjust for Navbar
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Main content */}
        <Box
  component="main"
  sx={{
    flexGrow: 1,
    px: { xs: 1, sm: 2 }, // reduce horizontal padding
    pt: 2,
    ...(isMobile ? {} : { ml: `${drawerWidth - 16}px` }), // reduce drawer offset slightly
  }}
>
  <Typography
    align="center"
    gutterBottom
    sx={{
      fontWeight: 'bold',
      fontFamily: 'Noto Sans Grantha',
      background: 'linear-gradient(90deg, rgb(186, 22, 167), rgba(253,45,29,1), rgba(252,176,69,1))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: {
        xs: '1.8rem',
        sm: '2.2rem',
        md: '2.5rem',
      },
      lineHeight: 2,
      paddingBottom: '8px',
    }}
  >
    Grantha Lipi 𑌗𑍍𑌰𑌨𑍍𑌥 𑌲𑌿𑌪𑌿
  </Typography>

  {sectionMap[selectedSection]}
</Box>

      </Box>
    </>
  );
};

export default Learn;
