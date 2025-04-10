// src/pages/ResetPassword.jsx
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Box, TextField, Button, Typography, Paper, useTheme, useMediaQuery
} from '@mui/material';
import { toast } from 'react-toastify';
import API from '../api';

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get('token');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    console.log('Token from URL:', token); // for debugging
  }, [token]);

  const reset = async () => {
    if (!token) {
      toast.error('Invalid or missing token');
      return;
    }

    if (newPass !== confirmPass) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      await API.post('/auth/reset-password', { token, newPassword: newPass });
      toast.success("Password updated");
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data || 'Reset failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#fef6e4',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Paper sx={{ p: 4, width: isMobile ? '100%' : 400 }}>
        <Typography variant="h5" gutterBottom>Reset Password</Typography>
        <TextField
          fullWidth
          label="New Password"
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          margin="normal"
        />
        <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 2, backgroundColor: '#fe9e0d', '&:hover': { backgroundColor: '#e68a00' } }}
          onClick={reset}
        >
          Reset Password
        </Button>
      </Paper>
    </Box>
  );
}
