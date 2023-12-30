import styles from './Home.module.css';
import Title from './recommendations/Title';
import Recomprob from './recommendations/Recomprob.jsx';
import New from './recommendations/New.jsx';
import React from 'react';
import Problemlist from './problemlist/Problemlist.jsx'
import Topicfilter from './topicfilter/Topicfilter.jsx';
import google from './images/google.png'
import microsoft from './images/microsoft.jpg'
import flipkart from './images/flipkart.png'
import infosys from './images/infosys.webp'
import tcs from './images/tcs.png'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Avatar from '@mui/material/Avatar';
import pic from '../assets/ppic.jpg';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Navbar from './navbar/Navbar';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Home({email})
{
  const config = {
    headers: {
      "Content-Type": "application/json"
      },
      withCredentials: true
    }


    const [recom,setRecom] = useState([]);

    const [newprob,setNew] = useState([]);
    
    const [allprob,setAll] = useState([]);

    const [filtertitle,setFilterTitle] = useState("");
    const [filterdifficulty,setFilterDifficulty] = useState("");
    const [pagenumber,setPageNumber] = useState(1);
    const [ordering,setOrdering] = useState('id');
    const [topicfilter, setTopicFilter] = useState("");
    
    useEffect(() => {
      async function fetchData() {

        await axios.get(`http://127.0.0.1:8000/api/all/?title__icontains=${filtertitle}&difficulty__icontains=${filterdifficulty}&ordering=${ordering}&related_topics__icontains=${topicfilter}&page=${pagenumber}`,config)
        .then((res) => {
          console.log(topicfilter);
        setAll(res.data['results'])})
      }
      fetchData();
    }, [filtertitle,filterdifficulty,pagenumber,ordering,topicfilter])

    useEffect(() => {

      axios.get("http://127.0.0.1:8000/api/recom",config)
      .then((res) => setRecom(res.data))

    }, [])

    useEffect(() => {

      axios.get("http://127.0.0.1:8000/api/new",config)
      .then((res) => setNew(res.data))

    }, [])

    console.log(allprob);
  
    function changeData(event)
    {
      setFilterTitle(event.target.value);
    }
  
    function sortByDifficulty(event)
    {
      if(event.target.innerText === "All")
      {
        console.log("ALL difficulty");
        setFilterDifficulty("");
      }
      else
      setFilterDifficulty(event.target.innerText);
    }
  
    function sortByAccuracy(event)
    {
  
      console.log('sort by accuracy');
  
    }
  
    function sortByFrequency(event)
    {
  
      console.log('sort by frequency');
  
    }

    return(
        <>
                <nav id={styles.nav}>

                  <div className="row">

                      <div className="col-4" style={{display:'flex',textAlign:'center',alignItems:'center'}}>

                          <Avatar alt="Remy Sharp" src={pic} style={{alignSelf:'start', marginLeft:'2.5vw', width:'2vw', height:'2vw'}}/>
                          <h5 style={{fontSize:'1vw',fontWeight:'500',marginLeft:'1vw',marginBottom:0}}>{email}</h5>

                      </div>

                      <div className="col" id={styles.div}>
                        
                          <Badge  color="secondary" sx={{ "& .MuiBadge-badge": { fontSize: '0.5vw', height: '1vw', minWidth: '1vw' } }} style={{marginRight:'1.5vw'}}>
                            <SettingsRoundedIcon sx={{color:'rgba(27, 2, 103,0.75)'}} style={{fontSize:'1.5vw'}}/>
                          </Badge>

                          <Badge badgeContent={5} max={100} color="secondary" sx={{ "& .MuiBadge-badge": { fontSize: '0.5vw', height: '1vw', minWidth: '1vw' } }} style={{marginRight:'1.5vw'}}>
                            <NotificationsRoundedIcon sx={{color:'rgba(27, 2, 103,0.75)'}}  style={{fontSize:'1.5vw'}}/>
                          </Badge>

                          <Badge badgeContent={15} max={100} color="secondary" sx={{ "& .MuiBadge-badge": { fontSize: '0.5vw', height: '1vw', minWidth: '1vw' } }} style={{marginRight:'1.5vw'}}>
                            <MailIcon sx={{color:'rgba(27, 2, 103,0.75)'}} style={{fontSize:'1.5vw'}}/>
                          </Badge>

                      </div>

                  </div>

                </nav>

                <div className="container-fluid" id={styles.carousel} >
              
                  <h5 id={styles.h5}>INTERVIEW GUIDE</h5>
                  <p id={styles.p}>Decoding Success: Empowering Insights from real interview experiences!</p>

                  <div className="row" style={{paddingLeft:'1vw', marginTop:'3vw'}}>

                    <div class="card" id={styles.card}>
                      <div class="card-body">
                        <div className="row">
                          <img src={google} alt="" style={{width:'10vw'}}/>
                        </div>
                      </div>
                    </div>

                    <div class="card" id={styles.card}>
                      <div class="card-body">
                        <div className="row">
                          <img src={microsoft} alt="" style={{width:'10vw'}}/>
                        </div>
                      </div>
                    </div>

                    <div class="card" id={styles.card}>
                      <div class="card-body">
                        <div className="row">
                          <img src={flipkart} alt="" style={{width:'10vw'}}/>
                        </div>
                      </div>
                    </div>

                    <div class="card" id={styles.card}>
                      <div class="card-body">
                        <div className="row">
                          <img src={infosys} alt="" style={{width:'7vw'}}/>
                        </div>
                      </div>
                    </div>

                    <div class="card" id={styles.card}>
                      <div class="card-body">
                        <div className="row">
                          <img src={tcs} alt="" style={{width:'7vw'}}/>
                        </div>
                      </div>
                    </div>                  

                  </div>
                  
                </div>

                <div className="container-fluid" id={styles.recom}>

                  <div className="row" id={styles.row1}>
                    <div className="col-8">
                      <div className="row">
                        <Title></Title>
                        {recom.slice(0,5).map((obj)=><Recomprob key={obj['id']} obj={obj} title={obj['title']} difficulty={obj['difficulty']} accuracy={obj['acceptance_rate']} submissions={obj['submissions']}></Recomprob>)}
                      </div>
                      <div className="row" id={styles.row2}>
                        <Problemlist data={allprob}  setPageNumber={setPageNumber} changeData={changeData} sortByAccuracy={sortByAccuracy} sortByFrequency={sortByFrequency} sortByDifficulty={sortByDifficulty}></Problemlist>
                      </div>
                    </div>   
                    <div className="col-4" >
                      <New new_prob_list={newprob.slice(0,3)}></New>
                      <Topicfilter setTopicFilter={setTopicFilter}></Topicfilter>
                    </div>
                  </div>
                </div>          

        </>
    )
}