import React, { useRef, useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

const PieChart = ({ npbs }) => {
  const chart = useRef(null);

  useLayoutEffect(() => {
    let y = am4core.create('piechartdiv', am4charts.PieChart);
    const data = npbs.map((d) => {
      return [
        {
          source: 'Coal',
          value: d.data.coal.production,
          color: am4core.color('#ff5722'),
        },
        {
          source: 'Geothermal',
          value: d.data.geothermal.production,
          color: am4core.color('#e77200'),
        },
        {
          source: 'Hydroelectric',
          value: d.data.hydroelectric.production,
          color: am4core.color('#cc8600'),
        },
        {
          source: 'Nuclear',
          value: d.data.nuclear.production,
          color: am4core.color('#ae9500'),
        },
        {
          source: 'Solar',
          value: d.data.solar?.production,
          color: am4core.color('#90a000'),
        },
        {
          source: 'Wind',
          value: d.data.wind?.production,
          color: am4core.color('#70a92c'),
        },
        {
          source: 'Natural Gas',
          value: d.data.naturalGas.production,
          color: am4core.color('#4caf50'),
        },
      ];
    });
    y.data = data[0];
    y.responsive.enabled = true;

    let pieSeries = y.series.push(new am4charts.PieSeries());

    pieSeries.dataFields.value = 'value';
    pieSeries.dataFields.category = 'source';
    pieSeries.slices.template.stroke = am4core.color('#4a2abb');
    pieSeries.slices.template.strokeWidth = 1;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template.propertyFields.fill = 'color';
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    y.innerRadius = am4core.percent(40);
    y.legend = new am4charts.Legend();
    y.legend.position = 'right';
    chart.current = y;

    return () => {
      y.dispose();
    };
  });

  return (
    <div id="piechartdiv" style={{ width: '100%', height: '300px' }}></div>
  );
};

export default PieChart;
