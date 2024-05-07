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
  let currentRecipientId = null;

  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  menuToggle.addEventListener('click', function () {
    menu.classList.toggle('show');
  });
  sendButton.addEventListener('click', sendMessage);

  fetchUsers();

  async function fetchUsers() {
    const usersUrl = 'https://hyte24.northeurope.cloudapp.azure.com/api/student/';
    fetchData(usersUrl, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((users) => {
      displayUsers(users);
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
    });
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
    currentRecipientId = selectedUserId;
    const username = await fetchUserName(selectedUserId);
    updateConversationHeader(username);
    fetchConversationsAndMessagesForUser(selectedUserId);
    fetchConversationsAndMessagesForUser(selectedUserId);
  }

  async function fetchConversationsAndMessagesForUser(selectedUserId) {
    const apiUrl = `https://hyte24.northeurope.cloudapp.azure.com/api/messages/user/${selectedUserId}`;
    fetchData(apiUrl, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((conversations) => {
        messagesContainer.innerHTML = ''; // Tyhjennä viestit
        if (conversations.length > 0) {
          currentConversationId = conversations[0].conversation_id; // Oleta, että valitaan ensimmäinen keskustelu
          conversations.forEach((conversation) =>
            fetchMessagesForConversation(conversation.conversation_id),
          );
        } else {
          currentConversationId = null; // Ei keskusteluja, tyhjennä nykyinen ID
        }
      })
      .catch((error) => {
        console.error('Error fetching conversations:', error);
        messagesContainer.innerHTML = 'Ei viestejä.';
      });
  }

  async function fetchUserName(userId) {
    const userUrl = `https://hyte24.northeurope.cloudapp.azure.com/api/users/${userId}`;
    try {
      const response = await fetch(userUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch user');
      const userData = await response.json();
      return userData[0].username; // Olettaen, että käyttäjät palautetaan listana
    } catch (error) {
      console.error('Failed to fetch user name:', error);
      return "Nimetön käyttäjä"; // Oletusarvo virhetilanteessa
    }
  }

  function updateConversationHeader(username) {
    const header = document.getElementById('conversation-header');
    header.textContent = `Keskustelu käyttäjän ${username} kanssa`;
  }
  
  async function selectRecipient(event) {
    const selectedUserId = event.target.dataset.userId;
    recipientInput.dataset.userId = selectedUserId;
    const username = await fetchUserName(selectedUserId);
    updateConversationHeader(username);
    fetchConversationsAndMessagesForUser(selectedUserId);
  }


  function fetchMessagesForConversation(conversationId) {
    const apiUrl = `https://hyte24.northeurope.cloudapp.azure.com/api/messages/conversation/${conversationId}`;
    fetchData(apiUrl, { headers: { Authorization: `Bearer ${token}` }})
      .then((messages) => {
        if (Array.isArray(messages) && messages.length > 0) {
          displayMessages(messages, userId);
        } else {
          messagesContainer.innerHTML = '<div class="no-messages">Ei viestejä tässä keskustelussa.</div>';
        }
      })
      .catch((error) => {
        console.error(`Viestien haku epäonnistui keskustelulle ${conversationId}:`, error);
      });
  }
  

  function displayMessages(messages, userId) {
    const container = document.getElementById('messages-container');
    container.innerHTML = ''; // Tyhjennetään vanhat viestit

    messages.forEach((message) => {
      const utcDate = new Date(message.message_sent_at);
      const localDate = utcDate.toLocaleString('fi-FI', {
        timeZone: 'Europe/Helsinki',
      }); // Olettaen että haluat näyttää ajan Helsingin aikavyöhykkeellä
      const messageDiv = document.createElement('div');
      // Määritellään viestin tyyliluokka sen perusteella, onko käyttäjä lähettäjä vai vastaanottaja
      if (parseInt(message.sender_id) === parseInt(userId)) {
        messageDiv.className = 'message client';
      } else {
        messageDiv.className = 'message professional';
      }
      messageDiv.innerHTML = `
      <div class="date">${localDate}</div>
        <div class="message-text">${message.message_content}</div>
      `;
      container.appendChild(messageDiv);
    });

    if (messages.length === 0) {
      container.innerHTML =
        '<div class="no-messages">Ei saapuneita viestejä</div>';
    }
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

    const sendMessageUrl = 'https://hyte24.northeurope.cloudapp.azure.com/api/messages';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(messageData),
    };

    try {
      const response = await fetchData(sendMessageUrl, options);
      console.log(response.conversation_id);
      // Jos viestin lähettäminen onnistuu ja BE palauttaa conversation_id:n
      if (response.conversation_id) {
        console.log('Message sent successfully');

        let currentConversationId = response.conversation_id;
        console.log(currentConversationId);
        messageInput.value = '';
        fetchMessagesForConversation(currentConversationId);
      } else {
        console.error('Viestin lähettäminen epäonnistui')
        showToast('Viestin lähettäminen epäonnistui');
      }
    } catch (e) {
      console.error(e);
      showToast('Viestin lähettäminen epäonnistui');
    }
  }
});
