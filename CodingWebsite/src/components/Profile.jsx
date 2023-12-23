import React, { useEffect, useState } from 'react';
import axios from "axios";
import Chart from 'chart.js/auto'

export default function Profile({})
{ 
    const config = {
      headers: {
        "Content-Type": "application/json"
        },
        withCredentials: true
      }

    useEffect(() =>{
      async function fetchdata()
      {
        const response = await axios.get('http://127.0.0.1:8000/api/topicchart/',config);
        const easy_solved_values = Object.values(response.data['Easy']['Solved']);
        const medium_solved_values = Object.values(response.data['Medium']['Solved']);
        const hard_solved_values = Object.values(response.data['Hard']['Solved']);
        const labels = Object.keys(response.data['Easy']['Solved']);
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
              scales:{
                y:{max:5, tick:1}
              }
            }
          }
        );
      }
      fetchdata();
    },[])

    return(
        <>

            <h5>Profile</h5>
            <div className="row">
              <div className="col-8">
                  <div className="row">
                    <div style={{width: "100%",height:"15vw"}}><canvas id="topicsolved"></canvas></div>
                  </div>
              </div>
              <div className="col-4">
                
              </div>
            </div>

        </>
    )
}
