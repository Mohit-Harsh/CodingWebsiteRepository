import React, { useEffect, useState } from 'react';
import axios from "axios";
import Chart from 'chart.js/auto';
import styles from './Profile.module.css';
import solimg from './images/icons8-coding-100.png';
import timeimg from './images/icons8-time-100.png';
import accimg from './images/icons8-accuracy-80.png';

export default function Profile({})
{ 

    const [chart_width,setChartWidth] = useState(0);
    const [overall_solved,setOverallSolved] = useState(0);
    const [overall_solved_easy,setOverallSolvedEasy] = useState(0);
    const [overall_solved_medium,setOverallSolvedMedium] = useState(0);
    const [overall_solved_hard,setOverallSolvedHard] = useState(0);

    const [companysolved, setCompanySolved] = useState([]);

    const companymap = {}

    const [avgtime,setAvgTime] = useState(0);
    const [avgacc, setAvgAcc] = useState(0);
 
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

    function sum2(arr)
    {
      let c=0;
      let s=0;
      for(let i=0;i<arr.length;i++)
      {
        if(arr[i]>0)
        {
          s+=arr[i];
          c+=1
        }
        
      }
      return (s/c)
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
      
      const labels = Object.keys(response.data['Easy']['Solved']);

      const overall_acc = (sum2(easy_acc_values) + sum2(medium_acc_values) + sum2(hard_acc_values))/(3);
      const overall_time = (sum2(easy_time_values) + sum2(medium_time_values) + sum2(hard_time_values))/(3);


      setOverallSolvedEasy(sum(easy_solved_values));
      setOverallSolvedMedium(sum(medium_solved_values));
      setOverallSolvedHard(sum(hard_solved_values));
      setOverallSolved(overall_solved_easy + overall_solved_medium + overall_solved_hard);
      setAvgTime(overall_time);
      setAvgAcc(Math.round(overall_acc));
      setChartWidth(labels.length*8);

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
                backgroundColor: "#71b370",
              },
              {
                label: 'Medium',
                data: medium_solved_values,
                backgroundColor: "#ffc169",
              },
              {
                label: 'Hard',
                data: hard_solved_values,
                backgroundColor: "#fe4045",
              }
            ]
          },
          options:{
            maintainAspectRatio: false,
            responsive: false,
            plugins:{
              legend: {
                display: false,
              }
            }
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
                backgroundColor: "#71b370",
              },
              {
                label: 'Medium',
                data: medium_time_values,
                backgroundColor: "#ffc169",
              },
              {
                label: 'Hard',
                data: hard_time_values,
                backgroundColor: "#fe4045",
              }
            ]
          },
          options:{
            maintainAspectRatio: false,
            responsive: false,
            plugins:{
              legend: {
                display: false,
              }
            }
            
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
                backgroundColor: "#71b370",
              },
              {
                label: 'Medium',
                data: medium_acc_values,
                backgroundColor: "#ffc169",
              },
              {
                label: 'Hard',
                data: hard_acc_values,
                backgroundColor: "#fe4045",
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
            },
            plugins:{
              legend: {
                display: false,
              }
            }
          }
        }
      );

      new Chart(
        document.getElementById('doughnut'),
        {
          type: 'doughnut',
          data: {
            labels: ['Easy','Medium','Hard'],
            datasets: [
              {
                label: 'Solved',
                data: [overall_solved_easy,overall_solved_medium,overall_solved_hard],
                backgroundColor: ["#71b370","#ffc169","#fe4045"],
              }
            ]
          },
          options:{
            maintainAspectRatio: true,
            responsive: true,
          }
        }
      );
    }

    fetchdata();

    useEffect(()=>{
       axios.get('http://127.0.0.1:8000/api/companychart/',config)
      .then((res) => setCompanySolved(res.data['Solved']))
    },[])

    if(chart_width != 0){
    return(
        <>

            <div className="row" style={{marginLeft:'3vw', marginTop:'2vw', paddingRight:'2vw'}} >
              <div className="col-8">

                  <div className="row" id={styles.row}>
                      <div className="col-4" style={{padding: '0vw 2vw'}}>
                          <div className='row' id={styles.overall1}>
                            <div className="col-4">
                              <img src={solimg} alt="" style={{height:'4vw', width:'auto', backgroundColor:'white', padding:'0.5vw', border:'transparent',borderRadius:'0.3vw',alignSelf:'start'}}/>
                            </div>
                            <div className="col-8">
                              <h5 id={styles.h5}>{overall_solved}</h5>
                              <p id={styles.p}>Total Problems Solved</p>
                            </div>
                          </div>
                      </div>
                      <div className="col-4" style={{padding: '0vw 2vw'}}>
                          <div className='row' id={styles.overall2}>
                            <div className="col-4">
                              <img src={timeimg} alt="" style={{height:'4vw', width:'auto', backgroundColor:'white', padding:'0.5vw', border:'transparent',borderRadius:'0.3vw',alignSelf:'flex-start'}}/>
                            </div>
                            <div className="col-8">
                              <h5 id={styles.h5}>{avgtime} mins</h5>
                              <p id={styles.p}>Avg. Solving Time</p>
                            </div>
                          </div>
                      </div>
                      <div className="col-4" style={{padding: '0vw 2vw'}}>
                          <div className='row' id={styles.overall3}>
                            <div className="col-4">
                              <img src={accimg} alt="" style={{height:'4vw', width:'auto', backgroundColor:'white', padding:'0.5vw', border:'transparent',borderRadius:'0.3vw',alignSelf:'start'}}/>
                            </div>
                            <div className="col-8" style={{textAlign:'center'}}>
                              <h5 id={styles.h5}>{avgacc}%</h5>
                              <p id={styles.p}>Avg. Solving Accuracy</p>
                            </div>
                          </div>
                      </div>
                  </div>
                  <div className="row" id={styles.chart} style={{overflowX:'scroll', width:'100%', height:'fit-content'}}>
                    <h5 id={styles.title}>Solved</h5>
                    <div ><canvas id="topicsolved" style={{width:`${chart_width}vw`, height:'16vw'}}></canvas></div>
                  </div>
                  <div className="row" id={styles.chart} style={{overflowX:'scroll', width:'100%', height:'fit-content'}}>
                    <h5 id={styles.title}>Time</h5>
                    <div ><canvas id="timesolved" style={{width:`${chart_width}vw`, height:'16vw'}}></canvas></div>
                  </div>
                  <div className="row" id={styles.chart} style={{overflowX:'scroll', width:'100%', height:'fit-content'}}>
                    <h5 id={styles.title}>Accuracy</h5>
                    <div ><canvas id="accsolved" style={{width:`${chart_width}vw`, height:'16vw'}}></canvas></div>
                  </div>
              </div>
              <div className="col-4" style={{padding:'2vw 2vw', height:'fit-content',backgroundColor:'white',borderRadius:'0.5vw',border:'transparent',boxShadow:'0px 4px 8px 4px rgb(230,230,230'}}>
                <div className="row" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <div style={{width:'70%'}}><canvas id="doughnut"></canvas></div>
                </div>
                <div className="row" style={{marginTop:'2vw'}}>
                  <h5 id={styles.title}>Solved Interview Problems</h5>
                  <div className="row" style={{display:'contents'}}>
                  {Object.keys(companysolved).map((key,i) => <>
                    <button key={`${i}`} id={styles.btn}>
                    {key}
                    <span key={`${key}${i}`} id = {styles.btnspan}>{companysolved[key]}</span>
                    </button>
                  </>)}
                  </div>
                </div>
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
