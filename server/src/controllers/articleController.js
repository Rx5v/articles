// src/controllers/articleController.js
import prisma from '../prismaClient.js'; // Default import, do not destructure

export const createArticle = async (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? req.file.path : null;

  console.log(image);
  
  try {
    const article = await prisma.article.create({
      data: { title, content, image },
    });
    res.status(201).json(article);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: 'Error creating article' });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await prisma.article.findMany();
    res.json(articles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching articles' });
  }
};

export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const article = await prisma.article.update({
      where: { id: parseInt(id) },
      data: { title, content, image },
    });
    res.json(article);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error updating article' });
  }
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await prisma.article.delete({
      where: { id: parseInt(id) },
    });
    res.json(article);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error deleting article' });
  }
};
