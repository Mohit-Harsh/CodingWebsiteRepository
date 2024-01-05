import React, { useEffect, useState } from 'react';
import axios from "axios";
import Chart from 'chart.js/auto';
import styles from './Profile.module.css';
import solimg from './images/icons8-coding-100.png';
import timeimg from './images/icons8-time-100.png';
import accimg from './images/icons8-accuracy-80.png';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

export default function Profile({})
{ 

    const [overall_solved,setOverallSolved] = useState(0);
    const [overall_solved_easy,setOverallSolvedEasy] = useState(0);
    const [overall_solved_medium,setOverallSolvedMedium] = useState(0);
    const [overall_solved_hard,setOverallSolvedHard] = useState(0);
    const [topicsolved, setTopicSolved] = useState([]);

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

    if((companysolved != undefined) && (topicsolved != undefined)){
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
