import { useState } from 'react';
import API from './api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const signup = async () => {
    try {
      await API.post('/auth/signup', form);
      alert('Signup successful');
      navigate('/');
    } catch {
      alert('Signup failed');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={signup}>Signup</button>
    </div>
  );
}
