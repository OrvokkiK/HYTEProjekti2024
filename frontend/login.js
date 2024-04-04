import './style.css';
import { showToast } from "./toast.js";

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  menuToggle.addEventListener("click", function () {
    menu.classList.toggle("show");
  });
});

const loginUser = document.querySelector('.loginuser');

loginUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  const url = 'https://localhost:3000/api/auth/login';

  const form = document.querySelector('.login_form');

  const data = {
    username: form.querySelector('input[name=username]').value,
    password: form.querySelector('input[name=password]').value,
  };

  const options = {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  };

  fetchData(url, options).then((data) => {
    console.log(data);
    console.log(data.token);
    localStorage.setItem('token', data.token);

    if (data.token == undefined) {
      showToast('Unauthorized: username or password incorrect!');
    } else {
      showToast(data.message);
      localStorage.setItem('name', data.user.username);
      localStorage.setItem('user_id',data.user.user_id);
      setTimeout(() => {
        window.location.href = 'home.html';
      }, 2000);
      
      }
      logResponse('loginResponse', `localStorage set with token 
      value: ${data.token}`);
    });
});