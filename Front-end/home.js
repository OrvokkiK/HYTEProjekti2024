import './style.css';
import {fetchData} from './fetch.js';
import {showToast} from './toast.js';

// Kirjautumisajan tarkistus ja automaattinen uloskirjautuminen
function checkAutoLogout() {
  const loginTime = localStorage.getItem('loginTime');
  if (
    loginTime &&
    new Date().getTime() - new Date(loginTime).getTime() > 3600000
  ) {
    localStorage.removeItem('analysisModalShown');
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    window.location.href = 'index.html';
    alert('Istuntosi on vanhentunut. Ole hyvä ja kirjaudu uudelleen.');
  }
}

// Tallenna kirjautumisaika
if (!localStorage.getItem('loginTime')) {
  localStorage.setItem('loginTime', new Date().toISOString());
}

// Käyttäjänimen näyttäminen
async function showUserName() {
  const token = localStorage.getItem('token');
  const url = 'http://localhost:3000/api/kubios/user-info';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  fetchData(url, options).then((data) => {
    console.log(data);
    document.getElementById('name').innerHTML = data.user.given_name;
    checkAutoLogout(); // Tarkista aina kun käyttäjätietoja haetaan
  });
}

showUserName();

let symptomsFetched = false;
let lifestyleFetched = false;
let hrvFetched = false;

function checkAllDataFetched() {
  if (symptomsFetched && lifestyleFetched && hrvFetched) {
    fetchDataAndFilter(userId, token).then(
      ([symptomData, hrvData, lifestyleData]) => {
        if (
          symptomData.length > 0 &&
          hrvData.length > 0 &&
          lifestyleData.length > 0
        ) {
          const {symptomPoints, hrvPoints, lifestylePoints} =
            calculateOverallAnalysis(
              symptomData[0],
              hrvData[0],
              lifestyleData[0],
            );
          const overallScore = Math.round(
            (symptomPoints + hrvPoints + lifestylePoints) / 3,
          );
          let stressLevelText = '';
          if (overallScore <= 1) {
            stressLevelText = 'Matala stressi';
          } else if (overallScore <= 2) {
            stressLevelText = 'Kohtalainen stressi';
          } else {
            stressLevelText = 'Korkea stressi';
          }
          showModal(
            symptomPoints,
            hrvPoints,
            lifestylePoints,
            overallScore,
            stressLevelText,
          );
        } else {
          console.log('Kaikkia tietoja ei ole saatavilla analyysia varten.');
        }
      },
    );
  }
}

let oirekyselyDates = [];
let elamantapaDates = [];
let hrvDates = [];

async function fetchDataForCalendar(id, tok) {
  const urls = {
    symptoms: `http://localhost:3000/api/symptoms/${id}`,
    lifestyle: `http://localhost:3000/api/lifestyle/${id}`,
    hrv: `http://localhost:3000/api/hrv/${id}`,
  };
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tok}`,
    },
  };

  function extractLocalDateFromUTC(utcDateString) {
    const date = new Date(utcDateString);
    // Vaihda käyttämään toUTCString poistaa väärin aikavyöhyke offset vaikutukset.
    return date.toISOString().split('T')[0];
  }

  const fetchDataAndExtractDates = async (url) => {
    const response = await fetch(url, options);
    if (!response.ok)
      throw new Error(`Network response was not ok from ${url}`);

    const data = await response.json();
    return data.map((entry) => extractLocalDateFromUTC(entry.entry_date));
  };

  try {
    // Suorita kaikki pyynnöt rinnakkain
    [oirekyselyDates, elamantapaDates, hrvDates] = await Promise.all([
      fetchDataAndExtractDates(urls.symptoms),
      fetchDataAndExtractDates(urls.lifestyle),
      fetchDataAndExtractDates(urls.hrv),
    ]);

    console.log(oirekyselyDates, elamantapaDates, hrvDates);
    symptomsFetched = true;
    lifestyleFetched = true;
    hrvFetched = true;

    console.log(oirekyselyDates, elamantapaDates, hrvDates);
    showCalendar(currentMonth, currentYear);
    checkAllDataFetched();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const id = localStorage.getItem('user_id');
const tok = localStorage.getItem('token');
fetchDataForCalendar(id, tok);

// kalenteri
const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const monthNames = [
  'Tammikuu',
  'Helmikuu',
  'Maaliskuu',
  'Huhtikuu',
  'Toukokuu',
  'Kesäkuu',
  'Heinäkuu',
  'Elokuu',
  'Syyskuu',
  'Lokakuu',
  'Marraskuu',
  'Joulukuu',
];

document
  .getElementById('prevMonth')
  .addEventListener('click', () => previous());
document.getElementById('nextMonth').addEventListener('click', () => next());

function showCalendar(month, year) {
  const firstDay = (new Date(year, month).getDay() + 6) % 7;
  const daysInMonth = 32 - new Date(year, month, 32).getDate();

  const tbl = document.getElementById('calendar-body');
  tbl.innerHTML = '';

  document.getElementById('monthAndYear').innerText =
    monthNames[month] + ' ' + year;

  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      if (i === 0 && j < firstDay) {
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        const cellDate = new Date(year, month, date);
        const cellDateFormatted = cellDate.toISOString().split('T')[0];

        cell.textContent = date;
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.classList.add('current-date');
        }



        if (oirekyselyDates.includes(cellDateFormatted)) {
          const dot = document.createElement('span');
          dot.className = 'dot oirekysely-dot';
          cell.appendChild(dot);
        }
        if (elamantapaDates.includes(cellDateFormatted)) {
          const dot = document.createElement('span');
          dot.className = 'dot elamantapa-dot';
          cell.appendChild(dot);
        }
        if (hrvDates.includes(cellDateFormatted)) {
          const dot = document.createElement('span');
          dot.className = 'dot hrv-dot';
          cell.appendChild(dot);
        }

        row.appendChild(cell);
        date++;
      }
    }
    tbl.appendChild(row);
  }
}


function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

showCalendar(currentMonth, currentYear);

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  menuToggle.addEventListener('click', function () {
    menu.classList.toggle('show');
  });
});
let chart;
am5.ready(function () {
  // Create root element
  const root = am5.Root.new('graph');

  // Set themes

  root.setThemes([am5themes_Animated.new(root)]);

  // Create chart
  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: 'panX',
      wheelY: 'zoomX',
      paddingLeft: 20,
      paddingRight: 40,
      paddingBottom: 80,
      layout: root.verticalLayout,
    }),
  );

  chart.children.unshift(
    am5.Label.new(root, {
      text: 'Stressitasoanalyysi',
      fontSize: 22,
      fontWeight: '600',
      fontFamily: 'Poppins, sans-serif',
      textAlign: 'center',
      x: am5.percent(50),
      centerX: am5.percent(50),
      paddingTop: 0,
      paddingBottom: 20,
    }),
  );

  const id = localStorage.getItem('user_id');
  const userToken = localStorage.getItem('token');

  const chartUrl = `http://localhost:3000/api/analysis/user/${id}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  };
  fetchData(chartUrl, options).then((data) => {
    console.log(data);
    const chartData = data.map((item) => {
      const date = new Date(item.created_at);
      const formattedDate = date;
      return {
        date: formattedDate,
        value: item.analysis_enumerated,
      };
    });

    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 85,
      minorGridEnabled: true,
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'date',
        renderer: xRenderer,
      }),
    );

    xRenderer.grid.template.setAll({
      location: 1,
    });

    xRenderer.labels.template.setAll({
      paddingTop: 20,
    });

    xAxis.data.setAll(chartData);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 3,
        maxPrecision: 0,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      }),
    );

    // Add series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        categoryXField: 'date',
      }),
    );

    series.columns.template.setAll({
      tooltipText: '{categoryX}: {valueY}',
      tooltipY: 0,
      strokeOpacity: 0,
      cornerRadiusTL: 6,
      cornerRadiusTR: 6,
    });

const valueColors = {
  1: am5.color(0x58D66A), 
  2: am5.color(0xF7AF12), 
  3: am5.color(0xF72E12)  
};

series.columns.template.adapters.add('fill', function(fill, target) {
  const value = target.dataItem.get('valueY');
  return valueColors[value] || fill; // Returns the color based on value or the default fill
});


    series.data.setAll(chartData);
    series.appear();
    chart.appear(1000, 100);
    console.log(chartData);
  });
});

// Oirearviokyselyn toiminnallisuudet
document.addEventListener('DOMContentLoaded', (event) => {
  const surveyModal = document.getElementById('survey-modal');
  const formMental = document.getElementById('survey-form-mental');
  const formPhysical = document.getElementById('survey-form-physical');
  const nextButton = document.querySelector('.next-button');
  const prevButton = document.querySelector('.prev-button');
  const saveButton = document.querySelector('.tallenna-button');
  const closeButton = document.querySelector('.close-button');
  const button = document.getElementById('openArvioKyselyModal');

  // Avaa henkisen oirearvioinnin lomake
  button.onclick = function () {
    const completionDate = localStorage.getItem('surveyCompletionDate');
    const currentDate = new Date().toISOString().split('T')[0];

    if (completionDate === currentDate) {
      alert('Olet jo suorittanut oirearviokyselyn tänään.');
      return;
    }

    surveyModal.style.display = 'block';
    formMental.style.display = 'block';
    formPhysical.style.display = 'none';
  };

  closeButton.onclick = () => {
    surveyModal.style.display = 'none';
  };

  // Siirry fyysiseen oirearviointiin ja kerää henkisen oirearvioinnin tiedot
  nextButton.addEventListener('click', function () {
    formMental.style.display = 'none';
    formPhysical.style.display = 'block';
  });

  // Palaa henkiseen oirearviointiin
  prevButton.addEventListener('click', function () {
    formPhysical.style.display = 'none';
    formMental.style.display = 'block';
  });

  // Kerää fyysisten oireiden tiedot ja lähetä kaikki tiedot palvelimelle
  saveButton.addEventListener('click', function (event) {
    event.preventDefault();

    const stressLevel = document.getElementById('stress_level');

    const stressLevelValue = parseInt(stressLevel.value, 10);

    const dataToSubmit = {
      entry_date: new Date().toISOString().split('T')[0],
      frustration: document.getElementById('frustration').checked ? '1' : '0',
      grumpiness: document.getElementById('grumpiness').checked ? '1' : '0',
      recall_problems: document.getElementById('recall_problems').checked
        ? '1'
        : '0',
      restlesness: document.getElementById('restlesness').checked ? '1' : '0',
      disquiet: document.getElementById('disquiet').checked ? '1' : '0',
      tiredness: document.getElementById('tiredness').checked ? '1' : '0',
      anxiety: document.getElementById('anxiety').checked ? '1' : '0',
      difficulty_making_decisions: document.getElementById('difficulty').checked
        ? '1'
        : '0',
      sleep_disturbances: document.getElementById('sleep_disturbances').checked
        ? '1'
        : '0',
      changes_in_appetite: document.getElementById('changes_appetite').checked
        ? '1'
        : '0',
      headache: document.getElementById('headache').checked ? '1' : '0',
      neck_pain: document.getElementById('neck_pain').checked ? '1' : '0',
      vertigo: document.getElementById('vertigo').checked ? '1' : '0',
      palpitation: document.getElementById('palpitation').checked ? '1' : '0',
      nausea: document.getElementById('nausea').checked ? '1' : '0',
      upset_stomach: document.getElementById('upset_stomach').checked
        ? '1'
        : '0',
      recurring_colds: document.getElementById('recurring_colds').checked
        ? '1'
        : '0',
      back_issues: document.getElementById('back_issues').checked ? '1' : '0',
      stress_level: stressLevelValue,
    };

    // Hae käyttäjän id localStoragesta
    const id = localStorage.getItem('user_id');

    // Hae token localStoragesta
    const token = localStorage.getItem('token');

    // Määrittele pyynnön URL ja optiot
    const url = `http://localhost:3000/api/symptoms/${id}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSubmit),
    };

    // Lähetä tiedot palvelimelle
    fetchData(url, options)
      .then((data) => {
        console.log(data);
        showToast('Oirearviokysely tallennettu.');
        fetchDataForCalendar(id, token).then(() => {
          showCalendar(currentMonth, currentYear);
        });
        surveyModal.style.display = 'none';

        // // Tallenna kyselyn suorituspäivämäärä
        const completionDate = new Date().toISOString().split('T')[0];
        localStorage.setItem('surveyCompletionDate', completionDate);
      })
      .catch((error) => {
        console.error('Error:', error);
        showToast(
          'Virhe tallennettaessa oirearviokyselyä. Täytä lomake uudelleen.',
        );
      });
  });

  closeButton.onclick = () => {
    surveyModal.style.display = 'none';
  };

  window.onclick = (event) => {
    if (event.target === surveyModal) {
      surveyModal.style.display = 'none';
    }
  };
});

// elämäntapakyselyn toiminnallisuudet
document.addEventListener('DOMContentLoaded', (event) => {
  const sleepModal = document.getElementById('sleep-modal');
  const sleepForm = document.getElementById('sleep-form');
  const closeFormButton = document.querySelector('.close-button2');
  const openButton = document.getElementById('openElamantapaKyselyModal');
  const exerciseAdditionalQuestions = document.getElementById(
    'exercise-additional-questions',
  );
  const durationInput = document.getElementById('duration');
  const intensityInput = document.getElementById('intensity');
  const exerciseYes = document.getElementById('exerciseYes');
  const exerciseNo = document.getElementById('exerciseNo');

  function updateAdditionalQuestionsVisibility() {
    if (exerciseYes.checked) {
      exerciseAdditionalQuestions.style.display = '';

      durationInput.required = true;
      intensityInput.required = true;
    } else {
      exerciseAdditionalQuestions.style.display = 'none';

      durationInput.required = false;
      intensityInput.required = false;
    }
  }

  exerciseYes.addEventListener('change', updateAdditionalQuestionsVisibility);
  exerciseNo.addEventListener('change', updateAdditionalQuestionsVisibility);

  updateAdditionalQuestionsVisibility();

  exerciseNo.addEventListener('change', (event) => {
    if (exerciseNo.checked) {
      exerciseAdditionalQuestions.style.display = 'none'; // Piilota lisäkysymykset
    }
  });

  openButton.onclick = function () {
    const completionDate = localStorage.getItem('lifestyleSurveyDate');
    const currentDate = new Date().toISOString().split('T')[0];

    if (completionDate === currentDate) {
      alert('Olet jo suorittanut elämäntapakyselyn tänään.');
      return;
    }

    sleepModal.style.display = 'block';
    sleepForm.style.display = 'block';
  };

  closeFormButton.onclick = () => {
    sleepModal.style.display = 'none';
  };

  window.onclick = (event) => {
    if (event.target === sleepModal) {
      sleepModal.style.display = 'none';
    }
  };

  sleepForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!sleepForm.checkValidity()) {
      sleepForm.reportValidity();
      return;
    }

    const surveyData = {
      entry_date: new Date().toISOString().split('T')[0],
      hours_slept: document.getElementById('sleep-hours').value,
      enough_sleep: document.querySelector('input[name="enoughSleep"]:checked')
        ? document.querySelector('input[name="enoughSleep"]:checked').value
        : '',
      quality_sleep: document.getElementById('sleepQuality').value,
      feel_healthy: document.querySelector('input[name="feelHealthy"]:checked')
        ? document.querySelector('input[name="feelHealthy"]:checked').value
        : '',
      caffeine_intake: document.getElementById('caffeine').value,
      nicotine_intake: document.getElementById('nicotine').value,
      alcohol_intake: document.getElementById('alcohol').value,
      physical_activity: document.querySelector(
        'input[name="exercise"]:checked',
      )
        ? document.querySelector('input[name="exercise"]:checked').value
        : '',
      duration: document.getElementById('duration').value
        ? document.getElementById('duration').value
        : '0',
      intensity:
        document.querySelector('input[name="exercise"]:checked') &&
        document.querySelector('input[name="exercise"]:checked').value === 'yes'
          ? document.getElementById('intensity').value
          : null,
      user_id: localStorage.getItem('user_id'),
    };

    const id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    const url = 'http://localhost:3000/api/lifestyle/';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(surveyData),
    };
    console.log(surveyData);
    fetchData(url, options)
      .then((data) => {
        console.log(data);
        showToast('Elämäntapakysely tallennettu.');
        fetchDataForCalendar(id, token).then(() => {
          showCalendar(currentMonth, currentYear);
        });
        sleepModal.style.display = 'none';

        const completionDate = new Date().toISOString().split('T')[0];
        localStorage.setItem('lifestyleSurveyDate', completionDate);
      })
      .catch((error) => {
        console.error('Error:', error);
        showToast(
          'Virhe tallennettaessa elämäntapakyselyä. Täytä lomake uudelleen.',
        );
      });
  });
});

// hrv mittaustulosten hakeminen backendista

let currentHrvData = null;

document.addEventListener('DOMContentLoaded', () => {
  const hrvModal = document.getElementById('hrv-modal');
  const hrvForm = document.getElementById('hrv-form');
  const closeHrvButton = document.querySelector('.close-button3');
  const openButton = document.getElementById('hrvMeasurements');
  const fetchHrvButton = document.querySelector('.hrv-kubios');
  const loadingIndicator = document.getElementById('loadingIndicator');
  const saveHrvButton = document.querySelector('.tallenna-hrv');

  saveHrvButton.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (!currentHrvData) {
      showToast('Virhe. Yritä uudelleen.');
      return;
    }
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    const url = `http://localhost:3000/api/hrv/${userId}`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(currentHrvData),
    };
    console.log(currentHrvData);
    fetchData(url, options)
      .then((data) => {
        console.log(data);
        showToast('HRV-mittauksen tulokset tallennettu.');
        fetchDataForCalendar(id, token).then(() => {
          showCalendar(currentMonth, currentYear);
        });
        const hrvDate = new Date().toISOString().split('T')[0];
        localStorage.setItem('hrvCompletionDate', hrvDate);
        hrvModal.style.display = 'none';
      })
      .catch((error) => {
        console.error('Error:', error);
        showToast(
          'Virhe tallennettaessa HRV-mittauksen tuloksia. Täytä lomake uudelleen.',
        );
      });
  });

  hrvModal.addEventListener('click', function () {});

  openButton.onclick = function () {
    const completionDate = localStorage.getItem('hrvCompletionDate');
    const thisDate = new Date().toISOString().split('T')[0];

    if (completionDate === thisDate) {
      alert('Olet jo suorittanut HRV-mittaustulosten haun tänään.');
      return;
    }
    hrvModal.style.display = 'block';
    hrvForm.style.display = 'block';
  };

  closeHrvButton.onclick = () => {
    hrvModal.style.display = 'none';
  };

  window.onclick = (event) => {
    if (event.target === hrvModal) {
      hrvModal.style.display = 'none';
    }
  };

  fetchHrvButton.addEventListener('click', function (event) {
    event.preventDefault();
    const token = localStorage.getItem('token');

    const url = 'http://localhost:3000/api/kubios/user-data';

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    loadingIndicator.style.display = 'block';
    fetchData(url, options)
      .then((data) => {
        loadingIndicator.style.display = 'none';
        console.log(data);
        const resultDiv = document.getElementById('results');
        const currentDate = new Date().toISOString().split('T')[0];
        const todaysResults = data.results.filter(
          (result) => result.daily_result === currentDate,
        );

        if (todaysResults.length > 0) {
          const {
            mean_hr_bpm,
            stress_index,
            mood,
            readiness,
            mean_rr_ms,
            sdnn_ms,
          } = todaysResults[0].result;

          const user_happiness = todaysResults[0].user_happiness;
          const userId = localStorage.getItem('user_id');

          currentHrvData = {
            user_id: userId,
            av_hrv: mean_hr_bpm,
            stress_index,
            mood,
            readiness,
            mean_rr_ms,
            sdnn_ms,
            entry_date: currentDate,
            user_happiness,
          };

          resultDiv.innerHTML = `
          Päivämäärä: ${currentDate}<br>
          Sykkeen keskiarvo: ${parseFloat(mean_hr_bpm).toFixed(0)} bpm<br>
          Stressi-indeksi: ${parseFloat(stress_index).toFixed(0)}<br>
          Mieliala: ${user_happiness}<br>
          Valmiustila: ${parseFloat(readiness).toFixed(0)} %<br>
          Keskimääräinen RR väli: ${parseFloat(mean_rr_ms).toFixed(0)} ms<br>
          SDNN: ${parseFloat(sdnn_ms).toFixed(0)} ms
      `;
        } else {
          resultDiv.textContent =
            'Ei tuloksia tämän päivän osalta. Suorita HRV-mittaus Kubios HRV sovelluksella ja hae mittaustulokset uudelleen.';
        }
      })
      .catch((error) => {
        loadingIndicator.style.display = 'none';
        console.error('Error:', error);
      });
  });
});

// kokonaisanalyysin saaminen

// haetaan ensin kyselyiden tulokset ja hrv tulokset nykyiseltä päivältä
const fetchDataAndFilter = (userId, token) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;

  const fetchDataAndFilterByDate = (url, options) => {
    return fetchData(url, options)
      .then((data) => {
        const filteredData = data.filter((item) => {
          const entryDate = new Date(item.entry_date);
          const entryDay = entryDate.getDate();
          const entryMonth = entryDate.getMonth() + 1;
          return entryDay === currentDay && entryMonth === currentMonth;
        });
        return filteredData;
      })
      .catch((error) => {
        console.error('Virhe haettaessa tuloksia:', error);
        return [];
      });
  };

  // Hae ja suodata oirekyselyn tulokset
  const symptomUrl = `http://localhost:3000/api/symptoms/${userId}`;
  const symptomOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const symptomDataPromise = fetchDataAndFilterByDate(
    symptomUrl,
    symptomOptions,
  );

  // Hae ja suodata HRV-mittaukset
  const hrvUrl = `http://localhost:3000/api/hrv/${userId}`;
  const hrvOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const hrvDataPromise = fetchDataAndFilterByDate(hrvUrl, hrvOptions);

  // Hae ja suodata elämäntapakyselyn tulokset
  const lifestyleUrl = `http://localhost:3000/api/lifestyle/${userId}`;
  const lifestyleOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const lifestyleDataPromise = fetchDataAndFilterByDate(
    lifestyleUrl,
    lifestyleOptions,
  );

  return Promise.all([
    symptomDataPromise,
    hrvDataPromise,
    lifestyleDataPromise,
  ]);
};

const token = localStorage.getItem('token');
const userId = localStorage.getItem('user_id');
fetchDataAndFilter(userId, token).then(
  ([symptomData, hrvData, lifestyleData]) => {
    console.log('Tämän päivän oirekyselyn tulokset:', symptomData);
    console.log('Tämän päivän HRV-tulokset:', hrvData);
    console.log('Tämän päivän elämäntapakyselyn tulokset:', lifestyleData);
  },
);

// pisteiden lasku logiikka
function calculateOverallAnalysis(symptomData, hrvData, lifestyleData) {
  // oirekyselyn pisteytys
  let symptomPoints = 0;

  let selectedSymptomsCount = 0;
  if (symptomData.length > 0) {
    const symptoms = symptomData[0]; // Oletetaan, että tarvittavat tiedot ovat ensimmäisessä objektissa

    for (const key in symptoms) {
      if (
        !['entry_date', 'symptom_id', 'user_id', 'stress_level'].includes(
          key,
        ) && // Ota huomioon stress_level poikkeuksena
        symptoms[key] !== undefined &&
        symptoms[key] !== null
      ) {
        // Tarkistetaan, että arvo on numeerinen ja se ei ole 0
        const numericValue = Number(symptoms[key]);
        if (!isNaN(numericValue) && numericValue !== 0) {
          selectedSymptomsCount += numericValue;
        }
      }
    }
    console.log('Valittujen oireiden määrä:', selectedSymptomsCount);
  }
  // Pisteytys käyttäjän valitsemien oireiden määrän perusteella
  if (selectedSymptomsCount <= 2) {
    symptomPoints += 1;
  } else if (selectedSymptomsCount <= 10) {
    symptomPoints += 2;
  } else {
    symptomPoints += 3;
  }

  // Pisteytys stress_levelin perusteella
  const stressLevel = parseInt(symptomData['stress_level']);
  if (stressLevel <= 2) {
    symptomPoints += 1;
  } else if (stressLevel <= 4) {
    symptomPoints += 2;
  } else {
    symptomPoints += 3;
  }
  console.log('oirekysely pisteet', symptomPoints);
  symptomPoints = Math.ceil(symptomPoints / 2);

  // HRV-tuloksen pisteytys
  let hrvPoints = 0;
  if (hrvData) {
    const stressIndex = hrvData.stress_index;

    console.log('stress_index', stressIndex);

    if (stressIndex >= -5 && stressIndex <= 0) {
      hrvPoints -= 1;
    } else if (stressIndex > 0 && stressIndex <= 10) {
      hrvPoints += 1;
    } else if (stressIndex > 10 && stressIndex <= 20) {
      hrvPoints += 2;
    } else if (stressIndex > 20) {
      hrvPoints += 3;
    }
    const readinessData = hrvData.readiness;
    if (readinessData <= 25) {
      hrvPoints += 3;
    } else if (readinessData > 25 && readinessData <= 50) {
      hrvPoints += 2;
    } else if (readinessData > 50) {
      hrvPoints -= 1;
    }
  }
  hrvPoints = Math.round(hrvPoints / 2);

  // elämäntapakyselyn pisteytys
  let lifestylePoints = 0;
  console.log(lifestyleData);
  if (lifestyleData) {
    const alcoholIntake = lifestyleData.alcohol_intake;
    console.log(alcoholIntake);
    if (alcoholIntake <= 2) {
      lifestylePoints += 1;
    } else if (alcoholIntake > 2 && alcoholIntake <= 4) {
      lifestylePoints += 2;
    } else {
      lifestylePoints += 3;
    }

    const caffeineIntake = lifestyleData.caffeine_intake;
    console.log(caffeineIntake);
    if (caffeineIntake <= 2) {
      lifestylePoints += 1;
    } else if (caffeineIntake > 2 && caffeineIntake <= 4) {
      lifestylePoints += 2;
    } else {
      lifestylePoints += 3;
    }

    const enoughSleep = lifestyleData.enough_sleep;
    console.log(enoughSleep);
    if (enoughSleep === 'no') {
      lifestylePoints += 3;
    } else if (enoughSleep === 'yes') {
      lifestylePoints += 1;
    }

    const feelHealthy = lifestyleData.feel_healthy;
    if (feelHealthy === 'yes') {
      lifestylePoints -= 1;
    } else if (feelHealthy === 'no') {
      lifestylePoints += 3;
    }

    const hoursSlept = lifestyleData.hours_slept;
    if (hoursSlept >= 7) {
      lifestylePoints += 1;
    } else if (hoursSlept >= 5 && hoursSlept < 7) {
      lifestylePoints += 2;
    } else {
      lifestylePoints += 3;
    }

    const nicotineIntake = lifestyleData.nicotine_intake;
    if (nicotineIntake <= 2) {
      lifestylePoints += 1;
    } else if (nicotineIntake >= 2 && nicotineIntake < 6) {
      lifestylePoints += 2;
    } else {
      lifestylePoints += 3;
    }

    const physicalActivity = lifestyleData.physical_activity;
    if (physicalActivity === 'yes') {
      lifestylePoints -= 1;
    } else {
      lifestylePoints += 2;
    }

    const duration = lifestyleData.duration;
    if (duration === 'null' && duration === '0') {
      lifestylePoints += 3;
    } else {
      lifestylePoints += 1;
    }

    const qualitySleep = lifestyleData.quality_sleep;
    if (qualitySleep >= 3) {
      lifestylePoints += 1;
    } else if (qualitySleep === 2) {
      lifestylePoints += 2;
    } else if (qualitySleep === 1) {
      lifestylePoints += 3;
    }

    lifestylePoints = Math.round(lifestylePoints / 9);
  }

  return {symptomPoints, hrvPoints, lifestylePoints};
}

function updateChart(newData) {
  const chartData = newData.map(item => {
      return {
          date: new Date(item.created_at),
          value: item.analysis_enumerated
      };
  });

  // Päivitä chart data
  if (chart && chart.xAxes.length > 0 && chart.series.length > 0) {
      const xAxis = chart.xAxes.getIndex(0);
      const series = chart.series.getIndex(0);
      xAxis.data.setAll(chartData);
      series.data.setAll(chartData);
  }
}


function showModal(
  symptomPoints,
  hrvPoints,
  lifestylePoints,
  overallScore,
  stressLevelText,
) {
  // Tarkista onko modaali jo näytetty
  if (localStorage.getItem('analysisModalShown') !== 'true') {
    fetchData('http://localhost:3000/api/analysis/user/' + localStorage.getItem('user_id'), {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
  }).then(data => {
      updateChart(data);
  });
    const modal = document.getElementById('overall-analysis-modal');
    modal.style.display = 'block'; // Asetetaan modaali näkyväksi

    // const symptomPointsElement = document.getElementById('symptom-points');
    // const hrvPointsElement = document.getElementById('hrv-points');
    // const lifestylePointsElement = document.getElementById('lifestyle-points');
    const overallScoreElement = document.getElementById('overall-score');
    const overallTextElement = document.getElementById('overall-text');
    const additionalInfo = document.getElementById('additional-info');
    const stressAdvice = document.getElementById('stress-advice');
    const stressLink = document.getElementById('stress-link');

    // symptomPointsElement.textContent = `Oirekyselyn pistemäärä: ${symptomPoints}/3 pistettä`;
    // lifestylePointsElement.textContent = `Elämäntapakyselyn pistemäärä: ${lifestylePoints}/3 pistettä`;
    // hrvPointsElement.textContent = `HRV mittaustuloksen pistemäärä: ${hrvPoints}/3 pistettä`;
    overallScoreElement.textContent = `Kokonaisanalyysin pistemäärä: ${overallScore}/3 pistettä`;
    overallTextElement.textContent = `Stressitasoanalyysin tulos: ${stressLevelText}`;

    if (overallScore === 2 || overallScore === 3) {
      additionalInfo.style.display = 'block';
      stressAdvice.textContent = 'Stressitasosi on korkea. Suosittelemme tarkastamaan elämäntapojasi.';
      stressLink.textContent = 'Lue lisää stressinhallinnasta täältä';
  } else {
      additionalInfo.style.display = 'none';
  }

  const closeButton = document.getElementsByClassName('close-button4')[0];
  closeButton.onclick = () => {
      modal.style.display = 'none';
      localStorage.setItem('analysisModalShown', 'true');
  };
}
}

fetchDataAndFilter(userId, token)
  .then(([symptomData, hrvData, lifestyleData]) => {
    if (
      symptomData.length > 0 &&
      hrvData.length > 0 &&
      lifestyleData.length > 0
    ) {
      const {symptomPoints, hrvPoints, lifestylePoints} =
        calculateOverallAnalysis(symptomData[0], hrvData[0], lifestyleData[0]);
      const overallScore = Math.round(
        (symptomPoints + hrvPoints + lifestylePoints) / 3,
      );
      let stressLevelText = '';
      const stressElement = document.querySelector('.stress');

      // Määritä stressin taso kokonaispisteiden mukaan
      if (overallScore <= 1) {
        stressLevelText = 'Matala stressitaso';
        stressElement.style.backgroundColor = 'rgba(108, 231, 149, 0.7)';
      } else if (overallScore <= 2) {
        stressLevelText = 'Kohtalainen stressitaso';
        stressElement.style.backgroundColor = 'rgba(245, 206, 90, 0.7)';
      } else {
        stressLevelText = 'Korkea stressitaso';
        stressElement.style.backgroundColor = 'rgba(249, 101, 101, 0.7)';
      }
      showModal(
        symptomPoints,
        hrvPoints,
        lifestylePoints,
        overallScore,
        stressLevelText,
      );
      const stressTodayElement = document.getElementById('stress-today');
      stressTodayElement.textContent = stressLevelText;
      console.log('kokonaisanalyysi:', overallScore);

      const currentDate = new Date().toISOString().split('T')[0];
      const lastAnalysisDate = localStorage.getItem('lastAnalysisDate');

      if (lastAnalysisDate !== currentDate) {
        const analysisData = {
          user_id: userId,
          analysis_result: stressLevelText,
          analysis_enumerated: overallScore,
          created_at: currentDate,
        };

        const url = `http://localhost:3000/api/analysis/`;
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(analysisData),
        };

        fetchData(url, options).then((data) => {
          console.log('Analyysi tallennettu:', data);
          localStorage.setItem('lastAnalysisDate', currentDate);
        });
      } else {
        console.log('Analyysi on jo suoritettu ja tallennettu tänään.');
      }
    } else {
      console.log(
        'Oirekyselyn, HRV-datan tai elämäntapakyselyn haku epäonnistui.',
      );
    }
  })
  .catch((error) => {
    console.error('Virhe haettaessa ja laskettaessa tietoja:', error);
  });

// logout
document.addEventListener('DOMContentLoaded', function () {
  const logoutLink = document.querySelector('.logout a');
  logoutLink.addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.removeItem('analysisModalShown');
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    showToast('Kirjaudutaan ulos.');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
  });
});
