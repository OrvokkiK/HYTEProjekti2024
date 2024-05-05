// message-router.mjs
import express from 'express';

import { deleteMessage, getAllMessages, getConversationByUserId, getMessageByMessage_id, getMessagesByAuthor, getMessagesbyConversationId, postMessage } from "../controllers/message-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";
const messageRouter = express.Router();

// /api/messages/ routes
messageRouter.route('/')
  .get(
    authenticateToken,
    getAllMessages
    )
  .post(
    authenticateToken,
    postMessage
);

// api/messages/:id routes
messageRouter.route('/:id')
  .get(
    authenticateToken,
    getMessageByMessage_id
);

//api/messages/user/:id routes
messageRouter.route('/user/:id')
  .get(
    authenticateToken,
    getConversationByUserId
);

// api/messages/conversation/:id routes
messageRouter.route('/conversation/:id')
  .get(
    authenticateToken,
    getMessagesbyConversationId
    );

messageRouter.route('/:id/user/:user_id')
  .delete(
    authenticateToken,
    deleteMessage
); 

export default messageRouter;