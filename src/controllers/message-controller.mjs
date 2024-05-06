// message-controller.mjs

import { getNewId } from "../utils/new-conversation.mjs";
import { deleteConversationByConversationId, deleteMessageByMessageId, insertMessage, listAllMessages, listConversationByUserId, listConverstation, listMessageByMessage_id, listMessagebyAuthor } from "../models/message-model.mjs";

// GET all messages
const getAllMessages = async (req, res) => {
  const user_level = req.user.user_level;
  if (user_level === 'admin') {
    const result = await listAllMessages();
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'});
  }

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
  const user_id_token = req.user.userId;
  const user_level = req.user.user_level;
  const converation_id = req.params.id;
  console.log(user_id_token);
  const result = await listConverstation(converation_id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  if ( user_id_token == result[0].sender_id || user_id_token == result[0].recipient_id || user_level === 'admin') {
    return res.json(result);
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'}); 
  }
};

// GET message by message_id
const getMessageByMessage_id = async (req, res) => {
  const user_id_token = req.user.userId;
  const user_level = req.user.user_level;
  const message_id = req.params.id;
  const result = await listMessageByMessage_id(message_id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  if (user_id_token == result[0].sender_id || user_id_token == result[0].recipient_id || user_level === 'admin') {
    return res.json(result); 
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'});
  }
};

// GET conversation_id by sender id
const getConversationByUserId = async(req, res) => {
  const user_id_token = req.user.userId;
  const user_level = req.user.user_level;
  const user_id = req.params.id
  if (user_id == user_id_token || user_level == 'admin' || user_level == 'hcp') {
    const result = await listConversationByUserId(user_id);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'});
  }
};


const postMessage = async (req, res) => {
  const user_id_token = req.user.userId;
  let conversation_id = req.body.conversation_id;
  const { 
    recipient_id, 
    message_content, 
    message_sent_at, 
    sender_id
  } = req.body;
  // Checks if sender is logged in user
  if (sender_id == user_id_token ) {
    // Checks that message has all required fields
    if (recipient_id && message_content && message_sent_at && sender_id) {
      // Checks if message has a conversation id
      if (!conversation_id) {
        // If no conversation_id is found, creates a new id
        conversation_id = await getNewId();
        const result = await insertMessage(conversation_id, req.body);
        if (result.error) {
          return res.status(result.error).json(result);
        } else {
          return res.status(201).json({message: `Message sent`, conversation_id:`${conversation_id}`});
        }
      } else {
        const result = await insertMessage(conversation_id, req.body);
        if (result.error) {
          return res.status(result.error).json(result);
        } else {
          return res.status(201).json({message: `Message sent`, conversation_id:`${conversation_id}`});
        }
      }
    } else {
      return {error: 404, message: 'bad request'}; 
    }
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'});
  }
}; 

// DELETE message by message_id
const deleteMessage = async (req, res) => {
  const user_id = req.params.user_id;
  const user_id_token = req.user.userId;
  const user_level = req.user.user_level;
  const message_id = req.params.id;
  console.log(user_id);
  console.log(user_id_token);
  if (user_id == user_id_token || user_level == 'admin') {
    const result = await deleteMessageByMessageId(message_id, user_id);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'});
  }
};

// TODO finnish
// Delete conversation by conversation id
/* const deleteConversation = async (req, res) => {
  const conversation_id = req.params.id;
  const user_id = req.user.userId;
  const user_level = req.user.userId;
  // If user's user_level is admin, conversation can be removed 
  if (user_level == 'admin') {
    let result = await deleteConversationByConversationId(conversation_id);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    // if user_level is not admin
  } else {
    // Check if user is in a conversation
    const check = await listConversationByUserId(user_id);
    // if user not in a conversation
    if (check.error) {
      return res.status(403).json({error: 403, message: 'Forbidden'});
    } else {
       check.forEach(element => {

        
      });
      console.log(check[0]);
      return res.status(200)
    }
  }
};*/ 

export {
  getAllMessages,
  getMessagesByAuthor,
  getMessageByMessage_id,
  getConversationByUserId,
  getMessagesbyConversationId,
  postMessage,
  deleteMessage,
};