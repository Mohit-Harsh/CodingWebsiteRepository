import styles from "./Profile.module.css";
import Title from "./recommendations/Title.jsx";
import Recomprob from "./recommendations/Recomprob.jsx";
import New from './recommendations/New.jsx';
import React, { useEffect, useState } from 'react';
import Problemlist from './problemlist/Problemlist.jsx'
import Topicfilter from './topicfilter/Topicfilter.jsx';
import axios from "axios";

export default function Home({recom,allprob,setPageNumber,changeData,sortByAccuracy,sortByFrequency,sortByDifficulty,newprob,setTopicFilter})
{ 
    const [solved, setSolved] = useState([]);
    const config = {
      headers: {
        "Content-Type": "application/json"
        },
        withCredentials: true
      }

    useEffect(() =>{
      async function fetchdata()
      {
        const response = await axios.get('http://127.0.0.1:8000/api/solved',config);
        console.log(response);
      }
      fetchdata();
    },[])

    return(
        <>

            <h5>Profile</h5>

        </>
    )
}