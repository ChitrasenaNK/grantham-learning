import { useState } from 'react';
import API from './api';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Typography,
  Modal,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [signupForm, setSignupForm] = useState({ username: '', email: '', password: '' });
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch {
      toast.error('Invalid credentials');
    }
  };

  const signup = async () => {
    const { username, email, password } = signupForm;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Enter a valid email');
      return;
    }

    try {
      await API.post('/auth/signup', signupForm);
      toast.success('Signup successful! Please login.');
      setShowSignup(false);
    } catch (err) {
      const msg = err.response?.data || 'Signup failed';
      toast.error(msg);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <ToastContainer position="top-center" autoClose={3000} />
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      <Box sx={{ width: 300, margin: 'auto' }}>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          margin="normal"
        />
        <Button
          fullWidth
          variant="contained"
          onClick={login}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <Button onClick={() => setShowSignup(true)} sx={{ mt: 1 }}>
          Sign up
        </Button>
      </Box>

      {/* MUI Signup Modal */}
      <Modal open={showSignup} onClose={() => setShowSignup(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
            width: 400,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Sign Up
          </Typography>

          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={signupForm.username}
            onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={signupForm.email}
            onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={signupForm.password}
            onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
            margin="normal"
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button variant="contained" onClick={signup}>
              Submit
            </Button>
            <Button onClick={() => setShowSignup(false)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
