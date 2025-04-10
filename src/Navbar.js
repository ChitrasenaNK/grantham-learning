import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const navLinks = [
    { text: 'Home', path: '/home' },
    { text: 'Learn', path: '/learn' },
    { text: 'Library', path: '/library' },
    { text: 'Logout', action: handleLogout },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} onClick={() => setDrawerOpen(false)}>
      <List>
        {navLinks.map((link) => (
          <ListItem
            button
            key={link.text}
            onClick={() => link.path ? navigate(link.path) : link.action()}
          >
            <ListItemText primary={link.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#fe9e0d' }}>
        <Toolbar>
          {/* Small screen: hamburger menu */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { sm: 'none' }, mr: 2 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* App title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Grantham App
          </Typography>

          {/* Large screen: nav buttons */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
            {navLinks.map((link) => (
              <Button
                key={link.text}
                color="inherit"
                onClick={() => link.path ? navigate(link.path) : link.action()}
              >
                {link.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawer}
      </Drawer>
    </>
  );
}
