/* eslint-disable require-jsdoc */
import './style.css';
import {fetchData} from './fetch.js';
import {showToast} from './toast.js';

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

// eslint-disable-next-line require-jsdoc
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
        const cellText = document.createTextNode('');
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        const cellText = document.createTextNode(date);
        cell.appendChild(cellText);
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.classList.add('current-date'); // Highlight the current date
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

// Graph code
am5.ready(function () {
  // Create root element
  const root = am5.Root.new('graph');

  // Set themes
  // eslint-disable-next-line camelcase
  root.setThemes([am5themes_Animated.new(root)]);

  // Create chart
  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: 'panX',
      wheelY: 'zoomX',
      paddingLeft: 0,
      paddingRight: 0,
      layout: root.verticalLayout,
    }),
  );

  chart.children.unshift(
    am5.Label.new(root, {
      text: 'Stressianalyysi ja HRV-mittaustulokset',
      fontSize: 25,
      fontWeight: '400',
      textAlign: 'center',
      x: am5.percent(50),
      centerX: am5.percent(50),
      paddingTop: 0,
      paddingBottom: 20,
    }),
  );

  // chart.children.unshift(
  //   am5.Label.new(root, {
  //     text: "Stressitaso",
  //     fontSize: 15,
  //     fontWeight: "300",
  //     textAlign: "right",
  //     x: am5.percent(50),
  //     centerX: am5.percent(50),
  //     paddingTop: 0,
  //     paddingBottom: 20,
  //   })
  // );

  // eslint-disable-next-line no-unused-vars
  const colors = chart.get('colors');

  const data = [
    {
      date: '2012-07-27',
      value: 1,
      arvio: 'Matala stressitaso',
      hrv: 60,
    },
    {
      date: '2012-07-28',
      value: 1,
      arvio: 'Matala stressitaso',
      hrv: 60,
    },
    {
      date: '2012-07-29',
      value: 3,
      arvio: 'Korkea stressitaso',
      hrv: 40,
    },
    {
      date: '2012-07-30',
      value: 3,
      arvio: 'Korkea stressitaso',
      hrv: 55,
    },
    {
      date: '2012-07-31',
      value: 3,
      arvio: 'Korkea stressitaso',
      hrv: 35,
    },
    {
      date: '2012-08-01',
      value: 2,
      arvio: 'Kohtalainen stressitaso',
      hrv: 60,
    },
    {
      date: '2012-08-02',
      value: 2,
      arvio: 'Kohtalainen stressitaso',
      hrv: 45,
    },
    {
      date: '2012-08-03',
      value: 2,
      arvio: 'Kohtalainen stressitaso',
      hrv: 60,
    },
    {
      date: '2012-08-04',
      value: 2,
      arvio: 'Kohtalainen stressitaso',
      hrv: 70,
    },
    {
      date: '2012-08-05',
      value: 1,
      arvio: 'Matala stressitaso',
      hrv: 60,
    },
    {
      date: '2012-08-06',
      value: 1,
      arvio: 'Matala stressitaso',
      hrv: 55,
    },
    {
      date: '2012-08-07',
      value: 1,
      arvio: 'Matala stressitaso',
      hrv: 50,
    },
    {
      date: '2012-08-08',
      value: 2,
      arvio: 'Kohtalainen stressitaso',
      hrv: 60,
    },
    {
      date: '2012-08-09',
      value: 2,
      arvio: 'Kohtalainen stressitaso',
      hrv: 60,
    },
    {
      date: '2012-08-10',
      value: 2,
      arvio: 'Kohtalainen stressitaso',
      hrv: 35,
    },
    {
      date: '2012-08-11',
      value: 2,
      arvio: 'Kohtalainen stressitaso',
      hrv: 50,
    },
    {
      date: '2012-08-12',
      value: 3,
      arvio: 'Korkea stressitaso',
      hrv: 40,
    },
    {
      date: '2012-08-13',
      value: 1,
      arvio: 'Matala stressitaso',
      hrv: 66,
    },
    {
      date: '2012-08-14',
      value: 2,
      arvio: 'Kohtalainen stressitaso',
      hrv: 55,
    },
  ];

  // Create axes
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

  xAxis.data.setAll(data);

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

  const hrvAxisRenderer = am5xy.AxisRendererY.new(root, {
    opposite: true,
    inside: false, // Aseta false, jotta arvot näkyvät akselin ulkopuolella
    // eslint-disable-next-line max-len
    maxLabelPosition: 0.98, // Aseta arvo alle 1 estääksesi labelien menemästä kaavion reunan yli
  });

  const hrvAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: hrvAxisRenderer,
      min: 0, // Säädä nämä HRV-datan mukaan
      max: 100, // Säädä nämä HRV-datan mukaan
    }),
  );

  // Lisää padding labelien oikealle puolelle
  hrvAxisRenderer.labels.template.setAll({
    paddingRight: 25, // Säädä tämä arvo haluamaksesi paddingiksi
  });

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

  series.columns.template.adapters.add('fill', function (fill, target) {
    return chart
      .get('colors')
      .getIndex(series.dataItems.indexOf(target.dataItem));
  });

  const hrvSeries = chart.series.push(
    am5xy.LineSeries.new(root, {
      xAxis: xAxis,
      yAxis: hrvAxis,
      valueYField: 'hrv',
      categoryXField: 'date',
      stroke: root.interfaceColors.get('alternativeBackground'),
      strokeWidth: 3,
    }),
  );

  hrvSeries.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 4,
        fill: hrvSeries.get('stroke'),
        tooltipText: 'HRV: {hrv} ms',
      }),
    });
  });

  series.data.setAll(data);
  hrvSeries.data.setAll(data);

  series.appear();
  hrvSeries.appear();
  chart.appear(1000, 100);
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
      return; // Lopetetaan funktion suoritus tähän, jotta modal ei avaudu
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
    // if (!stressLevel) {
    //   console.error('Stress-level elementtiä ei löydy!');
    //   return; // Lopettaa funktion suorituksen, jos elementtiä ei löydy
    // }
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
      medication: document.getElementById('medication').value,
      medication_purpose: document.getElementById('medication-purpose').value,
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

    const url = `http://localhost:3000/api/lifestyle/${id}`;
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
document.addEventListener('DOMContentLoaded', () => {
  const hrvModal = document.getElementById('hrv-modal');
  const hrvForm = document.getElementById('hrv-form');
  const closeHrvButton = document.querySelector('.close-button3');
  const openButton = document.getElementById('hrvMeasurements');
  const fetchHrvButton = document.querySelector('.hrv-kubios');

  openButton.onclick = function () {
    hrvModal.style.display = 'block';
    hrvForm.style.display = 'block';
  };

  closeHrvButton.onclick = () => {
    hrvModal.style.display = 'none';
  };

  fetchHrvButton.addEventListener('click', function(event) {
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
  fetchData(url, options)
    .then((data) => {
      console.log(data);
      const resultDiv = document.getElementById('results');
      resultDiv.textContent = JSON.stringify(data, null, 2);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
});

// logout
document.addEventListener('DOMContentLoaded', function () {
  const logoutLink = document.querySelector('.logout a');
  logoutLink.addEventListener('click', function (event) {
    event.preventDefault();
    showToast('Kirjaudutaan ulos.');

    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
  });
});
