const Post = require('../models/post.js')

// Отримання всіх авпостуто
async function getPosts(req, res) {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Створення нового посту
async function createPost(req, res) {
    const post = new Post({
        id: req.query.id,
        title: req.query.title,
        content: req.query.content,
        author: req.query.author,
        date: req.query.date
    });
    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Отримання одного посту
    async function getPost(req, res) {
        res.json(res.post);
    }

// Видалення одного посту
    async function deletePost(req, res) {
    try {
        await res.post.remove();
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getPosts,
    createPost,
    getPost,
    deletePost
};
