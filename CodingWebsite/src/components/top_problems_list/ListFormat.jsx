import React from "react";
import styles from './ListFormat.module.css';
import { Link } from "react-router-dom";

export default function ListFormat({company,logo,title,content,total_problems,time})
{
    return( <>

            <div class="card" style={{width:'15vw'}}>

                <div class="card-body" style={{padding:'1vw'}}>
                <div className="row">
                    <div className="col-3" id={styles.col3}>
                        <div style={{borderRadius:'5px',border:'1px solid gray',padding:0, overflow:'hidden',width:'100%'}}> 
                        <img src={logo} alt="" style={{width:'100%'}}/>
                        </div>   
                    </div>
                    <div className="col-9">
                        <h5 id={styles.h4}>{title}</h5>
                    </div>
                </div>
                <div className="row">
                    <p id={styles.p}>{content}</p>
                </div>
                <div className="row">
                    <div className="col-6">
                        
                        <h5 style={{fontSize:'0.75vw',color:'rgba(27, 2, 103,0.65)'}}>Total problems</h5>
                        <p style={{fontSize:'0.75vw',fontWeight:'500'}}>{total_problems}</p>
                        
                    </div>
                    <div className="col-6">
                        <h5 style={{fontSize:'0.75vw',color:'rgba(27, 2, 103,0.65)'}}>Time</h5>
                        <p style={{fontSize:'0.75vw',fontWeight:'500'}}>{time}</p>
                    </div>
                </div>

                <div className="row" style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'0.5vw 1vw'}}>

                    <Link to={`company/${company}`}><button id={styles.btn}>View problem list</button></Link>

                </div>

                </div>

            </div>
            
    </>
    )
}