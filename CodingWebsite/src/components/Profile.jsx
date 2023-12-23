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
        const solved_keys = Object.keys(response.data['Solved']);
        const solved_values = Object.values(response.data['Solved']);
        new Chart(
          document.getElementById('topicsolved'),
          {
            type: 'bar',
            data: {
              labels: solved_keys,
              datasets: [
                {
                  label: 'Problems Solved Per Topic',
                  data: solved_values
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
