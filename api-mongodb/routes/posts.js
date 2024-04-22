const express = require('express');
const router = express.Router();
const { getPosts, createPost, getPost, deletePost } = require('../controllers/post.js');

// Отримання всіх авто
router.get('/posts', getPosts);

// Створення нового авто
router.post('/posts', createPost);

// Отримання одного авто
router.get('/posts/:id', getPost);

// Видалення одного авто
router.delete('/posts/:id', deletePost);

module.exports = router;