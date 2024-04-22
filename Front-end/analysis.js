import './style.css';
import {fetchData} from './fetch.js';
import {showToast} from './toast.js';

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