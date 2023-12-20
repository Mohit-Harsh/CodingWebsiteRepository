import styles from './Practice.module.css';
import React, { useState } from 'react';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Avatar from '@mui/material/Avatar';
import pic from '../assets/ppic.jpg';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Navbar from './navbar/Navbar';
import TopProblemList from './top_problems_list/TopProblemList.jsx';

export default function Practice()
{

    const [tabstate, setTabstate] = useState(0);

    function changeState(event)
    {
        if(event.target.innerText == "All problem lists")
        {
          setTabstate(0);
        }
        else if(event.target.innerText == "Lists by experts")
        {
          setTabstate(1);
        }
        else if(event.target.innerText == "Company-wise lists")
        {
          setTabstate(2);
        }
        else if(event.target.innerText == "Topic-wise lists")
        {
          setTabstate(3);
        }
    }

    return(
        <>

          <div className="container-fluid" id={styles.recom}>

            <h5 id={styles.h3}>Top Problem Lists</h5>
            
            <div className="row" style={{marginTop:'2vw', paddingLeft:'1vw'}}>

                <div className="col-2" id={styles.col2} onClick={changeState}>
                  <h5 id={tabstate == 0 ? styles.h5active : styles.h5}>All problem lists</h5>
                </div>
                <div className="col-2" id={styles.col2} onClick={changeState}>
                  <h5 id={tabstate == 1 ? styles.h5active : styles.h5}>Lists by experts</h5>
                </div>
                <div className="col-2" id={styles.col2} onClick={changeState}>
                  <h5 id={tabstate == 2 ? styles.h5active : styles.h5}>Company-wise lists</h5>
                </div>
                <div className="col-2" id={styles.col2} style={{paddingRight:0}} onClick={changeState}>
                  <h5 id={tabstate == 3 ? styles.h5active : styles.h5}>Topic-wise lists</h5>
                </div>

            </div>

            <TopProblemList tabstate={tabstate}/>
            
          </div>

          
        </>
    )
}