// message-controller.mjs

import { getNewId } from "../utils/new-conversation.mjs";
import { deleteMessageByMessageId, insertMessage, listAllMessages, listConversationByUserId, listConverstation, listMessageByMessage_id, listMessagebyAuthor } from "../models/message-model.mjs";

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
  const result = await listConverstation(converation_id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

// GET message by message_id
const getMessageByMessage_id = async (req, res) => {
  const message_id = req.params.id;
  const result = await listMessageByMessage_id(message_id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
}

// GET conversation_id by sender id
const getConversationByUserId = async(req, res) => {
  const user_id = req.params.id
  const result = await listConversationByUserId(user_id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};


const postMessage = async (req, res) => {
  let conversation_id = req.body.conversation_id;
  console.log(conversation_id);
  const { 
    recipient_id, 
    message_content, 
    message_sent_at, 
    sender_id
  } = req.body;
  if (recipient_id && message_content && message_sent_at && sender_id) {
    if (!conversation_id) {
      conversation_id = await getNewId();
      const result = await insertMessage(conversation_id, req.body);
      if (result.error) {
        return res.status(result.error).json(result);
      } else {
        return result.json;
      }
    } else {
      const result = await insertMessage(conversation_id, req.body);
      if (result.error) {
        return res.status(result.error).json(result);
      } else {
        return result.json;
      }
    }
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
  getConversationByUserId,
  getMessagesbyConversationId,
  postMessage,
  deleteMessage
};
