import React, { useRef, useState, useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

//Material-UI
import { makeStyles, useTheme } from '@material-ui/core';

am4core.useTheme(am4themes_animated);

const BarChart = ({ cbs }) => {
  const chart = useRef(null);

  useLayoutEffect(() => {
    let x = am4core.create('bardiv', am4charts.XYChart);

    x.paddingRight = 20;
    const data = cbs[0].data;
    console.log(data);
    x.data = data;
    x.responsive.enabled = true;
    let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Energy Consumed (Trillion BTUS)';

    let categoryAxis = x.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'sector';
    categoryAxis.renderer.minGridDistance = 30;

    x.responsive.enabled = true;
    let series = x.series.push(new am4charts.ColumnSeries());
    series.name = 'Consumption';
    series.columns.template.fill = am4core.color('#104547'); // fill
    series.dataFields.valueY = 'value';
    series.dataFields.categoryX = 'sector';

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, []);

  return <div id="bardiv" style={{ width: '100%', height: '390px' }} />;
};

export default BarChart;
