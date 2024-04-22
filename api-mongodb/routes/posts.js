const express = require('express');
const router = express.Router();
const { getPosts, filterPosts ,createPost, modifyPost, getPost, deletePost } = require('../controllers/post.js');

// Отримання всіх постів
router.get('/posts', getPosts);

// Отримання відфільтрованих постів
router.get('/filter/posts', filterPosts);

// Створення нового посту
router.post('/posts', createPost);

// Редагування, або створення нового посту
router.put('/posts', modifyPost);

// Отримання одного посту за ідентифікатором
router.get('/posts/:id', getPost);

// Видалення одного посту
router.delete('/posts/:id', deletePost);

module.exports = router;