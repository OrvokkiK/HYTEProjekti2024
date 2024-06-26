// message-model.mjs
import promisePool from "../utils/database.mjs";

//lists all messages in the database
const listAllMessages = async () => {
  try {
    const sql = 'SELECT * FROM messages';
    const [rows] = await promisePool.query(sql);
    return rows;
  } catch (error) {
    console.error('Model listAllMessages: ', error);
    return {error: 500, message: 'db error'};
  }
};

// List all message by author
const listMessagebyAuthor = async (sender_id) => {
  try {
    const sql = `SELECT * FROM messages WHERE sender_id=${sender_id}`;
    const [rows] = await promisePool.query(sql);
    if (rows.lenght === 0) {
      return {error: 404, message: 'No messages found by such user'};
    }
    return rows;
  } catch (error) {
    console.error('Model listAllMessages: ', error);
    return {error: 500, message: 'db error'};
  }
};

// Lists message by message_id
const listMessageByMessage_id = async (message_id) => {
  try {
    const sql = `SELECT * FROM Messages WHERE message_id = ${message_id}`;
    const [rows] = await promisePool.query(sql);
    if (rows.length === 0) {
      return {error: 404, message: 'No message found'};
    }
    return rows;
  } catch (error) {
    console.error('Model: ListMessageByMessage_id ', error);
    return {error: 500, message: 'db error'};
  }
};

// List conversation by conversation_id
const listConverstation = async (conversation_id) => {
  try {
    const sql = `SELECT * FROM Messages WHERE conversation_id = ${conversation_id}`;
    const [rows] = await promisePool.query(sql);
    if (rows.length === 0) {
      return {error: 404, message: 'No conversation found'};
    }
    return rows;
  } catch (error) {
    console.error('Model: ListConversation ', error);
    return {error: 500, message: 'db error'};
  }
}

// list conversations_id by sender or recipient id
const listConversationByUserId = async (userId) => {
  try {
    const sql = `
      SELECT DISTINCT conversation_id 
      FROM Messages 
      WHERE sender_id = ? OR recipient_id = ?;
    `;
    const [rows] = await promisePool.query(sql, [userId, userId]);
    console.log('rows: ',rows);
    console.log(rows.length);
    if (rows.length === 0) {
      return {error: 404, message: 'No conversations found'};
    } else {
      return rows;
    }
  } catch (error) {
    console.error('Model: ListConversationByUserId', error);
    return {error: 500, message: 'DB error'};
  }
};


// add message to database
const insertMessage = async (conversation_id, message) => {
  try {
    const sql = 'INSERT INTO Messages (conversation_id, recipient_id, message_content, message_sent_at, sender_id) VALUES (?, ?, ?, ?, ?)';
    const params = [conversation_id, message.recipient_id, message.message_content, message.message_sent_at, message.sender_id];
    const [rows] = await promisePool.query(sql, params);
    return {message_id: rows.insertId};
  } catch (error) {
    console.error('Model: ListConversation ', error);
    return {error: 500, message: 'db error'};
  }
}; 

//delete messages by message_id and user_id
const deleteMessageByMessageId = async (message_id, user_id) => {
  try {
    const sql = `DELETE FROM Messages WHERE message_id = ${message_id} AND sender_id=${user_id}`;
    const [rows] = await promisePool.query(sql);
    if (rows.affectedRows === 0) {
      return {error: 404, message: 'no message found'};
    }
    return {message: 'message deleted', message_id: message_id};
  } catch (error) {
    console.error('Model: ListConversation ', error);
    return {error: 500, message: 'db error'};
  }
};

export {
  listAllMessages,
  listMessagebyAuthor,
  listMessageByMessage_id,
  listConverstation,
  listConversationByUserId,
  insertMessage,
  deleteMessageByMessageId
};