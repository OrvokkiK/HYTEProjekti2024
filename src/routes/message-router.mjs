// message-router.mjs
import express from 'express';

import { deleteMessage, getAllMessages, getMessageByMessage_id, postMessage } from "../controllers/message-controller.mjs";

const messageRouter = express.Router();

// /api/messages/ routes
messageRouter.route('/').get(getAllMessages).post(postMessage);

// api/messages/:id
messageRouter.route('/:id').get(getMessageByMessage_id).delete(deleteMessage);

export default messageRouter;