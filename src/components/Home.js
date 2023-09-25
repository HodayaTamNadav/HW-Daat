import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Column from "./Column";
import moment from 'moment';

function Home() {

  const API_ENDPOINT = 'https://edge.boi.gov.il/FusionEdgeServer/sdmx/v2/data/dataflow/BOI.STATISTICS/EXR/1.0/RER_USD_ILS';
  const FORMAT = 'YYYY-MM-DD';
  const [data, setData] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [object, setObject] = useState(null);


  useEffect(() => {
    getDataForCurrentDate()
    getData()
  }, []);

  const getDataForCurrentDate = async () => {
    debugger

    let dataForLastDay;
    let dataForLastMonth;
    let dataForLast6Months;
    let dataForLastYear;
    let valuesLastDay;
    let valuesLastMonth;
    if ([0, 1, 6].includes(new Date().getDay())) {

      const t = new Date().getDate() + (6 - new Date().getDay() - 1) - 7;
      const lastFridayDate = moment(new Date().setDate(t)).format(FORMAT);
      dataForLastDay = await getData(lastFridayDate, lastFridayDate);
      valuesLastDay = convertXMLToObj(dataForLastDay);

    }
    else {
      const yesterdayDate = moment(new Date().setDate(new Date().getDate() - 1)).format(FORMAT);
      dataForLastDay = await getData(yesterdayDate, yesterdayDate)
      valuesLastDay = convertXMLToObj(dataForLastDay);
    }
    //get data for last month
    const lastMonthDate = moment(new Date().setMonth(new Date().getMonth() - 1, new Date().getDate() + 1)).format(FORMAT);
    dataForLastMonth = await getData(lastMonthDate, moment(new Date()).format(FORMAT))
    valuesLastMonth=convertXMLToObj(dataForLastMonth)
    //get data for 6 months
    const lastSixMonthDate = moment(new Date().setMonth(new Date().getMonth() - 6)).format(FORMAT);
    debugger
    dataForLast6Months = await getData(lastSixMonthDate,lastSixMonthDate )
    //get data for last year
    const lastYearDate = moment(new Date().setMonth(new Date().getMonth() - 12)).format(FORMAT);
    dataForLastYear = await getData(lastYearDate, moment(new Date()).format(FORMAT))

    //save data in localstorage
    const dolarValuesData = {
      id: dataForLastDay?.id,
      name: dataForLastDay?.name,
    // valuesLastDay: valuesLastDay

    }
  }
  const convertXMLToObj = (data) => {
    let arr = []
    // data.valuesForDates.getElementsByTagName('Obs')
    debugger
    for (let index = 0; index < data?.valuesForDates?.getElementsByTagName('Obs').length; index++) {
      arr.push(
        {
          date: data?.valuesForDates.getElementsByTagName('Obs')[index].attributes.TIME_PERIOD.textContent,
          value: data?.valuesForDates.getElementsByTagName('Obs')[index].attributes.OBS_VALUE.textContent
        }
      )
    }
    return arr;
  }

  const getData = async (startDate, endDate) => {
    try {
      const response = await axios.get(API_ENDPOINT, {
        params: {
          startperiod: startDate,
          endperiod: endDate,
        },
      });

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'text/xml');
      const id = xmlDoc.getElementsByTagName('message:ID')[0]?.textContent;
      const name = xmlDoc.getElementsByTagName('message:Structure')[0].attributes.structureID.textContent;
      const valuesForDates = xmlDoc.getElementsByTagName('message:DataSet')[0].getElementsByTagName('Series')[0];
      let dataValues = {
        id: id,
        name: name,
        valuesForDates: valuesForDates
      }

      return dataValues;

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  return (
    <div>
      <Column />
    </div>
  );
}

export default Home;
