import './style.css';
import {fetchData} from './fetch.js';
import {showToast} from './toast.js';

let currentUserId;

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  menuToggle.addEventListener('click', function () {
    menu.classList.toggle('show');
  });

  const backButton = document.querySelector('.back');
  backButton.addEventListener('click', function () {
    document.getElementById('detailsModal').style.display = 'none';
    document.getElementById('dataSelectionModal').style.display = 'block';
  })

  const logoutLink = document.querySelector('.logout a');
  logoutLink.addEventListener('click', function (event) {
    event.preventDefault();
    console.log('Logout event triggered');  // Lisää tämä rivi tarkistaaksesi, että tapahtumankäsittelijä laukeaa
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    showToast('Kirjaudutaan ulos.');
    setTimeout(() => {
      console.log('Redirecting to index.html');  // Varmista, että uudelleenohjaus toimii
      window.location.href = 'index.html';
    }, 2000);
  });
  

  fetchUsers();
  setupUserTableClick();
  setupModalSelection();
  setupModalControls();
});

async function fetchUsers() {
  const url = 'http://localhost:3000/api/student/';
  // http://localhost:3000/api/student/ 
  const token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  fetchData(url, options).then((users) => {
    console.log(users);
    displayUsers(users);
  });
}

function displayUsers(users) {
    const tbody = document.querySelector('#userTable tbody');
    tbody.innerHTML = '';

    users.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${user.user_id}</td><td>${user.username}</td><td>${user.title}</td>`;
        row.onclick = () => selectUser(user.user_id); // Lisätään klikkauskuuntelija
        tbody.appendChild(row);
    });
}

function selectUser(userId) {
    currentUserId = userId;
    document.getElementById('dataSelectionModal').style.display = 'block';
  }

  function setupUserTableClick() {
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.addEventListener('click', (event) => {
        let target = event.target;
        while (target.tagName !== 'TD') target = target.parentNode;
        const userId = target.parentNode.firstChild.textContent;
        selectUser(userId);
    });
} 

function setupModalSelection() {
    // Oletetaan, että dataSelectionModal sisältää linkkejä tai nappeja eri datatyyppeille
    document.querySelectorAll('.data-select').forEach(button => {
        button.addEventListener('click', function() {
            fetchDataForModal(button.dataset.type); // 'hrv', 'analysis', 'lifestyle', 'symptoms'
        });
    });
}

function setupModalControls() {

    document.querySelectorAll('.modal').forEach(modal => {
        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = function () {
            modal.style.display = 'none';
        };
    });
    window.onclick = function (event) {
        document.querySelectorAll('.modal').forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    };
}


async function fetchDataForModal(dataType) {
    const urls = {
        'hrv': `http://localhost:3000/api/hrv/${currentUserId}`,
        'kokonaisanalyysit': `http://localhost:3000/api/analysis/user/${currentUserId}`,
        'elämäntapakyselyt': `http://localhost:3000/api/lifestyle/${currentUserId}`,
        'oirearviokyselyt': `http://localhost:3000/api/symptoms/${currentUserId}`
    };

    fetchData(urls[dataType], {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(data => {
        console.log(data);
        displayDataDetails(data, dataType);
        document.getElementById('dataSelectionModal').style.display = 'none'; // Piilota valikkomodaali
        document.getElementById('detailsModal').style.display = 'block'; // Näytä tietomodaali
    }).catch(error => {
        console.error('Error fetching data:', error);
        showToast('Ei dataa saatavilla.');
    });
}
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('fi-FI', options);
  }

function displayDataDetails(data, dataType) {
    const detailsContent = document.getElementById('detailsContent');
    detailsContent.innerHTML = `<h3>${dataType.toUpperCase()} :</h3>`;

    let headers = {
        'hrv': ['Päivämäärä', 'Bpm Keskiarvo', 'Stressi-indeksi', 'Valmiustila (%)', 'SDNN (ms)', 'RMDDS (ms)'],
        'kokonaisanalyysit': ['Päivämäärä', 'Analyysi', 'Pisteet'],
        'oirearviokyselyt': ['Päivämäärä', 'Oireet', 'Stressitaso'],
        'elämäntapakyselyt': ['Päivämäärä', 'Unen määrä', 'Unen laatu', 'Tuntee olonsa terveeksi', 'Liikunta', 'Alkoholiannokset', 'Nikotiini(mg)', 'Kofeiini' ]
    };

    let fields = {
        'hrv': ['entry_date', 'av_hrv', 'stress_index', 'readiness', 'sdnn_ms', 'mean_rr_ms'],
        'kokonaisanalyysit': ['created_at', 'analysis_result', 'analysis_enumerated'],
        'oirearviokyselyt': ['entry_date', 'stress_level'],
        'elämäntapakyselyt': ['entry_date', 'hours_slept', 'quality_sleep', 'feel_healthy', 'physical_activity', 'alcohol_intake', 'nicotine_intake', 'caffeine_intake']
    };

    let tableHtml = `<table class='data-table'>
        <thead>
            <tr>`;
    headers[dataType].forEach(header => {
        tableHtml += `<th>${header}</th>`;
    });
    tableHtml += `</tr>
        </thead>
        <tbody>`;

        data.forEach(entry => {
            tableHtml += `<tr>`;
            fields[dataType].forEach(field => {
                if (field === 'entry_date' || field === 'created_at') {
                    tableHtml += `<td>${formatDate(entry[field])}</td>`;
                } else if (dataType === 'hrv' && typeof entry[field] === 'number') {
                    tableHtml += `<td>${Math.round(entry[field])}</td>`; // Pyöristetään kaikki numerot
                } else if (dataType === 'oirearviokyselyt' && field === 'stress_level') {
                    let symptomsList = Object.keys(entry)
                        .filter(key => entry[key] === 1 && !['symptom_id', 'user_id', 'entry_date', 'stress_level'].includes(key))
                        .map(symptom => symptom.replace(/_/g, ' ')); // Muuta alaviivat välilyönneiksi oireiden nimissä
                    let symptomsStr = symptomsList.length > 0 ? symptomsList.join(', ') : 'Ei oireita';
                    tableHtml += `<td>${symptomsStr}</td>`; // Listaa oireet
                    tableHtml += `<td>${entry.stress_level}</td>`; // Lisää stressitaso
                } else {
                    tableHtml += `<td>${entry[field]}</td>`;
                }
            });
            tableHtml += `</tr>`;
        });

    tableHtml += `</tbody></table>`;
    detailsContent.innerHTML += tableHtml;
}








