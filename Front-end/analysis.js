import './style.css';
import {fetchData} from './fetch.js';
import {showToast} from './toast.js';



document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const logoutLink = document.querySelector('.logout a');

  menuToggle.addEventListener('click', function () {
    menu.classList.toggle('show');
  });

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

  getEntries(); // Kutsu tätä funktiota ladataksesi taulukon tiedot automaattisesti
});

am5.ready(function () {
    // Create root element
    const root = am5.Root.new('graph2');
  
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
        paddingBottom: 50,
        layout: root.verticalLayout,
      }),
    );
  
    chart.children.unshift(
      am5.Label.new(root, {
        text: 'Stressitasoanalyysi',
        fontSize: 20,
        fontWeight: '400',
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
  
    const chartUrl = `https://hyte24.northeurope.cloudapp.azure.com/api/analysis/user/${id}`;
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
        const formattedDate = date // Muuntaa päivämäärän muotoon 'YYYY-MM-DD'
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
  
      series.columns.template.adapters.add('fill', function (fill, target) {
        return chart
          .get('colors')
          .getIndex(series.dataItems.indexOf(target.dataItem));
      });
  
      series.data.setAll(chartData);
      series.appear();
      chart.appear(1000, 100);
      console.log(chartData);
    });
    
  });


 // analyysitulostaulukko
 async function getEntries() {
  const userId = localStorage.getItem("user_id");
  const url = `https://hyte24.northeurope.cloudapp.azure.com/api/analysis/user/${userId}`;
  const token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetchData(url, options).then((data) => {
    createTable(data);
  });
}

function createTable(data) {
  console.log(data);

  const tbody = document.querySelector(".tbody");
  tbody.innerHTML = "";

  data.forEach((element) => {
    console.log(
      element.created_at,
      element.analysis_result,
      element.analysis_enumerated,
    );

    const tr = document.createElement("tr");

    const formattedDate = new Date(element.created_at).toLocaleDateString(
      "fi-FI"
    );

    const td1 = document.createElement("td");
    td1.innerText = formattedDate;

    const td2 = document.createElement("td");
    td2.innerText = element.analysis_result;

    const td3 = document.createElement("td");
    td3.innerText = element.analysis_enumerated;


    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    tbody.appendChild(tr);
  });
}
 
