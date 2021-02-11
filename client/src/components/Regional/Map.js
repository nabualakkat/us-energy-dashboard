import React, { useRef, useState, useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_usaAlbersLow from '@amcharts/amcharts4-geodata/usaAlbersLow';

const Map = ({ regional }) => {
  const map = useRef(null);
  const colorArray = [
    '#F1EFD9',
    '#EAEBCA',
    '#DFE5BC',
    '#D2DFAD',
    '#C3D99F',
    '#B3D291',
    '#A0CB83',
    '#8CC575',
    '#77BE67',
    '#60B659',
    '#4CAF50',
    '#48A754',
    '#439F56',
    '#3F9759',
    '#3B8E5A',
    '#36865B',
    '#327D5C',
    '#2E755B',
    '#2A6C5A',
    '#266458',
  ];
  const sum = (array) => {
    return array.reduce((a, b) => a + b, 0);
  };
  const valueArray = regional.map((r) => {
    const regionalArray = r.value.map((data) => data[1]);
    return sum(regionalArray);
  });
  const sortedArray = valueArray.sort((a, b) => a - b);
  const intervalLength =
    (sortedArray[sortedArray.length - 1] - sortedArray[0]) /
    (colorArray.length - 1);

  const color = (value) => {
    const interval = Math.floor((value - sortedArray[0]) / intervalLength);
    return colorArray[interval];
  };
  const getValue = (region) => {
    const regionData = regional.filter((r) => r.region === region);
    const regionalValueArray = regionData[0].value.map((v) => v[1]);
    return sum(regionalValueArray);
  };
  const getStates = (region) => {
    const regionData = regional.filter((r) => r.region === region);
    const states = regionData[0].states;
    return states;
  };
  useLayoutEffect(() => {
    let map = am4core.create('mapdiv', am4maps.MapChart);
    map.geodata = am4geodata_usaAlbersLow;
    map.projection = new am4maps.projections.Miller();
    let california = new am4maps.MapPolygonSeries();
    california.useGeodata = true;
    california.include = getStates('California');
    california.mapPolygons.template.tooltipText = `California: ${getValue(
      'California'
    )} megawatthours `;
    california.mapPolygons.template.fill = am4core.color(
      color(getValue('California'))
    );
    map.series.push(california);
    let carolinas = new am4maps.MapPolygonSeries();
    carolinas.useGeodata = true;
    carolinas.include = getStates('Carolinas');
    carolinas.mapPolygons.template.tooltipText = `Carolinas: ${getValue(
      'Carolinas'
    )} megawatthours `;
    carolinas.mapPolygons.template.fill = am4core.color(
      color(getValue('Carolinas'))
    );
    map.series.push(carolinas);
    let central = new am4maps.MapPolygonSeries();
    central.useGeodata = true;
    central.include = getStates('Central');
    central.mapPolygons.template.tooltipText = `Central: ${getValue(
      'Central'
    )} megawatthours `;
    central.mapPolygons.template.fill = am4core.color(
      color(getValue('Central'))
    );
    map.series.push(central);
    let florida = new am4maps.MapPolygonSeries();
    florida.useGeodata = true;
    florida.include = getStates('Florida');
    florida.mapPolygons.template.tooltipText = `Florida: ${getValue(
      'Florida'
    )} megawatthours `;
    florida.mapPolygons.template.fill = am4core.color(
      color(getValue('Florida'))
    );
    map.series.push(florida);
    let midAtlantic = new am4maps.MapPolygonSeries();
    midAtlantic.useGeodata = true;
    midAtlantic.include = getStates('Mid-Atlantic');
    midAtlantic.mapPolygons.template.tooltipText = `Mid-Atlantic: ${getValue(
      'Mid-Atlantic'
    )} megawatthours `;
    midAtlantic.mapPolygons.template.fill = am4core.color(
      color(getValue('Mid-Atlantic'))
    );
    map.series.push(midAtlantic);
    let newEngland = new am4maps.MapPolygonSeries();
    newEngland.useGeodata = true;
    newEngland.include = getStates('New England');
    newEngland.mapPolygons.template.tooltipText = `New England: ${getValue(
      'New England'
    )} megawatthours `;
    newEngland.mapPolygons.template.fill = am4core.color(
      color(getValue('New England'))
    );
    map.series.push(newEngland);
    let newYork = new am4maps.MapPolygonSeries();
    newYork.useGeodata = true;
    newYork.include = getStates('New York');
    newYork.mapPolygons.template.tooltipText = `New York: ${getValue(
      'New York'
    )} megawatthours `;
    newYork.mapPolygons.template.fill = am4core.color(
      color(getValue('New York'))
    );
    map.series.push(newYork);
    let northwest = new am4maps.MapPolygonSeries();
    northwest.useGeodata = true;
    northwest.include = getStates('Northwest');
    northwest.mapPolygons.template.tooltipText = `Northwest: ${getValue(
      'Northwest'
    )} megawatthours `;
    northwest.mapPolygons.template.fill = am4core.color(
      color(getValue('Northwest'))
    );
    map.series.push(northwest);
    let southeast = new am4maps.MapPolygonSeries();
    southeast.useGeodata = true;
    southeast.include = getStates('Southeast');
    southeast.mapPolygons.template.tooltipText = `Southeast: ${getValue(
      'Southeast'
    )} megawatthours `;
    southeast.mapPolygons.template.fill = am4core.color(
      color(getValue('Southeast'))
    );
    map.series.push(southeast);
    let southwest = new am4maps.MapPolygonSeries();
    southwest.useGeodata = true;
    southwest.include = getStates('Southwest');
    southwest.mapPolygons.template.tooltipText = `Southwest: ${getValue(
      'Southwest'
    )} megawatthours `;
    southwest.mapPolygons.template.fill = am4core.color(
      color(getValue('Southwest'))
    );
    map.series.push(southwest);
    let tennessee = new am4maps.MapPolygonSeries();
    tennessee.useGeodata = true;
    tennessee.include = getStates('Tennessee');
    tennessee.mapPolygons.template.tooltipText = `Tennessee: ${getValue(
      'Tennessee'
    )} megawatthours `;
    tennessee.mapPolygons.template.fill = am4core.color(
      color(getValue('Tennessee'))
    );
    map.series.push(tennessee);
    let texas = new am4maps.MapPolygonSeries();
    texas.useGeodata = true;
    texas.include = getStates('Texas');
    texas.mapPolygons.template.tooltipText = `Texas: ${getValue(
      'Texas'
    )} megawatthours `;
    texas.mapPolygons.template.fill = am4core.color(color(getValue('Texas')));
    map.series.push(texas);
  }, []);
  return <div id="mapdiv" style={{ width: '100%', height: '390px' }}></div>;
};

export default Map;
