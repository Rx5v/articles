// src/index.js
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import articleRoutes from './routes/articleRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/articles', articleRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
