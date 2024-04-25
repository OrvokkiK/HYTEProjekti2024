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
document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('user_id');
  const url = `http://localhost:3000/api/messages/converstation/${id}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  fetchData(url, options).then((data) => {
    const chatContainer = document.getElementById('chat-container');
    
    // Tyhjennä chatContainer ennen uusien viestien lisäämistä
    chatContainer.innerHTML = '';

    data.forEach(message => {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      // Lisää luokka määrittämään, kumpi lähetti viestin
      if (message.sender_id === id) {
        // Jos käyttäjä on lähettäjä, viestit oikealle
        messageElement.classList.add('user-message');
      } else {
        // Jos ammattilainen on lähettäjä, viestit vasemmalle
        messageElement.classList.add('professional-message');
      }
      
      // Lisää viestin sisältö ja lähetysaika
      messageElement.innerHTML = `
        <div class="message-meta">
          <span class="message-date">${new Date(message.message_sent_at).toLocaleDateString()}</span>
        </div>
        <div class="message-content">
          ${message.message_content}
        </div>
      `;
      
      // Lisää viesti chatContaineriin
      chatContainer.appendChild(messageElement);
    });
  });
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