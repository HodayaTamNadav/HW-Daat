// #2:
import React from "react";
//npm i canvasjs-react-charts
import { CanvasJSChart } from 'canvasjs-react-charts'
const Column = (props) => {
  const { allPackages } = props;
  const options = {
    title: {
      text: "Most Useful Packages"
    },
    data: [{
      type: "column",
      dataPoints: [
        // { label: allPackages[0]?.name, y: 10 },
        // { label: allPackages[1]?.name, y: 15 },
        // { label: allPackages[2]?.name, y: 25 },
        // { label: allPackages[3]?.name, y: 30 },
        // { label: allPackages[4]?.name, y: 28 }
        {x: new Date(2002, 0), y: 2506000},
			{x: new Date(2003, 0), y: 2798000},
			{x: new Date(2004, 0), y: 3386000},
			{x: new Date(2005, 0), y: 6944000},
			{x: new Date(2006, 0), y: 6026000},
			{x: new Date(2007, 0), y: 2394000},
			{x: new Date(2008, 0), y: 1872000},
			{x: new Date(2009, 0), y: 2140000},
			{x: new Date(2010, 0), y: 7289000},
			{x: new Date(2011, 0), y: 4830000},
      ]
    }]
  }
  return (
    <div style={{ margin: "auto", width: "60vw" }}>
      <CanvasJSChart options={options}
      />
    </div>
  );
}
export default Column;
