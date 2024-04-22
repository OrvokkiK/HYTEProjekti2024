// index.js
import express from 'express';
import path from 'path';
import cors from 'cors';
import {fileURLToPath} from 'url'; 
import logger from "./middlewares/logger.mjs";
import authRouter from './routes/auth-router.mjs';
import {errorHandler, notFoundHandler} from './middlewares/error-handler.mjs';
import userRouter from './routes/user-router.mjs';
import kubiosRouter from './routes/kubios-router.mjs';
import symptomRouter from './routes/symptom-router.mjs';
import messageRouter from './routes/message-router.mjs';
import analysisRouter from './routes/analysis-router.mjs';
import symptomUserRouter from './routes/symptom-user-router.mjs';
import lifestyleRouter from './routes/lifestyle-router.mjs';
import hrvRouter from './routes/hrv-router.mjs';


// import http from 'http';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(cors());

app.use(logger);

app.use(express.json());

app.use(express.static('public'));


// user routes
// Users resource (/api/users)
app.use('/api/users', userRouter);

// User authentication
app.use('/api/auth', authRouter);

// kubios routes
app.use('/api/kubios', kubiosRouter);

// symptoms route
app.use('/api/symptoms/', symptomRouter);

// symptoms/user routes
app.use('/api/symptoms/user', symptomUserRouter);

// Lifestyle route
app.use('/api/lifestyle/', lifestyleRouter);

// HRV route
app.use('/api/hrv/', hrvRouter);

// Analysis router
app.use('/api/analysis/', analysisRouter);

// message route
app.use('/api/messages/', messageRouter);

//Admin routes

// Default 404 not found
app.use(notFoundHandler);
// Error handler for sending response all error cases
app.use(errorHandler);

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
