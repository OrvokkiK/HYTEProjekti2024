// index.js
import express from 'express';
import path from 'path';
import cors from 'cors';
import {fileURLToPath} from 'url'; 
import logger from "./Middlewares/logger.mjs";
import userRouter from './src/routes/user-router.mjs';


// import http from 'http';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(cors());

app.use(logger);

app.use(express.json());

app.use(express.static('public'));


// user route
// Users resource (/api/users)
app.use('/api/users', userRouter);

// symptoms route

// Lifestyle route

// HRV route

// message route

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
