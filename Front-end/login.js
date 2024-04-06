import './style.css';
import {showToast} from './toast.js';
// import {fetchData} from './fetch.js';

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  menuToggle.addEventListener('click', function() {
    menu.classList.toggle('show');
  });

  const loginUser = document.querySelector('.loginuser');

  loginUser.addEventListener('click', async (evt) => {
    evt.preventDefault();
    const url = 'https://localhost:3000/api/auth/login'; // Varmista, että osoite on oikea

    const form = document.querySelector('.login_form');

    const data = {
      username: form.querySelector('input[name="username"]').value,
      password: form.querySelector('input[name="password"]').value,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();

      if (responseData.token) {
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('name', responseData.user.username);
        localStorage.setItem('user_id', responseData.user.user_id);
        showToast('Kirjautuminen onnistui!');
        setTimeout(() => {
          window.location.href = 'home.html'; // Uudelleenohjaus kotisivulle
        }, 2000);
      } else {
        showToast('Unauthorized: username or password incorrect!');
      }
    } catch (error) {
      showToast(`An error occurred: ${error.message}`);
    }
  });
});

