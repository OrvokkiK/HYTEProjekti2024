import './style.css';
import {fetchData} from './fetch.js';
import {showToast} from './toast.js';

document.addEventListener('DOMContentLoaded', function () {
  const sendButton = document.getElementById('send-button');
  const messageInput = document.getElementById('message-content');
  const recipientInput = document.getElementById('recipient-id');
  const messagesContainer = document.getElementById('messages-container');
  const userList = document.getElementById('user-list');
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');
  console.log('User ID on load:', userId);
  let currentConversationId = null;

  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  menuToggle.addEventListener('click', function () {
    menu.classList.toggle('show');
  });
  sendButton.addEventListener('click', sendMessage);

  fetchUsers();

  async function fetchUsers() {
    const usersUrl = 'http://localhost:3000/api/users/';
    try {
      const users = await fetchData(usersUrl, {
        headers: {Authorization: `Bearer ${token}`},
      });
      displayUsers(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  function displayUsers(users) {
    userList.innerHTML = '';
    users.forEach((user) => {
      const userItem = document.createElement('li');
      userItem.textContent = user.username;
      userItem.dataset.userId = user.user_id;
      userItem.addEventListener('click', selectRecipient);
      userList.appendChild(userItem);
    });
  }

  async function selectRecipient(event) {
    const selectedUserId = event.target.dataset.userId;
    recipientInput.dataset.userId = selectedUserId;
    fetchConversationsAndMessagesForUser(selectedUserId);
  }

  async function fetchConversationsAndMessagesForUser(selectedUserId) {
    const apiUrl = `http://localhost:3000/api/messages/user/${selectedUserId}`;
    try {
      const conversations = await fetchData(apiUrl, {
        headers: {Authorization: `Bearer ${token}`},
      });
      messagesContainer.innerHTML = ''; // Tyhjennä viestit
      if (conversations.length > 0) {
        currentConversationId = conversations[0].conversation_id; // Oleta, että valitaan ensimmäinen keskustelu
        conversations.forEach((conversation) =>
          fetchMessagesForConversation(conversation.conversation_id),
        );
      } else {
        currentConversationId = null; // Ei keskusteluja, tyhjennä nykyinen ID
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
      messagesContainer.innerHTML = 'Ei viestejä.';
    }
  }

  function fetchMessagesForConversation(conversationId, userId) {
    const apiUrl = `http://localhost:3000/api/messages/conversation/${conversationId}`;
    fetchData(apiUrl, {headers: {Authorization: `Bearer ${token}`}})
      .then((messages) => {
        displayMessages(messages, userId); // Varmista, että userId on tässä oikein
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  }

function displayMessages(messages, userId) {
  messagesContainer.innerHTML = ''; // Tyhjennä viestit ennen uusien näyttämistä
  messages.forEach((message) => {
    const className = parseInt(message.sender_id) === parseInt(userId) ? 'client' : 'professional';
    console.log(className);
    displayMessage(message, className);
  });
}

  

  async function sendMessage() {
    const recipientId = recipientInput.dataset.userId;
    const messageContent = messageInput.value;
    const isoStringWithoutZ = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    const messageData = {
      conversation_id: currentConversationId,
      sender_id: userId,
      recipient_id: recipientId,
      message_content: messageContent,
      message_sent_at: isoStringWithoutZ,
    };

    const sendMessageUrl = 'http://localhost:3000/api/messages';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(messageData),
    };

    fetchData(sendMessageUrl, options);
    console.log('Message sent successfully');
    messageInput.value = '';
    displayMessage(messageData, 'client');
  }

  function displayMessage(message, userId) {
    const className = parseInt(message.sender_id) === parseInt(userId) ? 'client' : 'professional';
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    const messageTime = new Date(message.message_sent_at).toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' });
    messageDiv.innerHTML = `
      <div class="date">${messageTime}</div>
      <div class="message-text">${message.message_content}</div>
    `;
    messagesContainer.appendChild(messageDiv);
  }
  
  
});
