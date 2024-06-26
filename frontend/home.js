/* eslint-disable require-jsdoc */
import './style.css';
import {fetchData} from './fetch.js';
import {showToast} from './toast';

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
      min: 1,
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
const surveyModal = document.getElementById('survey-modal');
const formMental = document.getElementById('survey-form-mental');
const formPhysical = document.getElementById('survey-form-physical');
const nextButton = document.querySelector('.next-button');
const prevButton = document.querySelector('.prev-button');
const saveButton = document.querySelector('.tallenna-button');
const closeButton = document.querySelector('.close-button');
const button = document.getElementById('openArvioKyselyModal');

let formData = {};

// Avaa henkisen oirearvioinnin lomake
button.onclick = function () {
  const completionDate = localStorage.getItem('surveyCompletionDate');
  const currentDate = new Date().toDateString();

  if (completionDate === currentDate) {
    alert('Olet jo suorittanut oirearviokyselyn tänään.');
    return; // Lopetetaan funktion suoritus tähän, jotta modal ei avaudu
  }

  surveyModal.style.display = 'block';
  formMental.style.display = 'block';
  formPhysical.style.display = 'none';
};

// Siirry fyysiseen oirearviointiin ja kerää henkisen oirearvioinnin tiedot
nextButton.addEventListener('click', function () {
  // Kerää henkisten oireiden tiedot
  for (let i = 1; i <= 9; i++) {
    const checkbox = document.getElementById(`symptom${i}`);
    formData[`symptom${i}`] = checkbox.checked;
  }

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

  // Kerää fyysisten oireiden tiedot
  for (let i = 1; i <= 8; i++) {
    const checkbox = document.getElementById(`physical-symptom${i}`);
    formData[`physical-symptom${i}`] = checkbox.checked;
  }

  // Hae käyttäjän id localStoragesta
  const id = localStorage.getItem('user_id');

  // Hae token localStoragesta
  const token = localStorage.getItem('token');

  // Määrittele pyynnön URL ja optiot
  const url = `https://localhost:3000/api/auth/symptom/${id}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  };

  // Lähetä tiedot palvelimelle
  fetchData(url, options)
    .then((data) => {
      console.log(data);
      showToast('Oirearviokysely tallennettu.');
      surveyModal.style.display = 'none';

      // Tallenna kyselyn suorituspäivämäärä
      const completionDate = new Date().toDateString();
      localStorage.setItem('surveyCompletionDate', completionDate);

      formData = {};
    })
    .catch((error) => {
      console.error('Error:', error);
      showToast('Virhe tallennettaessa oirearviokyselyä.');
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
