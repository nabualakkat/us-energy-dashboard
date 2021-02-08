import React, { useRef, useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

const PieChart = ({ npbs, type }) => {
  const chart = useRef(null);
  const colors = [
    '#ff5722',
    '#e77200',
    '#cc8600',
    '#ae9500',
    '#90a000',
    '#70a92c',
    '#4caf50',
  ];
  useLayoutEffect(() => {
    let y = am4core.create('piechartdiv', am4charts.PieChart);
    const data = npbs.map((d) => {
      const unit = d.data.map((values, i) => {
        return {
          source: values.source,
          value: type === 'Production' ? values.production : values.consumption,
          color: colors[i],
        };
      });
      return unit;
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

    y.innerRadius = am4core.percent(50);
    y.radius = am4core.percent(90);
    y.legend = new am4charts.Legend();

    // y.legend.position = 'right';
    chart.current = y;

    return () => {
      y.dispose();
    };
  });

  return <div id="piechartdiv" style={{ width: '98%', height: '370px' }}></div>;
};

export default PieChart;
