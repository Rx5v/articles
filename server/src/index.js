// src/index.js
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// kalau misal nambah fungsi lain lagi ya tinggal ditambah dibawah ny
app.use('/auth', authRoutes);
app.use('/articles', articleRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
