import React, { useRef, useState, useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

//Material-UI
import { makeStyles, useTheme } from '@material-ui/core';

am4core.useTheme(am4themes_animated);

const XYChart = ({ npbs, source }) => {
  const chart = useRef(null);

  useLayoutEffect(() => {
    let x = am4core.create('chartdiv', am4charts.XYChart);
    const rawData = [...npbs].reverse();
    x.paddingRight = 20;
    const data = rawData.map((d) => {
      const sourceData = d.data.filter(
        (sourceValue) => sourceValue.source === source
      );
      return {
        month: d.month,
        production: sourceData[0].production,
        consumption: sourceData[0].consumption,
      };
    });
    x.data = data;
    x.responsive.enabled = true;
    let dateAxis = x.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.title.text = "Energy (Trillion BTU's)";

    let seriesA = x.series.push(new am4charts.LineSeries());
    seriesA.dataFields.dateX = 'month';
    seriesA.dataFields.valueY = 'production';
    seriesA.stroke = am4core.color('#4CAF50');
    seriesA.legendSettings.labelText = 'Production';
    seriesA.strokeWidth = 3;
    seriesA.tooltipText = `Production\n{valueY}`;
    seriesA.tooltip.getFillFromObject = false;
    seriesA.tooltip.background.fill = am4core.color('#b5dfb7');
    seriesA.tooltip.label.fill = am4core.color('#000000');
    x.cursor = new am4charts.XYCursor();

    let seriesB = x.series.push(new am4charts.LineSeries());
    seriesB.dataFields.dateX = 'month';
    seriesB.dataFields.valueY = 'consumption';
    seriesB.stroke = am4core.color('#FF5722');
    seriesB.legendSettings.labelText = 'Consumption';
    seriesB.strokeWidth = 3;
    seriesB.tooltipText = `Consumption\n{valueY}`;
    seriesB.tooltip.getFillFromObject = false;
    seriesB.tooltip.background.fill = am4core.color('#ffb199');
    seriesB.tooltip.label.fill = am4core.color('#000000');
    x.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(seriesA);
    scrollbarX.series.push(seriesB);
    scrollbarX.minHeight = 10;
    x.scrollbarX = scrollbarX;

    x.events.on('ready', function () {
      dateAxis.zoomToDates(
        new Date(2010, 1, 1),
        new Date(data[data.length - 1].month),
        false
      );
    });
    x.legend = new am4charts.Legend();

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, [source]);

  return <div id="chartdiv" style={{ width: '100%', height: '390px' }} />;
};

export default XYChart;
