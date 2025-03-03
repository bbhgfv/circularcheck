import React from 'react'
import maturity_elements from './resources/maturity_elements.json';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    RadarController,
    RadialLinearScale,
    elements,
  } from 'chart.js';
  import {Radar} from 'react-chartjs-2';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale
  );
  import {getValue} from './Dictionary'
  function RadarChart(props){
    const dictActionElementToChoice = props.resultsChoice;
    const dict2DDimensionToWD = props.resultsLD;
    const dictActionFieldToWD = props.resultsAF;
    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({contentRef });
    const data = {
      labels: dict2DDimensionToWD.map(element => Object.entries(element)[0][0]),
      datasets: [{
        label:'SollRG',
        data:dict2DDimensionToWD.map(element => Object.entries(element)[0][1][1]),
        backgroundColor:'orange',
        borderColor:"orange",
      },
      {
        label:'IstRG',
        data:dict2DDimensionToWD.map(element => Object.entries(element)[0][1][0]),
        backgroundColor:'blue',
        borderColor:'blue',
      }]
    }

    const data2 = {
      labels: dictActionFieldToWD.map(element => Object.entries(element)[0][0]),
      datasets: [{
        label:'SollRG',
        data:dictActionFieldToWD.map(element => Object.entries(element)[0][1][1]),
        backgroundColor:'orange',
        borderColor:"orange",
      },
      {
        label:'IstRG',
        data:dictActionFieldToWD.map(element => Object.entries(element)[0][1][0]),
        backgroundColor:'blue',
        borderColor:'blue',
      }]
    }
   const datas = [data, data2];
    // link to json File to take data
   const chartData = maturity_elements.map((item) => {
    return {
      label: item['action field'],
      elements: item['elements'].map((el) => ({
        name: el.name,
        weight: el.weight,
        })),
      };
    });

  const generateChartData = (chart) => {
    const ohneWeightWert = chart.elements.map((el) => el.weight ); 
    return {
      labels: chart.elements.map((el) => el.name), // Tên các trục
      datasets: [
        {
          label: chart.label,
          data: chart.elements.map((el) => el.weight), // Dữ liệu theo weight
          backgroundColor: 'rgba(24, 69, 75, 0.2)',
          borderColor: 'rgb(11, 39, 39)',
          borderWidth: 2,
        },
        {
          label: chart.label,
          data: ohneWeightWert, // Dữ liệu theo weight
          backgroundColor: 'rgba(24, 69, 75, 0.2)',
          borderColor: 'rgb(147, 216, 36)',
          borderWidth: 2,
        },
        
        ],
      };
    };
    
    const options = {
      responsive: true,
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 1,
        },
      },
    }

   

    return(
      <div className='wide'>
        <button className='flex print center gap-10' onClick={() => reactToPrintFn()}>
          <svg xmlns="http://www.w3.org/2000/svg" className="tooltip-icon" viewBox="0 0 512 512">
            <path d="M64 464l48 0 0 48-48 0c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 304l-48 0 0-144-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z"/>
          </svg>
          <p>Export as PDF</p>
        </button>
      <div  ref ={ contentRef} className="flex wide column" >
        <div className ="Chart">
          <div style={ { width: "500px", margin: "0 auto" }}>
            <h2 style ={{ textAlign: "center" }}>Ihr Ergebnis:</h2>
            <h3 style ={{ textAlign: "center" }}>Business Model Canvas Dimensionen</h3>
            <Radar  data={data} options={options} />
            <h3 style ={{ textAlign: "center" }}>Handlungsfelder</h3>
            <Radar data={data2} options={options} />
          </div>
        </div>
      </div>
      </div>

    )
  }

export default RadarChart;