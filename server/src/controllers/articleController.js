// src/controllers/articleController.js
import prisma from '../prismaClient.js';

export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const article = await prisma.article.findUnique({ where: { id: parseInt(id) } });
    if (!article) return res.status(404).json({ error: 'Article not found' });

    // Only the article owner or admin can update
    if (req.user.role !== 'admin' && req.user.id !== article.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(id) },
      data: { title, content },
    });
    res.json(updatedArticle);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: 'Error updating article' });
  }
};
