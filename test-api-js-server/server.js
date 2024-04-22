const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const PORT = 3002;

// Початкова база даних
const posts = [
    {
        "id": 1,
        "title": "Сонце світить, та не гріє",
        "content": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, fugiat harum. Voluptatibus beatae corrupti nulla, qui odit mollitia doloremque rerum magni rem aut laborum, maiores officiis laboriosam hic. Ratione, voluptas?...",
        "author": "lilarin",
        "date": "12.04.2024"
    },
    {
        "id": 2,
        "title": "Скоро  склеють  людям  ласти.",
        "content": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, fugiat harum. Voluptatibus beatae corrupti nulla, qui odit mollitia doloremque rerum magni rem aut laborum, maiores officiis laboriosam hic. Ratione, voluptas?...",
        "author": "lilarin",
        "date": "14.04.2024"
    },
    {
        "id": 3,
        "title": "Той старіє, той дуріє,",
        "content": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, fugiat harum. Voluptatibus beatae corrupti nulla, qui odit mollitia doloremque rerum magni rem aut laborum, maiores officiis laboriosam hic. Ratione, voluptas?...",
        "author": "lilarin",
        "date": "18.04.2024"
    },
    {
        "id": 4,
        "title": "Той і вміє, що лиш красти.",
        "content": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, fugiat harum. Voluptatibus beatae corrupti nulla, qui odit mollitia doloremque rerum magni rem aut laborum, maiores officiis laboriosam hic. Ratione, voluptas?...",
        "author": "lilarin",
        "date": "18.04.2024"
    }
];

// Маршрути для операцій CRUD
app.get('/posts', (req, res) => {
    res.json(posts);
});

app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

app.post('/posts', (req, res) => {
    const postTitle = req.query.title;
    const postContent = req.query.content;
    const postAuthor = req.query.author;
    const postDate = req.query.date;

    if (postTitle && postContent && postAuthor && postDate) {
        const maxId = posts.reduce((max, post) => Math.max(max, post.id), 0);
        const newPost = {
            id: maxId + 1,
            title: postTitle,
            content: postContent,
            author: postAuthor,
            date: postDate
        };
        posts.push(newPost);
        res.status(201).json(newPost);
    } else {
        return res.status(400).json({ error: req.headers });
    }
});

app.put('/posts', (req, res) => {
    const postTitle = req.query.title;
    const postContent = req.query.content;
    const postAuthor = req.query.author;
    const postDate = req.query.date;

    const postId = req.query.id;
    const index = posts.findIndex(post => post.id === parseInt(postId));

    if (index !== -1) {
        if (postTitle) posts[index].title = postTitle;
        if (postContent) posts[index].content = postContent;
        if (postAuthor) posts[index].author = postAuthor;
        if (postDate) posts[index].date = postDate;
        res.status(200).json(posts[index]);
    } else {
        const maxId = posts.reduce((max, post) => Math.max(max, post.id), 0);
        const newPost = {
            id: maxId + 1,
            title: postTitle,
            content: postContent,
            author: postAuthor,
            date: postDate
        };
        posts.push(newPost);
        res.status(201).json(newPost);
    }
});

app.delete('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const index = posts.findIndex(post => post.id === postId);
    if (index !== -1) {
        posts.splice(index, 1);
        res.status(200).send();
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

app.put('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content, author, date } = req.body;
    const index = posts.findIndex(post => post.id === postId);
    
    if (index !== -1) {
        posts[index] = {
            id: postId,
            title: title || posts[index].title,
            content: content || posts[index].content,
            author: author || posts[index].author,
            date: date || posts[index].date
        };
        res.status(200).json(posts[index]);
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

app.get('/filter/posts', (req, res) => {
    const { searchType, searchTerm } = req.query;

    if (!searchTerm) {
        res.json(posts);
        return;
    }

    let filteredPosts = posts.filter(post => {
        if (searchType === 'content') {
            return post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchType === 'title') {
            return post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchType === 'author') {
            return post.author && post.author.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return true;
    });

    res.json(filteredPosts);
});


// Запуск сервера і слухання вказаного порту
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
