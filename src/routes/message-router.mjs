// message-router.mjs
import express from 'express';
import { body, param } from "express-validator";
import { validationErrorHandler } from "../middlewares/error-handler.mjs";
import { deleteMessage, getAllMessages, getConversationByUserId, getMessageByMessage_id, getMessagesByAuthor, getMessagesbyConversationId, postMessage } from "../controllers/message-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";
const messageRouter = express.Router();

// /api/messages/ routes
messageRouter.route('/')
  .get(
    authenticateToken,
    getAllMessages
);

messageRouter.post('/',
    body('conversation_id').isInt().optional({nullable: true}),
    body('recipient_id').isInt(),
    body('message_content').escape(),
    body('message_sent_at').isISO8601(),
    validationErrorHandler,
    authenticateToken,
    postMessage
);

/* Sample message
{
  "conversation_id": "2",
  "recipient_id": "5", 
  "message_content": "Vähän turhautumista ilmassa x2",
  "message_sent_at" : "2024-05-05 14:02:00",
  "sender_id": "6"
}
*/

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