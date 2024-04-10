import './style.css';

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  menuToggle.addEventListener("click", function () {
    menu.classList.toggle("show");
  });
});

const loginUser = document.querySelector('.loginuser');
loginUser.addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = 'home.html';
});