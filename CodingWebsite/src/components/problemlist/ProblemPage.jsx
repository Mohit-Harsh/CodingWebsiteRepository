import axios from "axios";
import { useLocation } from "react-router-dom";
import {useState, useEffect} from 'react';
import styles from './ProblemPage.module.css';
import SimilarProblems from "./SimilarProblems";

export default function ProblemPage()
{
    const config = {
        headers: {
          "Content-Type": "application/json"
          },
        withCredentials: true
        }
    let {state} = useLocation();
    const [similar, setSimilar] = useState([]);

    useEffect(() => {async function fetchdata(){
        const response = await axios.post('http://127.0.0.1:8000/api/similar/',{"topics":state['related_topics']},config);
        setSimilar(response);
        }
        fetchdata();
    },[])
    const topics = state['description'].split("\n\n");
    const tags = state['related_topics'].split(',')
    const companies = state['companies'].split(',')

    return(
        <>
            <div className="container-fluid" style={{paddingTop:'2vw', paddingLeft:'3vw', paddingRight:'3vw', paddingBottom:'2vw'}}>
                <h5 id={styles.title}>{state['title']}</h5>
                
                <div className="row" style={{display:'flex', margin:'2vw auto'}}>
                    
                    {companies.map((company) => <span key={company} id={styles.span} style={{marginBottom:'0.5vw'}}>{company}</span>)}
                    
                </div>

                <div className="row" id={styles.drow}>
                    {topics.map((item,i) =>
                        <p key={i} id={styles.description}>{item}</p>
                    )}
                </div>
                <div className="row" style={{display:'flex', margin:'2vw auto'}}>
                    
                    {tags.map((tag) => <span key={tag} id={styles.span}>{tag}</span>)}
                    
                </div>
                <h5 id={styles.title}>Similar Problems</h5>
                <div className="row" id={styles.drow}>
                    <SimilarProblems problems = {similar.data}></SimilarProblems>
                </div>
            </div>
        </>
    )
}