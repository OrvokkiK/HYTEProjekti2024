import './style.css';
import { fetchData } from './fetch.js';
import { showToast } from './toast.js';

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
  
    menuToggle.addEventListener('click', function () {
      menu.classList.toggle('show');
    });
  
    // Haetaan käyttäjät ja näytetään lista
    fetchUsers();
  
    const logoutLink = document.querySelector('.logout a');
    logoutLink.addEventListener('click', function (event) {
      event.preventDefault();
      localStorage.removeItem('analysisModalShown');
      localStorage.removeItem('user_id');
      localStorage.removeItem('token');
      showToast('Kirjaudutaan ulos.');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    });

    const sendButton = document.getElementById('send-button');
    sendButton.addEventListener('click', sendMessage);
  });
  

  async function fetchUsers() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    const usersUrl = 'http://localhost:3000/api/users';
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const users = await fetchData(usersUrl, options);
      console.log(users); 
      displayUsers(users, userId);
    } catch (error) {
      console.error('Virhe käyttäjien haussa:', error);
      showToast('Virhe käyttäjien haussa.');
    }
  }
  
  function displayUsers(users, currentUserId) {
    const userList = document.getElementById('conversation-list');
    userList.innerHTML = ''; // Tyhjennetään lista ennen päivitystä
  
    users.forEach((user) => {
      if (user.user_id !== currentUserId) {
        const userItem = document.createElement('li');
        userItem.textContent = user.username;
        userItem.dataset.userId = user.user_id;
        userItem.addEventListener('click', selectRecipient);
        userList.appendChild(userItem);
      }
    });
  }
  
  function selectRecipient(event) {
    const recipientId = event.target.dataset.userId;
    const recipientName = event.target.textContent;
    const recipientInput = document.getElementById('recipient-input'); // Korjattu ID
    recipientInput.value = recipientName;
    recipientInput.dataset.userId = recipientId;
  }
  
  async function sendMessage() {
    const token = localStorage.getItem('token');
    const senderId = localStorage.getItem('user_id');
    const recipientInput = document.querySelector('[data-input-type="recipient"]');
    const recipientId = recipientInput.dataset.userId;
    const messageInput = document.querySelector('[data-input-type="message"]');
    const messageContent = messageInput.value;
  
    if (!recipientId) {
      showToast('Valitse ensin vastaanottaja.');
      return;
    }
  
    const isoStringWithoutZ = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
  
    const messageData = {
      sender_id: senderId,
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
  
    try {
      const response = await fetchData(sendMessageUrl, options);
      if (response.ok) {
        showToast('Viesti lähetetty onnistuneesti.');
        messageInput.value = '';
        recipientInput.value = ''; // Tyhjennä vastaanottajan valintakenttä
        displaySentMessage(messageData);
        fetchMessagesForConversation(recipientId);  // Tyhjennä viestikenttä lähetyksen jälkeen
      } else {
        showToast('Viestin lähetys epäonnistui.');
      }
    } catch (error) {
      console.error('Virhe viestin lähetyksessä:', error);
      showToast('Virhe viestin lähetyksessä.');
    }
  }
  function displaySentMessage(messageData) {
    const messagesContainer = document.getElementById('messages-container');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `
        <div class="message-sender">${messageData.sender_id}</div>
        <div class="message-content">${messageData.message_content}</div>
        <div class="message-time">${messageData.message_sent_at}</div>
    `;
    messagesContainer.appendChild(messageDiv);
}
  