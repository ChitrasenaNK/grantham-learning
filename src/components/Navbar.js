import { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button, Drawer,
  List, ListItem, ListItemText, Box, Menu, MenuItem, Avatar, Divider
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LockResetIcon from '@mui/icons-material/LockReset';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';



import { useNavigate } from 'react-router-dom';
import ChangePasswordModal from './ChangePasswordModal'; // Make sure this component exists

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showChangePass, setShowChangePass] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const navLinks = [
    { text: 'Home', path: '/home', icon: <HomeIcon fontSize="small" sx={{ mr: 1 }} /> },
    { text: 'Learn', path: '/learn', icon: <SchoolIcon fontSize="small" sx={{ mr: 1 }} /> },
    { text: 'Library', path: '/library', icon: <LocalLibraryIcon fontSize="small" sx={{ mr: 1 }} /> },
  ];

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#fe9e0d' }}>
        <Toolbar>
          {/* Hamburger Menu for Small Screens */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { sm: 'none' }, mr: 2 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* App Title */}
          <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                color: '#fefefe', // or any color you liked
              }}
            >
                  <Box component="span" sx={{ fontFamily: 'serif', mr: 1 }}>
                    Grantha Lipi
                  </Box>
                  <Box component="span" sx={{ fontFamily: 'Noto Sans Grantha' }}>
                    𑌗𑍍𑌰𑌨𑍍𑌥 𑌲𑌿𑌪𑌿
                  
                  </Box>
            </Typography>

          {/* Nav Links for Large Screens */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
            {navLinks.map((link) => (
              <Button
                key={link.text}
                color="inherit"
                onClick={() => navigate(link.path)}
                startIcon={link.icon}
              >
                {link.text}
              </Button>
            ))}
          </Box>

          {/* User Avatar Dropdown */}
          <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar sx={{ bgcolor: '#fff', color: '#fe9e0d' }}>
              <AccountCircleIcon />
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => { setShowChangePass(true); setAnchorEl(null); }}>
              <LockResetIcon fontSize="small" sx={{ mr: 1 }} />
              Change Password
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Side Drawer for Small Screens */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} onClick={() => setDrawerOpen(false)}>
          <List>
            {navLinks.map((link) => (
              <ListItem button key={link.text} onClick={() => navigate(link.path)}>
                {link.icon}
                <ListItemText primary={link.text} />
              </ListItem>
            ))}
            <Divider />
            <ListItem button onClick={handleLogout}>
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Change Password Modal */}
      <ChangePasswordModal
        open={showChangePass}
        onClose={() => setShowChangePass(false)}
      />
    </>
  );
}
