import axios from "axios";
import { useLocation } from "react-router-dom";
import {useState, useEffect} from 'react';
import styles from './ProblemPage.module.css';
import SimilarProblems from "./SimilarProblems";
import SimilarDescProblems from './SimilarDescProblems.jsx';

export default function ProblemPage()
{
    const config = {
        headers: {
          "Content-Type": "application/json"
          },
        withCredentials: true
        }
    let {state} = useLocation();

    useEffect(() => {
        window.scrollTo(0,0);
    },[])

    const [similar, setSimilar] = useState([]);
    const [desc,setDesc] = useState([]);
    const description = state['description'].split(',')[0];

    console.log(description);

    useEffect(() => {async function fetchdata(){
        const response = await axios.post('http://127.0.0.1:8000/api/similar/',{"topics":state['related_topics']},config);
        setSimilar(response);
        }
        fetchdata();
    },[])
    useEffect(() => {async function fetchdata(){
        const response = await axios.post('http://127.0.0.1:8000/api/problembydescription/',{"des":description},config);
        setDesc(response);
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
                <h5 id={styles.title} style={{marginBottom:'0.5vw'}}>TOPIC BASED RECOMMENDATIONS</h5>
                <p id={styles.p} style={{marginBottom:'1vw'}}>List of problems based on same or similar topics</p>
                <div className="row" style={{margin:"2vw -1vw", width:'100%', height:'fit-content'}}>
                    <SimilarProblems problems = {similar.data}></SimilarProblems>
                </div>
                <h5 id={styles.title} style={{marginBottom:'0.5vw', marginTop:'2vw'}}>PROBLEM BASED RECOMMENDATIONS</h5>
                <p id={styles.p} style={{marginBottom:'1vw'}}>List of problms based on similar problem statement</p>
                <div className="row" style={{margin:"2vw -1vw", width:'100%', height:'fit-content'}}>
                    <SimilarDescProblems problems = {desc.data}></SimilarDescProblems>
                </div>
                
            </div>
        </>
    )
}