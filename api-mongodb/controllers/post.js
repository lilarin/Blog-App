const Post = require('../models/post.js')

// Отримання всіх постів
async function getPosts(req, res) {
    const posts = await Post.find();
    return res.status(200).json(posts);
}

// Отримання відфільтрованих
async function filterPosts(req, res) {
    const posts = await Post.find();
    const { searchType, searchTerm } = req.query;
    if (!searchTerm) {
        return res.status(200).json(posts);
    }

    let filteredPosts = posts.filter(post => {
        if (searchType === 'content') {
            return post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchType === 'title') {
            return post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchType === 'author') {
            return post.author && post.author.toLowerCase().includes(searchTerm.toLowerCase());
        }
    });
    return res.json(filteredPosts);
}

// Створення нового посту
async function createPost(req, res) {
    const postTitle = req.body.title;
    const postContent = req.body.content;
    const postAuthor = req.body.author;
    const postDate = req.body.date;

    if (postTitle && postContent && postAuthor && postDate) {
        const posts = await Post.find();
        const maxId = posts.reduce((max, post) => Math.max(max, post.id), 0);
        const post = new Post({
            id: maxId + 1,
            title: postTitle,
            content: postContent,
            author: postAuthor,
            date: postDate
        });
        const newPost = await post.save();
        return res.status(201).json(newPost);
    } else {
        return res.status(400).json({ error: 'Incorrect fields found' });
    }
}

// Редагування, або створення нового посту
async function modifyPost(req, res) {
    const postId = req.body.id;
    const postTitle = req.body.title;
    const postContent = req.body.content;
    const postAuthor = req.body.author;
    const postDate = req.body.date;

    if (postId && postTitle && postContent && postAuthor && postDate) {
        const postToUpdate = await Post.findOne({ id: postId });
        
        if (!postToUpdate) {
            return res.status(404).json({ error: 'Post not found' });
        }

        postToUpdate.title = postTitle;
        postToUpdate.content = postContent;
        postToUpdate.author = postAuthor;
        postToUpdate.date = postDate;

        const updatedPost = await postToUpdate.save();
        return res.status(200).json(updatedPost);
    } else {
        return res.status(400).json({ error: 'Incorrect fields found' });
    }
}

// Видалення одного посту
async function deletePost(req, res) {
    try {
        const postId = parseInt(req.params.id);
        const postToDelete = await Post.findOneAndDelete({ id: postId });
        if (postToDelete) {
            return res.status(200).json(postToDelete);
        } else {
            return res.status(404).json({ error: 'Post not found' });
        }
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

// Отримання одного посту
async function getPost(req, res) {
    const postId = parseInt(req.params.id);
    const posts = await Post.find();
    const post = posts.find(post => post.id === postId);
    if (post) {
        return res.status(200).json(post);
    } else {
        return res.status(404).json({ error: 'Post not found' });
    }
}

module.exports = {
    getPosts,
    filterPosts,
    createPost,
    modifyPost,
    getPost,
    deletePost
};
