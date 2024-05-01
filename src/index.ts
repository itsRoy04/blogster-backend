import express, { Router } from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './db';
import usersRouter from './routes/users.routes';
import blogRouter from './routes/blog.routes';

// const rateLimit = require('express-rate-limit');


const dotenv = require('dotenv');
dotenv.config();

connectDB();
const app = express();
const port = process.env.PORT || 3010;



const v1Router = Router();

// const limiter = rateLimit({
//     windowMs: 1000, 
//     max: process.env.API_LIMIT_ACCESS, 
//     message: 'Too many requests from this IP, please try again in a moment.',
// });

// app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/v1', v1Router);
app.get('/', (req, res) => {
    res.send('Hello, this is your TypeScript backend!');
});

app.listen(port, () => {
    console.log("Server is running on port", process.env.PORT)
    // console.log(`Server is running on http://localhost:${port}`);
});




// app.get('/api/data', (req, res) => {
//     const requestApiKey = req.headers['api-key'];
  
//     // Check if the API key is valid
//     if (requestApiKey && requestApiKey === apiKey) {
//       res.json({ message: 'Your API response data' });
//     } else {
//       res.status(401).json({ error: 'Unauthorized: Invalid API key' });
//     }
//   });


v1Router.use('/users', usersRouter);
v1Router.use('/blog',blogRouter)

