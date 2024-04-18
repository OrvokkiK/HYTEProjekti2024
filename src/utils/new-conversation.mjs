// new-conversationb.mjs
// Creates new conversation id for a new conversation between two users

import promisePool from "./database.mjs";
/**
 * 
 */

async function getNewId (req, res, next) {
try {
  const sql = 'SELECT MAX(conversation_id) FROM Messages;'
  const response = await promisePool.query(sql);
  console.log('[Middlewares] getNewId: ', response);
  const newId = response + 1;
  return newId
  next();
} catch (error) {
  return {error: 500, message: 'db error'};
}
};

export {getNewId}