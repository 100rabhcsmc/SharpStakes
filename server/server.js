const express = require('express');
const cors = require('cors');
const app = express();
const data = require('./mockData.json');

app.use(cors());
app.use(express.json());

app.get('/games', (req, res) => res.json(data.games));
app.get('/user', (req, res) => res.json(data.user));
app.post('/predict', (req, res) => {
  // mock prediction logic
  const prediction = req.body;
  console.log('Received prediction:', prediction);
  res.json({ success: true });
});

app.listen(3000, () => console.log('Mock server running on http://localhost:3000'));
