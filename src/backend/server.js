require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Pool } = require('pg')
const router = require('./router/index.js')
const errorMiddleware = require('./middleware/error-middleware.js');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONT,
    credentials: true
}));
app.use('/api', router);
app.use(errorMiddleware);

// const pool = new Pool({
//       user: process.env.PG_USER,
//       host: process.env.PG_HOST,
//       database: process.env.PG_DATABASE,
//       password: process.env.PG_PASSWORD,
//       port: process.env.PG_PORT,
//     });

const start = async() => {
    try {
        // await pool.connect();
        app.listen(PORT, () => console.log(`Сервер работает на порту: ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start()