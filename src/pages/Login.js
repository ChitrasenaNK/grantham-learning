import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  useMediaQuery,
  useTheme,
  Paper,
  CircularProgress,
} from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import granthaBg from '../assets/bgimg.jpg'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [signupForm, setSignupForm] = useState({ username: '', email: '', password: '' });
  const [showSignup, setShowSignup] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [loading, setLoading] = useState(false); // For the loading spinner
  const [loadingSignup, setLoadingSignup] = useState(false); // For signup loading

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const login = async () => {
    setLoading(true); // Start loading spinner
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const signup = async () => {
    setLoadingSignup(true); // Start loading spinner for signup
    const { username, email, password } = signupForm;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Enter a valid email');
      setLoadingSignup(false);
      return;
    }

    try {
      await API.post('/auth/signup', signupForm);
      toast.success('Signup successful! Please login.');
      setShowSignup(false);
    } catch (err) {
      const msg = err.response?.data || 'Signup failed';
      toast.error(msg);
    } finally {
      setLoadingSignup(false); // Stop signup loading spinner
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${granthaBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <ToastContainer position="top-center" autoClose={3000} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
          maxWidth: '1000px',
          mx: 'auto',
          borderRadius: 4,
          overflow: 'hidden',
         
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)', // Depth
          border: '1px solid rgba(255, 255, 255, 0.2)', // Frosted edge
        }}
      >
        {/* Left Side: Description */}
        <Box
          sx={{
            flex: 2,
            p: 3,
            background: 'linear-gradient(to bottom right, #fffaf0, #f9e4b7)',
            opacity:0.7,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'justify',
          }}
        >
          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            sx={{
              fontWeight: 'bold',
              fontFamily: 'serif',
              color: '#5e2605',
              mb: 3,
            }}
          >
            Explore Grantha
          </Typography>
          <Typography variant="h6" sx={{ color: '#4b3a2f', mb: 1 }}>
            Discover the ancient beauty of Grantha Lipi.
          </Typography>
          <Typography variant="h6" sx={{ color: '#4b3a2f', mb: 1 }}>
            Read scriptures written in classical Grantha.
          </Typography>
          <Typography variant="h6" sx={{ color: '#4b3a2f', mb: 1 }}>
            Revive the wisdom of South Indian heritage.
          </Typography>
          <Typography variant="h6" sx={{ color: '#4b3a2f' }}>
            Learn the script used for Sanskrit in Tamil Nadu.
          </Typography>
        </Box>

        {/* Right Side: Login */}
        <Box
          sx={{
            flex: 1,
            p: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.65)', // login box even more transparent
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backdropFilter: 'blur(6px)',
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#5e2605',
              mb: 2,
            }}
          >
            Login
          </Typography>

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
            type="password"
            variant="outlined"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            margin="normal"
          />
          <Typography
            onClick={() => setShowForgot(true)} // assuming this controls a modal
            sx={{
              mt: 1,
              textAlign: 'right',
              cursor: 'pointer',
              color: '#5e2605',
              fontSize: '0.9rem',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Forgot Password?
          </Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: '#fe9e0d',
              '&:hover': { backgroundColor: '#e68a00' },
            }}
            onClick={login}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#5e2605' }}>
              Create an account?{' '}
              <Typography
                component="span"
                onClick={() => setShowSignup(true)}
                sx={{
                  cursor: 'pointer',
                  color: '#fe9e0d',
                  fontWeight: 'bold',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Sign up
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Forgot Password Dialog */}
      <Dialog
        open={showForgot}
        onClose={() => setShowForgot(false)}
        PaperProps={{
          sx: {
            p: 4,
            width: 450,
            backgroundColor: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(6px)',
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#5e2605',
            fontSize: '1.5rem',
            mb: 1,
          }}
        >
          Forgot Password
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Enter your registered email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#fe9e0d',
              '&:hover': { backgroundColor: '#e68a00' },
            }}
            onClick={async () => {
              try {
                const res = await API.post('/auth/forgot-password', { email: forgotEmail });
                toast.success('Check your email for reset link');
                console.log('Reset Link:', res.data.resetLink); // simulate "email"
                setShowForgot(false);
              } catch (err) {
                toast.error(err.response?.data || 'Failed to send reset link');
              }
            }}
          >
            Send Link
          </Button>
          <Button sx={{ color: '#5e2605' }} onClick={() => setShowForgot(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Signup Modal */}
      <Modal open={showSignup} onClose={() => setShowSignup(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '90%' : 400, // Responsive width
            p: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(6px)',
            borderRadius: 2,
            boxShadow: 24,
            outline: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#5e2605',
              mb: 2,
            }}
          >
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
            <Button
              variant="contained"
              onClick={signup}
              sx={{
                backgroundColor: '#fe9e0d',
                '&:hover': { backgroundColor: '#e68a00' },
              }}
              disabled={loadingSignup}
            >
              {loadingSignup ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </Button>
            <Button onClick={() => setShowSignup(false)} sx={{ color: '#5e2605' }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
