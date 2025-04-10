import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button
} from '@mui/material';
import { toast } from 'react-toastify';
import API from '../api';

export default function ChangePasswordModal({ open, onClose }) {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleChangePassword = async () => {
    if (newPass !== confirmPass) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      await API.post('/auth/change-password', { oldPassword: oldPass, newPassword: newPass });
      toast.success('Password changed successfully');
      onClose();
      setOldPass('');
      setNewPass('');
      setConfirmPass('');
    } catch (err) {
      toast.error(err.response?.data || 'Failed to change password');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <TextField
          label="Old Password"
          type="password"
          fullWidth
          margin="dense"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="dense"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="dense"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleChangePassword} variant="contained" sx={{ backgroundColor: '#fe9e0d' }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
