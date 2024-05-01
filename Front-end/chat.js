import './style.css';
import {fetchData} from './fetch.js';
import {showToast} from './toast.js';

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  menuToggle.addEventListener('click', function () {
    menu.classList.toggle('show');
  });
});

// chat
document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');
  const sendButton = document.getElementById('send-button');
  const conversationList = document.getElementById('conversation-list');
  const messageContainer = document.getElementById('messages-container');
  const messageWrite = document.querySelector('.message-write');

  conversationList.addEventListener('click', (event) => {
    const targetElement = event.target.closest('li');
    if (targetElement && targetElement.dataset.conversationId && targetElement.dataset.recipientId) {
        currentConversation = targetElement.dataset.conversationId;
        currentRecipientId = targetElement.dataset.recipientId;
        console.log(`Current recipient ID: ${currentRecipientId}`);
        console.log(currentConversation);
        fetchMessagesForConversation(currentConversation);
    }
  });
  

  sendButton.addEventListener('click', sendMessage);

  let currentRecipientId = null;
  let currentConversation = null;

  const conversationsUrl = `http://localhost:3000/api/messages/user/${userId}`;

  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  fetchData(conversationsUrl, fetchOptions)
    .then((conversations) => {
      // Ensimmäinen tarkistus: Onko 'conversations' taulukko?
      if (Array.isArray(conversations) && conversations.length > 0) {
        messageWrite.style.display = 'block'; // Varmista, että viestialue on näkyvissä, jos keskusteluja on
        // Oletetaan, että serverin vastauksesta saat 'recipient_id' jokaiselle keskustelulle
        conversations.forEach((conversation) => {
          const conversationElement = document.createElement('li');
          conversationElement.textContent = `Keskustelu ${conversation.conversation_id}`;
          conversationElement.dataset.conversationId = conversation.conversation_id;
          conversationElement.dataset.recipientId = conversation.recipient_id;
          conversationList.appendChild(conversationElement);
        });
        
      } else {
        // Ei keskusteluja tai virheellinen vastaus
        messageContainer.innerHTML =
          '<div class="no-messages">Sinulle ei ole uusia viestejä.</div>';
        messageWrite.style.display = 'none';
      }
    })
    .catch((error) => {
      console.error('Keskusteluiden haku epäonnistui:', error);
      // Näytä virheilmoitus käyttäjälle
      messageContainer.innerHTML =
        '<div class="no-messages">Virhe haettaessa keskusteluja.</div>';
      messageWrite.style.display = 'none';
    });

  // Käytä yhtä tapahtumankäsittelijää koko listalle, joka reagoi klikkauksiin
  conversationList.addEventListener('click', (event) => {
    const targetElement = event.target.closest('li');
    if (targetElement && targetElement.dataset.conversationId) {
      console.log('Selected conversation ID:', targetElement.dataset.conversationId);
      console.log('Selected recipient ID:', targetElement.dataset.recipientId); // Tarkista tämä logi
      currentConversation = targetElement.dataset.conversationId;
      currentRecipientId = targetElement.dataset.recipientId;
      if (!currentRecipientId) {
        console.error('No recipient ID found for selected conversation');
      }
      // Tyhjennä viestit ja hae uudet
      const container = document.getElementById('messages-container');
      container.innerHTML = '';
      fetchMessagesForConversation(currentConversation);
    }
  });

  // Hae viestit keskusteluiden perusteella
  function fetchMessagesForConversation(conversationId) {
    const messagesUrl = `http://localhost:3000/api/messages/conversation/${conversationId}`;
    fetchData(messagesUrl, fetchOptions)
        .then((messages) => {
            if (Array.isArray(messages) && messages.length > 0) {
                const nonUserMessage = messages.find(message => message.sender_id !== userId);
                if (nonUserMessage) {
                    currentRecipientId = nonUserMessage.sender_id;
                }
                displayMessages(messages, userId);
            } else {
                messageContainer.innerHTML = '<div class="no-messages">Ei viestejä tässä keskustelussa.</div>';
            }
        })
        .catch((error) => {
            console.error(`Viestien haku epäonnistui keskustelulle ${conversationId}:`, error);
        });
}

  


  // Näytä viestit
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

  function sendMessage() {
    console.log('Sending message...');
    console.log('Current conversation ID:', currentConversation);
    console.log('Current recipient ID:', currentRecipientId)
    console.log('Current conversation:', currentConversation);
    const token = localStorage.getItem('token');
    const senderId = localStorage.getItem('user_id');
    const input = document.getElementById('message-input');
    const message = input.value;

    const isoStringWithoutZ = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    const messageData = {
      conversation_id: currentConversation,
      recipient_id: currentRecipientId,
      message_content: message,
      message_sent_at: isoStringWithoutZ,
      sender_id: senderId,
    };
    console.log(messageData);

    const messageUrl = `http://localhost:3000/api/messages/`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(messageData),
    };
    fetchData(messageUrl, options);
    input.value = '';
    console.log('Lähetetty viesti:', message);
    fetchMessagesForConversation(currentConversation);
  }
});

// logout
document.addEventListener('DOMContentLoaded', function () {
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
});
