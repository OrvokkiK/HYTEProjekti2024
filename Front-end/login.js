import './style.css';
import {showToast} from './toast.js';
import {fetchData} from './fetch.js';

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  menuToggle.addEventListener('click', function() {
    menu.classList.toggle('show');
  });

  const loginUser = document.querySelector('.loginuser');

  loginUser.addEventListener('click', async (evt) => {
    evt.preventDefault();
    const url = 'http://localhost:3000/api/auth/login'; // Varmista, että osoite on oikea

    const form = document.querySelector('.login_form');
    console.log(form); 

    const usernameInput = form.querySelector('input[name="username"]'); 
    const passwordInput = form.querySelector('input[name="password"]');
    
    const data = {
      username: usernameInput.value,
      password: passwordInput.value,
    };
    console.log(data);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    console.log(options);

    fetchData(url, options).then((data) => {
      console.log(data);
      console.log(data.token);
      localStorage.setItem('data:', data);
    

      if (data.token == undefined) {
        showToast('Unauthorized: username or password incorrect!');
      } else {
        showToast('Kirjautuminen onnistui!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.user.family_name);
        localStorage.setItem('user_id', data.user_id);
        setTimeout(() => {
          window.location.href = 'home.html'; 
        }, 1000);
      }
    });
});
});
