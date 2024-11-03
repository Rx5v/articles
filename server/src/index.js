// src/index.js
import express, { json } from 'express';
import cors from 'cors';
import articleRoutes from './routes/articleRoutes.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(json());
app.use('/articles', articleRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
