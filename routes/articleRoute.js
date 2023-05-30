const express = require("express");
const router = express.Router();
const { createArticle,getArticles } = require('../controllers/articleController');
const authenticateToken = require('../middlewares/auth');

// POST /api/users/:userId/articles
router.post('/api/users/:userId/articles', authenticateToken, createArticle);
router.get('/api/articles',authenticateToken, getArticles);

module.exports = router;
