// message-router.mjs
import express from 'express';

import { deleteMessage, getAllMessages, getConversationByUserId, getMessageByMessage_id, getMessagesByAuthor, getMessagesbyConversationId, postMessage } from "../controllers/message-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";
const messageRouter = express.Router();

// /api/messages/ routes
messageRouter.route('/').get(getAllMessages).post(postMessage);

// api/messages/:id routes
messageRouter.route('/:id').get(getMessageByMessage_id).delete(deleteMessage);

//api/messages/user/:id routes
messageRouter.route('/user/:id').get(authenticateToken, getConversationByUserId);

// api/messages/conversation/:id routes
messageRouter.route('/conversation/:id').get(getMessagesbyConversationId);

export default messageRouter;