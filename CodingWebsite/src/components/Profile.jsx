import React, { useEffect, useState } from 'react';
import axios from "axios";
import styles from './Profile.module.css';
import solimg from './images/icons8-coding-100.png';
import timeimg from './images/icons8-time-100.png';
import accimg from './images/icons8-accuracy-80.png';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import ReactApexChart from 'react-apexcharts';
import { Component } from 'react';
import Chart from 'react-apexcharts';

export default function Profile({})
{ 

    const [overall_solved,setOverallSolved] = useState(0);
    const [overall_solved_easy,setOverallSolvedEasy] = useState(0);
    const [overall_solved_medium,setOverallSolvedMedium] = useState(0);
    const [overall_solved_hard,setOverallSolvedHard] = useState(0);
    const [topicsolved, setTopicSolved] = useState([]);

    const [chartwidth, setChartWidth] = useState(0);

    const [companysolved, setCompanySolved] = useState([]);
    const [avgtime,setAvgTime] = useState(0);
    const [avgacc, setAvgAcc] = useState(0);
 
    const config = {
      headers: {
        "Content-Type": "application/json"
        },
        withCredentials: true
      }

    useEffect(()=>{
      
      async function fetchdata(){
      const response = await axios.get('http://127.0.0.1:8000/api/topicchart/',config);
      setTopicSolved(response.data);
      setChartWidth(Object.keys(response.data['Easy']['Solved']).length*150)
      console.log(response);
    }
    fetchdata();
  },[])

    useEffect(() => {
      async function companychart(){
      const res = await axios.get('http://127.0.0.1:8000/api/companychart/',config)
      console.log(res.data);
      setCompanySolved(res.data);
    }
    companychart();
  },[])

    useEffect(() => {
      async function overallchart(){
      const res = await axios.get('http://127.0.0.1:8000/api/overallchart/',config)
      console.log(res.data);
      setOverallSolvedEasy(res.data['Easy']['Solved']);
      setOverallSolvedMedium(res.data['Medium']['Solved']);
      setOverallSolvedHard(res.data['Hard']['Solved']);
      setOverallSolved(parseInt(res.data['Easy']['Solved'])+parseInt(res.data['Medium']['Solved'])+parseInt(res.data['Hard']['Solved']));
      setAvgTime(parseFloat((parseFloat(res.data['Easy']['Time'])+parseFloat(res.data['Medium']['Time'])+parseFloat(res.data['Hard']['Time']))/3).toFixed(2));
      setAvgAcc(parseFloat((parseFloat(res.data['Easy']['Accuracy'])+parseFloat(res.data['Medium']['Accuracy'])+parseFloat(res.data['Hard']['Accuracy']))/3).toFixed(2));
    }
    overallchart();
  },[])

  if((companysolved.length != 0) && (topicsolved.length != 0))
  {
    const topic_chart_obj = { series : [{name : 'Easy', data : Object.values(topicsolved['Easy']['Solved'])},
                                        {name : 'Medium', data : Object.values(topicsolved['Medium']['Solved'])},
                                        {name : 'Hard', data : Object.values(topicsolved['Hard']['Solved'])}],
                                      
                              options : { plotOptions: { bar: {horizontal: false, columnWidth: '55%', endingShape: 'rounded'}},
                                          dataLabels: {enabled: false},
                                          stroke: {show: true, width: 2, colors: ['transparent']},
                                          xaxis: {categories: Object.keys(topicsolved['Easy']['Solved'])},}}

    const time_chart_obj = { series : [{name : 'Easy', data : Object.values(topicsolved['Easy']['Time'])},
                                       {name : 'Medium', data : Object.values(topicsolved['Medium']['Time'])},
                                       {name : 'Hard', data : Object.values(topicsolved['Hard']['Time'])}],
                                    
                              options : { chart: {zoom: {enabled: false}},
                                          dataLabels: {enabled: false},
                                          stroke: {curve:'smooth'},
                                          xaxis: {categories: Object.keys(topicsolved['Easy']['Time'])}, }}

    const acc_chart_obj = { series : [{name : 'Easy', data : Object.values(topicsolved['Easy']['Accuracy'])},
                                          {name : 'Medium', data : Object.values(topicsolved['Medium']['Accuracy'])},
                                          {name : 'Hard', data : Object.values(topicsolved['Hard']['Accuracy'])}],
                                       
                                 options : { chart: {zoom: {enabled: false}},
                                             dataLabels: {enabled: false},
                                             stroke: {curve: 'smooth'},
                                             xaxis: {categories: Object.keys(topicsolved['Easy']['Accuracy'])},}}

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
                  <div className="row" id={styles.row}>
                  <h5 id={styles.charttitle}>Solved</h5>
                    <div id={styles.chart}>
                      <Chart options={topic_chart_obj.options} series={topic_chart_obj.series} type="bar" height={350} width={`${chartwidth}`}/>
                    </div>
                  </div>
                  <div className="row" id={styles.row}>
                  <h5 id={styles.charttitle}>Speed</h5>
                    <div id={styles.chart}>
                      <Chart options={time_chart_obj.options} series={time_chart_obj.series} type="area" height={350} width={`${chartwidth}`}/>
                    </div>
                  </div>
                  <div className="row" id={styles.row}>
                  <h5 id={styles.charttitle}>Accuracy</h5>
                    <div id={styles.chart}>
                      <Chart options={acc_chart_obj.options} series={acc_chart_obj.series} type="area" height={350} width={`${chartwidth}`}/>
                    </div>
                  </div>
              </div>
              <div className="col-4" style={{padding:'2vw 2vw', height:'fit-content',backgroundColor:'white',borderRadius:'0.5vw',border:'transparent',boxShadow:'0px 4px 8px 4px rgb(230,230,230'}}>
                <div className="row" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <PieChart
                      series={[
                        {
                          data: [
                            { id: 0, value: overall_solved_easy, label: 'Easy' },
                            { id: 1, value: overall_solved_medium, label: 'Medium' },
                            { id: 2, value: overall_solved_hard, label: 'Hard' },
                          ],
                        },
                      ]}
                      width={400}
                      height={200}
                    />
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
