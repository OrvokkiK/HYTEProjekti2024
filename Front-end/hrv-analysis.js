import { Chart } from "chart.js/auto";

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('myBarChart').getContext('2d');
    const userId = localStorage.getItem('user_id'); // Korvaa oikealla käyttäjä-ID:llä
    const token = localStorage.getItem('token'); // Korvaa oikealla tokenilla
    const url = `http://localhost:3000/api/hrv/${userId}`;
      
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
  
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // Oletetaan, että saat dataa muodossa [{ date: '2021-05-01', value1: 20, value2: 30, value3: 40, value4: 50 }, ...]
        const chartData = {
            labels: data.map(item => item.entry_date.split('T')[0]), // muotoile päivämäärät
            datasets: [{
              label: 'Stressi-indeksi',
              data: data.map(item => item.stress_index),
              backgroundColor: '#65057f',
              borderWidth: 1
            }, {
                label: 'Readiness',
                data: data.map(item => item.readiness),
                backgroundColor: '#6c49ea',
                borderWidth: 1
              }, {
                label: 'Keskisyke',
                data: data.map(item => item.av_hrv),
                backgroundColor: '#3498db',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
              }, {
                label: 'SDNN ms',
                data: data.map(item => item.sdnn_ms),
                backgroundColor: '#33d3d0',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }]
            };
  
            const myBarChart = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                  responsive: true,
                  maintainAspectRatio: true, 
                  plugins: {
                    legend: {
                      labels: {
                        font: {
                          size: 14
                        }
                      }
                    },
                    title: {
                      display: true,
                      text: 'HRV-mittaustulokset',
                      font: {
                        size: 16
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        font: {
                          size: 12
                        }
                      }
                    },
                    x: {
                      ticks: {
                        font: {
                          size: 12
                        }
                      }
                    }
                  }
                }
              });
      })
      .catch(error => {
        console.error('Fetching data failed:', error);
      });
  });
  