import "./style.css";

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let monthNames = ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"];

document.getElementById("prevMonth").addEventListener("click", () => previous());
document.getElementById("nextMonth").addEventListener("click", () => next());

function showCalendar(month, year) {
  let firstDay = (new Date(year, month).getDay() + 6) % 7; // Make Monday (0), Sunday (6)
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  let tbl = document.getElementById("calendar-body");
  tbl.innerHTML = "";

  document.getElementById("monthAndYear").innerText = monthNames[month] + " " + year;

  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      let cell = document.createElement("td");
      if (i === 0 && j < firstDay) {
        let cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        let cellText = document.createTextNode(date);
        cell.appendChild(cellText);
        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          cell.classList.add("current-date"); // Highlight the current date
        }
        row.appendChild(cell);
        date++;
      }
    }

    tbl.appendChild(row);
  }
}


function previous() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function next() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

showCalendar(currentMonth, currentYear);


document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  menuToggle.addEventListener("click", function () {
    menu.classList.toggle("show");
  });
});

// Oirearviokyselyn toiminnallisuudet
const surveyModal = document.getElementById("survey-modal");
const formMental = document.getElementById('survey-form-mental');
const formPhysical = document.getElementById('survey-form-physical');
const button = document.getElementById("openArvioKyselyModal");
const closeButton = document.querySelector(".close-button");

button.onclick = function() {
  surveyModal.style.display = "block";
  formMental.style.display = "block"; 
  formPhysical.style.display = "none";
};

document.querySelector('.next-button').addEventListener('click', function() {
  formMental.style.display = 'none';
  formPhysical.style.display = 'block';
});

document.querySelector('.prev-button').addEventListener('click', function() {
  formPhysical.style.display = 'none';
  formMental.style.display = 'block';
});


closeButton.onclick = () => (surveyModal.style.display = "none");

window.onclick = (event) => {
  if (event.target === surveyModal) {
    surveyModal.style.display = "none";
  }
};

formMental.addEventListener("submit", submitForm1);

function submitForm1() {
  console.log("toimii");
}

const button2 = document.getElementById("openElamantapaKyselyModal");

button2.onclick = function() {
  sleepModal.style.display = "block";
}

const form2 = document.getElementById("sleep-form");
form2.addEventListener("submit", submitForm2);

const sleepModal = document.getElementById("sleep-modal");
const closeButton2 = document.querySelector(".close-button2");

closeButton2.onclick = () => {
    sleepModal.style.display = "none";
};

function submitForm2() {
  console.log("elämantapa modal toimii");
}

// graph code

am5.ready(function() {

  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("graph");
  
  
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root)
  ]);
  
  root.dateFormatter.setAll({
    dateFormat: "yyyy",
    dateFields: ["valueX"]
  });
  
  var data = [ {
    "date": "2012-10-12",
    "value": 31
  }, {
    "date": "2012-10-13",
    "value": 30
  }, {
    "date": "2012-10-14",
    "value": 34
  }, {
    "date": "2012-10-15",
    "value": 38
  }, {
    "date": "2012-10-16",
    "value": 37
  }, {
    "date": "2012-10-17",
    "value": 44
  }, {
    "date": "2012-10-18",
    "value": 49
  }, {
    "date": "2012-10-19",
    "value": 53
  }, {
    "date": "2012-10-20",
    "value": 57
  }, {
    "date": "2012-10-21",
    "value": 60
  }, {
    "date": "2012-10-22",
    "value": 61
  }, {
    "date": "2012-10-23",
    "value": 69
  }, {
    "date": "2012-10-24",
    "value": 67
  }, {
    "date": "2012-10-25",
    "value": 72
  }, {
    "date": "2012-10-26",
    "value": 77
  }, {
    "date": "2012-10-27",
    "value": 75
  }, {
    "date": "2012-10-28",
    "value": 70
  }, {
    "date": "2012-10-29",
    "value": 72
  }, {
    "date": "2012-10-30",
    "value": 70
  }, {
    "date": "2012-10-31",
    "value": 72
  }, {
    "date": "2012-11-01",
    "value": 73
  }, {
    "date": "2012-11-02",
    "value": 67
  }, {
    "date": "2012-11-03",
    "value": 68
  }, {
    "date": "2012-11-04",
    "value": 65
  }, {
    "date": "2012-11-05",
    "value": 71
  }, {
    "date": "2012-11-06",
    "value": 75
  }, {
    "date": "2012-11-07",
    "value": 74
  }, {
    "date": "2012-11-08",
    "value": 71
  }, {
    "date": "2012-11-09",
    "value": 76
  }, {
    "date": "2012-11-10",
    "value": 77
  }, {
    "date": "2012-11-11",
    "value": 81
  }, {
    "date": "2012-11-12",
    "value": 83
  }, {
    "date": "2012-11-13",
    "value": 80
  }, {
    "date": "2012-11-14",
    "value": 81
  }, {
    "date": "2012-11-15",
    "value": 87
  }, {
    "date": "2012-11-16",
    "value": 82
  }, {
    "date": "2012-11-17",
    "value": 86
  }, {
    "date": "2012-11-18",
    "value": 80
  }, {
    "date": "2012-11-19",
    "value": 87
  }, {
    "date": "2012-11-20",
    "value": 83
  }, {
    "date": "2012-11-21",
    "value": 85
  }, {
    "date": "2012-11-22",
    "value": 84
  }, {
    "date": "2012-11-23",
    "value": 82
  }, {
    "date": "2012-11-24",
    "value": 73
  }, {
    "date": "2012-11-25",
    "value": 71
  }, {
    "date": "2012-11-26",
    "value": 75
  }, {
    "date": "2012-11-27",
    "value": 79
  }, {
    "date": "2012-11-28",
    "value": 70
  }, {
    "date": "2012-11-29",
    "value": 73
  }, {
    "date": "2012-11-30",
    "value": 61
  }, {
    "date": "2012-12-01",
    "value": 62
  }, {
    "date": "2012-12-02",
    "value": 66
  }, {
    "date": "2012-12-03",
    "value": 65
  }, {
    "date": "2012-12-04",
    "value": 73
  }, {
    "date": "2012-12-05",
    "value": 79
  }, {
    "date": "2012-12-06",
    "value": 78
  }, {
    "date": "2012-12-07",
    "value": 78
  }, {
    "date": "2012-12-08",
    "value": 78
  }, {
    "date": "2012-12-09",
    "value": 74
  }, {
    "date": "2012-12-10",
    "value": 73
  }, {
    "date": "2012-12-11",
    "value": 75
  }, {
    "date": "2012-12-12",
    "value": 70
  }, {
    "date": "2012-12-13",
    "value": 77
  }, {
    "date": "2012-12-14",
    "value": 67
  }, {
    "date": "2012-12-15",
    "value": 62
  }, {
    "date": "2012-12-16",
    "value": 64
  }, {
    "date": "2012-12-17",
    "value": 61
  }, {
    "date": "2012-12-18",
    "value": 59
  }, {
    "date": "2012-12-19",
    "value": 53
  }, {
    "date": "2012-12-20",
    "value": 54
  }, {
    "date": "2012-12-21",
    "value": 56
  }, {
    "date": "2012-12-22",
    "value": 59
  }, {
    "date": "2012-12-23",
    "value": 58
  }, {
    "date": "2012-12-24",
    "value": 55
  }, {
    "date": "2012-12-25",
    "value": 52
  }, {
    "date": "2012-12-26",
    "value": 54
  }, {
    "date": "2012-12-27",
    "value": 50
  }, {
    "date": "2012-12-28",
    "value": 50
  }, {
    "date": "2012-12-29",
    "value": 51
  }, {
    "date": "2012-12-30",
    "value": 52
  }, {
    "date": "2012-12-31",
    "value": 58
  }, {
    "date": "2013-01-01",
    "value": 60
  }, {
    "date": "2013-01-02",
    "value": 67
  }, {
    "date": "2013-01-03",
    "value": 64
  }, {
    "date": "2013-01-04",
    "value": 66
  }, {
    "date": "2013-01-05",
    "value": 60
  }, {
    "date": "2013-01-06",
    "value": 63
  }, {
    "date": "2013-01-07",
    "value": 61
  }, {
    "date": "2013-01-08",
    "value": 60
  }, {
    "date": "2013-01-09",
    "value": 65
  }, {
    "date": "2013-01-10",
    "value": 75
  }, {
    "date": "2013-01-11",
    "value": 77
  }, {
    "date": "2013-01-12",
    "value": 78
  }, {
    "date": "2013-01-13",
    "value": 70
  }, {
    "date": "2013-01-14",
    "value": 70
  }, {
    "date": "2013-01-15",
    "value": 73
  }, {
    "date": "2013-01-16",
    "value": 71
  }, {
    "date": "2013-01-17",
    "value": 74
  }, {
    "date": "2013-01-18",
    "value": 78
  }, {
    "date": "2013-01-19",
    "value": 85
  }, {
    "date": "2013-01-20",
    "value": 82
  }, {
    "date": "2013-01-21",
    "value": 83
  }, {
    "date": "2013-01-22",
    "value": 88
  }, {
    "date": "2013-01-23",
    "value": 85
  }, {
    "date": "2013-01-24",
    "value": 85
  }, {
    "date": "2013-01-25",
    "value": 80
  }, {
    "date": "2013-01-26",
    "value": 87
  }, {
    "date": "2013-01-27",
    "value": 84
  }, {
    "date": "2013-01-28",
    "value": 83
  }, {
    "date": "2013-01-29",
    "value": 84
  }, {
    "date": "2013-01-30",
    "value": 81
  }];
  
  
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    focusable: true,
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
    pinchZoomX:true,
    paddingLeft: 0
  }));
  
  var easing = am5.ease.linear;
  
  
  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
    maxDeviation: 0.1,
    groupData: false,
    baseInterval: {
      timeUnit: "day",
      count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true,
      minGridDistance: 70
    }),
    tooltip: am5.Tooltip.new(root, {})
  }));
  
  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    maxDeviation: 0.2,
    renderer: am5xy.AxisRendererY.new(root, {})
  }));
  
  
  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(am5xy.LineSeries.new(root, {
    minBulletDistance: 10,
    connect: false,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText: "{valueY}"
    })
  }));
  
  series.fills.template.setAll({
    fillOpacity: 0.2,
    visible: true
  });
  
  series.strokes.template.setAll({
    strokeWidth: 2
  });
  
  
  // Set up data processor to parse string dates
  // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
  series.data.processor = am5.DataProcessor.new(root, {
    dateFormat: "yyyy-MM-dd",
    dateFields: ["date"]
  });
  
  series.data.setAll(data);
  
  series.bullets.push(function() {
    var circle = am5.Circle.new(root, {
      radius: 4,
      fill: root.interfaceColors.get("background"),
      stroke: series.get("fill"),
      strokeWidth: 2
    })
  
    return am5.Bullet.new(root, {
      sprite: circle
    })
  });
  
  
  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
    xAxis: xAxis,
    behavior: "none"
  }));
  cursor.lineY.set("visible", false);
  
  // add scrollbar
  chart.set("scrollbarX", am5.Scrollbar.new(root, {
    orientation: "horizontal"
  }));
  
  
  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  chart.appear(1000, 100);
  
  }); // end am5.ready()