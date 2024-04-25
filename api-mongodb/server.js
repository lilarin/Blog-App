const express = require('express');
const app = express();
const cors = require('cors');
const limiter = require('../src/middleware/requestLimit.js')
const logs = require('../src/middleware/requestResponseLogs.js')

// Підключення до бази даних
require('./db');
app.use(express.json());

// middleware для логування з таймстампами
app.use(logs);

// middleware для створення rate limit
app.use(limiter);

// Додавання CORS middleware
app.use(cors());

// Використання маршрутів
const postsRouter = require('./routes/posts.js');
app.use('/api', postsRouter);

// Запуск сервера
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Обробка події закриття сервера
process.on('SIGINT', () => {
    console.log('Closing server...');
    server.close(() => {
        console.log('Server closed');
        // Відключення від MongoDB
        mongoose.disconnect(() => {
            console.log('Disconnected from MongoDB');
            process.exit(0);
        });
    });
});