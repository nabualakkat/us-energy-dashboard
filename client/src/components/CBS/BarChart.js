import React, { useRef, useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function am4themes_lightTheme(target) {
  if (target instanceof am4core.InterfaceColorSet) {
    target.setFor('text', am4core.color('#000000'));
  }
}
function am4themes_darkTheme(target) {
  if (target instanceof am4core.InterfaceColorSet) {
    target.setFor('text', am4core.color('#ffffff'));
  }
}

am4core.useTheme(am4themes_animated);

const BarChart = ({ cbs, theme }) => {
  const chart = useRef(null);

  useLayoutEffect(() => {
    if (theme === 'light') {
      am4core.unuseTheme(am4themes_darkTheme);
      am4core.useTheme(am4themes_lightTheme);
    } else {
      am4core.unuseTheme(am4themes_lightTheme);
      am4core.useTheme(am4themes_darkTheme);
    }
    let x = am4core.create('bardiv', am4charts.XYChart);

    x.paddingRight = 20;
    const data = cbs[0].data;
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
    series.columns.template.tooltipText = '{valueY}';
    series.columns.template.fill = am4core.color('#4CAF50'); // fill
    series.dataFields.valueY = 'value';
    series.dataFields.categoryX = 'sector';

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, [theme, cbs]);

  return <div id="bardiv" style={{ width: '100%', height: '390px' }} />;
};

BarChart.propTypes = {
  theme: PropTypes.string.isRequired,
  cbs: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(BarChart);
