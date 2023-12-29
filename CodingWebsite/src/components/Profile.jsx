import React, { useEffect, useState } from 'react';
import axios from "axios";
import Chart from 'chart.js/auto'

export default function Profile({})
{ 

    const [chart_width,setChartWidth] = useState(0);

    const config = {
      headers: {
        "Content-Type": "application/json"
        },
        withCredentials: true
      }
    
    function sum(arr)
    {
      let s=0;
      for(let i=0;i<arr.length;i++)
      {
        s+=arr[i];
      }
      return s
    }

    async function fetchdata()
    {
      const response = await axios.get('http://127.0.0.1:8000/api/topicchart/',config);

      const easy_solved_values = Object.values(response.data['Easy']['Solved']);
      const medium_solved_values = Object.values(response.data['Medium']['Solved']);
      const hard_solved_values = Object.values(response.data['Hard']['Solved']);

      const easy_time_values = Object.values(response.data['Easy']['Time']);
      const medium_time_values = Object.values(response.data['Medium']['Time']);
      const hard_time_values = Object.values(response.data['Hard']['Time']);

      const easy_acc_values = Object.values(response.data['Easy']['Accuracy']);
      const medium_acc_values = Object.values(response.data['Medium']['Accuracy']);
      const hard_acc_values = Object.values(response.data['Hard']['Accuracy']);

      const overall_solved_easy = sum(easy_solved_values);
      const overall_solved_medium = sum(medium_solved_values); 
      const overall_solved_hard = sum(hard_solved_values);

      const overall_solved = overall_solved_easy + overall_solved_medium + overall_solved_hard;

      const labels = Object.keys(response.data['Easy']['Solved']);

      setChartWidth(labels.length*10);

      new Chart(
        document.getElementById('topicsolved'),
        {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Easy',
                data: easy_solved_values,
                backgroundColor: "#ea5545",
              },
              {
                label: 'Medium',
                data: medium_solved_values,
                backgroundColor: "#27aeef",
              },
              {
                label: 'Hard',
                data: hard_solved_values,
                backgroundColor: "#edbf33",
              }
            ]
          },
          options:{
            maintainAspectRatio: false,
            responsive: false,
          }
        }
      );

      new Chart(
        document.getElementById('timesolved'),
        {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Easy',
                data: easy_time_values,
                backgroundColor: "#ea5545",
              },
              {
                label: 'Medium',
                data: medium_time_values,
                backgroundColor: "#27aeef",
              },
              {
                label: 'Hard',
                data: hard_time_values,
                backgroundColor: "#edbf33",
              }
            ]
          },
          options:{
            maintainAspectRatio: false,
            responsive: false,
            
          }
        }
      );

      new Chart(
        document.getElementById('accsolved'),
        {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Easy',
                data: easy_acc_values,
                backgroundColor: "#ea5545",
              },
              {
                label: 'Medium',
                data: medium_acc_values,
                backgroundColor: "#27aeef",
              },
              {
                label: 'Hard',
                data: hard_acc_values,
                backgroundColor: "#edbf33",
              }
            ]
          },
          options:{
            maintainAspectRatio: false,
            responsive: false,
            scales: {
              x: {
                  ticks: {
                      autoSkip: false,
                      maxRotation: 0,
                      minRotation: 0,
                  }
              }
            }
          }
        }
      );
    }
      
    fetchdata();

    if(chart_width != 0){    

    return(
        <>

            <h5>Profile</h5>
            <div className="row">
              <div className="col-8">
                  <div className="row" style={{overflowX:'scroll', width:'100%', height:'18vw'}}>
                    <div ><canvas id="topicsolved" style={{width:`${chart_width}vw`, height:'16vw'}}></canvas></div>
                  </div>
                  <div className="row" style={{overflowX:'scroll', width:'100%', height:'18vw'}}>
                    <div ><canvas id="timesolved" style={{width:`${chart_width}vw`, height:'16vw'}}></canvas></div>
                  </div>
                  <div className="row" style={{overflowX:'scroll', width:'100%', height:'18vw'}}>
                    <div ><canvas id="accsolved" style={{width:`${chart_width}vw`, height:'16vw'}}></canvas></div>
                  </div>
              </div>
              <div className="col-4">
                
              </div>
            </div>

        </>
    )
}
  else
  {
    return(null)
  }
}
