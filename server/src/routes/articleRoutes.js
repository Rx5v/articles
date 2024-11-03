// src/routes/articleRoutes.js
import { Router } from 'express';
const router = Router();
import upload from '../middleware/upload.js';
import { createArticle, getArticles, updateArticle, deleteArticle } from '../controllers/articleController.js';

router.post('/', upload.single('file'), createArticle);
router.get('/', getArticles);
router.put('/:id', upload.single('file'), updateArticle);
router.delete('/:id', deleteArticle);

export default router;
