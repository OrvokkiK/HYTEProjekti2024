// new-conversationb.mjs
// Creates new conversation id for a new conversation between two users

import promisePool from "./database.mjs";

async function getNewId () {
try {
  const sql = 'SELECT MAX(conversation_id) AS MAX from Messages;'
  const response = await promisePool.query(sql);
  const responseObject = response[0][0]
  const id = responseObject.MAX;
  const newId = id + 1;
  console.log('New id', newId);
  return newId
} catch (error) {
  return {error: 500, message: 'db error'};
}
};

export {getNewId}