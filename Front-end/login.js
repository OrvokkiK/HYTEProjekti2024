import './style.css';
import { showToast } from './toast.js';
import { fetchData } from './fetch.js';

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('show');
    });

    document.getElementById('userLoginBtn').addEventListener('click', function() {
        document.getElementById('userLoginForm').style.display = 'block';
        document.getElementById('professionalLoginForm').style.display = 'none';
    });

    document.getElementById('professionalLoginBtn').addEventListener('click', function() {
        document.getElementById('userLoginForm').style.display = 'none';
        document.getElementById('professionalLoginForm').style.display = 'block';
    });

    // Asiakkaan kirjautumislogiikka
    const userLoginForm = document.getElementById('userLoginForm');
    userLoginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const form = event.target;
        const url = 'http://localhost:3000/api/auth/login';
        const redirectUrl = 'home.html'; // Ohjaus asiakkaan etusivulle
        processLogin(url, form, redirectUrl);
    });

    // Ammattilaisen kirjautumislogiikka
    const professionalLoginForm = document.getElementById('professionalLoginForm');
    professionalLoginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const form = event.target;
        const url = 'http://localhost:3000/api/auth/professional/login';
        const redirectUrl = 'professional.html'; // Ohjaus ammattilaisen sivulle
        processLogin(url, form, redirectUrl);
    });
});

function processLogin(url, form, redirectUrl) {
    showToast('Kirjaudutaan sisään...');

    const usernameInput = form.querySelector('input[type="text"]');
    const passwordInput = form.querySelector('input[type="password"]');

    const data = {
        username: usernameInput.value,
        password: passwordInput.value,
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    fetchData(url, options).then(data => {
        if (data.token) {
            showToast('Kirjautuminen onnistui!');
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.user.family_name);
            localStorage.setItem('user_id', data.user_id);
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 1000);
        } else {
            showToast('Väärä salasana tai käyttäjätunnus.');
        }
    }).catch(error => {
        console.error('Login failed:', error);
        showToast('Kirjautuminen epäonnistui. Yritä uudelleen.');
    });
}
