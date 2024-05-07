import {Chart, registerables} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { showToast } from './toast';

Chart.register(...registerables, zoomPlugin);

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  menuToggle.addEventListener('click', function () {
    menu.classList.toggle('show');
  });
  const ctx = document.getElementById('myBarChart').getContext('2d');
  const userId = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');
  const url = `https://hyte24.northeurope.cloudapp.azure.com/api/hrv/${userId}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const chartData = {
        labels: data.map((item) => item.entry_date.split('T')[0]), // Format dates
        datasets: [
          {
            label: 'Stressi-indeksi',
            data: data.map((item) => item.stress_index),
            backgroundColor: '#65057f',
            borderWidth: 1,
          },
          {
            label: 'Readiness',
            data: data.map((item) => item.readiness),
            backgroundColor: '#6c49ea',
            borderWidth: 1,
          },
          {
            label: 'Keskisyke',
            data: data.map((item) => item.av_hrv),
            backgroundColor: '#3498db',
            borderWidth: 1,
          },
          {
            label: 'SDNN',
            data: data.map((item) => item.sdnn_ms),
            backgroundColor: '#33d3d0',
            borderWidth: 1,
          },
          {
            label: 'Mean RR',
            data: data.map((item) => item.mean_rr_ms),
            backgroundColor: '#0056b3',
            borderWidth: 1,
          },
        ],
      };

      const myBarChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false, 
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 18,
                },
              },
            },
            title: {
              display: true,
              text: 'HRV-mittaustulokset',
              font: {
                size: 20,
              },
            },
            zoom: {
              pan: {
                enabled: true,
                mode: 'x',
                rangeMin: {
                  x: null,
                },
                rangeMax: {
                  x: null,
                },
              },
              zoom: {
                wheel: {
                  enabled: true,
                  speed: 0.1,
                  mode: 'x',
                },
                pinch: {
                  enabled: true,
                  mode: 'x',
                },
                mode: 'x',
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                font: {
                  size: 14,
                },
              },
            },
            x: {
              type: 'category',
              ticks: {
                autoSkip: true,
                maxRotation: 0,
              }
            }
          }
        }
      });
      const chartArea = myBarChart.chartArea;
      const minPixel = chartArea.right - 10 * (chartArea.right - chartArea.left) / chartData.labels.length;
      myBarChart.zoom(10, 0, {x: minPixel});
    })
    .catch((error) => {
      console.error('Fetching data failed:', error);
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
