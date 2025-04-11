require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

// Database setup using environment variables
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
}).promise();

// Auth middleware
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch {
    res.sendStatus(403);
  }
};

// Signup
app.post('/api/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send('Missing fields');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send('Invalid email');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    res.sendStatus(201);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).send('Username or email already registered');
    }
    console.error('Signup error:', err);
    res.status(500).send('Server error');
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const [users] = await db.execute('SELECT * FROM users WHERE name = ?', [username]);
  if (!users.length) return res.sendStatus(401);

  const match = await bcrypt.compare(password, users[0].password);
  if (!match) return res.sendStatus(401);

  const token = jwt.sign({ userId: users[0].id }, process.env.JWT_SECRET);
  res.json({ token });
});

// Get groups
app.get('/api/groups', authenticate, async (req, res) => {
  const [groups] = await db.execute('SELECT DISTINCT group_name FROM pdfs');
  res.json(groups);
});

// Get PDFs by group
app.get('/api/pdfs/:group', authenticate, async (req, res) => {
  const { group } = req.params;
  const [pdfs] = await db.execute('SELECT id, name FROM pdfs WHERE group_name = ?', [group]);
  res.json(pdfs);
});

// Get PDF content
app.get('/api/pdf/:id', async (req, res) => {
  let token = req.headers.authorization?.split(' ')[1];
  if (!token && req.query.token) {
    token = req.query.token;
  }
  if (!token) return res.sendStatus(401);

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = req.params;

    const [rows] = await db.execute('SELECT name, data FROM pdfs WHERE id = ?', [id]);
    if (!rows.length) return res.sendStatus(404);

    res.json({ name: rows[0].name, url: rows[0].data }); // ✅ Return URL
  } catch (err) {
    res.sendStatus(403);
  }
});


const passwordResetTokens = new Map();

// Forgot Password
app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;
  const [users] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
  if (!users.length) return res.status(400).send('Email not found');

  const token = crypto.randomBytes(32).toString('hex');
  passwordResetTokens.set(token, {
    userId: users[0].id,
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  res.json({ resetLink }); // In production, send this via email
});

// Reset Password
app.post('/api/auth/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  const data = passwordResetTokens.get(token);
  if (!data || Date.now() > data.expires) {
    return res.status(400).send('Invalid or expired token');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await db.execute('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, data.userId]);
  passwordResetTokens.delete(token);
  res.send('Password updated');
});

// Change Password
app.post('/api/auth/change-password', authenticate, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const [users] = await db.execute('SELECT password FROM users WHERE id = ?', [req.user.userId]);

  const isValid = await bcrypt.compare(oldPassword, users[0].password);
  if (!isValid) return res.status(400).send('Old password is incorrect');

  const hashed = await bcrypt.hash(newPassword, 10);
  await db.execute('UPDATE users SET password = ? WHERE id = ?', [hashed, req.user.userId]);

  res.send('Password changed successfully');
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
