// message-controller.mjs

import { deleteMessageByMessageId, insertMessage, listAllMessages, listConverstation, listMessageByMessage_id, listMessagebyAuthor } from "../models/message-model.mjs";

// GET all messages
const getAllMessages = async (req, res) => {
  const result = await listAllMessages();
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

// GET messages by author
const getMessagesByAuthor = async (req, res) => {
  const result = await listMessagebyAuthor(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

//GET messages in a conversation
const  getMessagesbyConversationId = async (req,res) => {
    const converation_id = req.params.id
  const result = await listMessagebyAuthor(converation_id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

// GET messages by message_id
const getMessageByMessage_id = async (req, res) => {
  const message_id = req.params.id;
  const result = await listMessageByMessage_id(message_id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
}

// POST new message
const postMessage = async (req, res) => {
  const {
    conversation_id, 
    recipient_id, 
    message_content, 
    message_sent_at, 
    sender_id} = req.body;
  if (message_content && recipient_id && message_sent_at && sender_id) {
    const result = await insertMessage(req.body);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
  } else {
    return {error: 404, message: 'bad request'};
 }
}

// DELETE message by message_id
const deleteMessage = async (req, res) => {
  const message_id = req.params.id
  const result = await deleteMessageByMessageId(message_id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

export {
  getAllMessages,
  getMessagesByAuthor,
  getMessageByMessage_id,
  postMessage,
  deleteMessage
};