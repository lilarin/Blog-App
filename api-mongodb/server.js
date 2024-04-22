const express = require('express');
const app = express();
const cors = require('cors');
const limiter = require('../src/middleware/requestLimit.js')

// Підключення до бази даних
require('./db');
app.use(express.json());

// Використання rate limiter middleware
app.use(limiter);

// Додавання CORS middleware
app.use(cors());

// Використання маршрутів
const postsRouter = require('./routes/posts.js');
app.use('/api', postsRouter);

// Запуск сервера
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
