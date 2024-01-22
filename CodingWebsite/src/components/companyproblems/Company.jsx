import { useState, useEffect } from "react";
import styles from './Company.module.css';
import { Link, useParams } from "react-router-dom";
import Recomprob from "../recommendations/Recomprob";
import axios from "axios";
import ReactApexChart from 'react-apexcharts';
import Title from "../recommendations/Title";


const Company = () =>
{   
    
    const {company_name} = useParams();
    const [problist,setProblemList] = useState([]);
    const [pages,setPages] = useState(0);
    const [currpage, setCurrPage] = useState(1);
    const [pagination,setPagination] = useState([1,2,3,4,5]);
    const [solved, setSolved] = useState([]);

    const config = {
        headers: {
          "Content-Type": "application/json",
          },
        withCredentials: true,
        };

    useEffect(() =>
    {
        async function fetchdata()
        {
            const res = await axios.get(`http://127.0.0.1:8000/api/problembycompany/?companies__icontains=${company_name}&page=${currpage}`,config);
            if(parseInt(res.data.count)/12 < 5)
            {
                setPagination(pagination.slice(0,Math.round(parseInt(res.data.count)/12)));
            }
            setProblemList(res.data['results']);
            setPages(res.data['count']);
        }   
        fetchdata();

    },[currpage])

    useEffect(() =>
    {
        async function fetchdata()
        {
            const res = await axios.post("http://127.0.0.1:8000/api/companytopicsolved/",{company:company_name},config);
            setSolved(res.data);
        }   
        fetchdata();

    },[])

    if((pages != 0) && (problist.length != 0) && (solved.length!=0))
    {
        
        const company_keys = Object.keys(solved.company.data);

        const completed = {
            series: [Math.round((solved.user.count/solved.company.count)*100)],
            options: {
              chart: {
                width: '100%',
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
                  hollow: {
                    size: '60%',
                  },
                  dataLabels: {
                    showOn: "always",
                    name: {
                      offsetY: -5, 
                      show: true,
                      color: "#888",
                      fontSize: "0.7vw"
                    },
                    value: {
                      offsetY: 5,
                      color: "#111",
                      fontSize: "0.7vw",
                      show: true
                    }
                  }
                },
              },
            labels:['Completed'],
            style: {
                fontSize: '12px'
            }
        },};

        function changePage(event)
        {
            let newpage = parseInt(event.target.innerText);
            if(newpage>=5)
            {
                let newpagination = [];
                for(let i=newpage-4;i<=newpage;i++)
                {
                    newpagination.push(i);
                }
                console.log('newpagination : ',newpagination);
                setCurrPage(newpage);
                setPagination(newpagination);
            }
            else
            {
                setCurrPage(newpage);
            }
        }

        function nextPage()
        {
            if(currpage<=pages)
            {
                let newpage = currpage+1
                if(newpage>=5)
                {
                    let newpagination = [];
                    for(let i=newpage-4;i<=newpage;i++)
                    {
                        newpagination.push(i);
                    }
                    console.log('newpagination : ',newpagination);
                    setCurrPage(newpage);
                    setPagination(newpagination);
                }
                else
                {
                    setCurrPage(newpage);
                }
            }
        }

        function prevPage()
        {
            if(currpage>1)
            {
                let newpage = currpage-1
                if(newpage>=5)
                {
                    let newpagination = [];
                    for(let i=newpage-4;i<=newpage;i++)
                    {
                        newpagination.push(i);
                    }
                    console.log('newpagination : ',newpagination);
                    setCurrPage(newpage);
                    setPagination(newpagination);
                }
                else
                {
                    setCurrPage(newpage);
                }
            }
        }

        return(<>

            
            <div className="row" style={{paddingLeft:'2vw',paddingTop:'2vw',paddingRight:'1vw'}}>

                <div className="col-8">

                    <h5 id={styles.h5}>{company_name.toUpperCase()} INTERVIEW PROBLEMS</h5>

                    <div className="row" style={{marginTop:'2vw',paddingLeft:'0.5vw'}}>
                        
                        <div className="col-6">
                            <p id={styles.p}>Problem Title</p>
                        </div>
                        <div className="col-2" id={styles.col2}>
                            <p id={styles.p}>Difficulty</p>
                        </div>
                        <div className="col-2" id={styles.col2}>
                            <p id={styles.p}>Accuracy</p>
                        </div>
                        <div className="col-2" id={styles.col2}>
                            <p id={styles.p}>Submissions</p>
                        </div>
                        
                    </div>

                    <div className="row">
                        {problist.map((item,i) => <Recomprob key={i} obj={item} title={item['title']} difficulty={item['difficulty']} accuracy={item['acceptance_rate']} submissions={item['submissions']} />)}
                    </div>
                    <div className="row" id={styles.paginate}>

                        <ul id={styles.ul}>

                            <li id={styles.li} onClick={prevPage}>{'<'}</li>
                            {pagination.map((item,i) =>

                                <li id={item == currpage ? styles.activeli : styles.li} key={"li-"+i+item} onClick={changePage}>{item}</li>

                            )}
                            <li id={styles.li} onClick={nextPage}>{'>'}</li>

                        </ul>

                    </div>  
                </div>
                <div className="col-4">

                    <div className="row" style={{backgroundColor: 'rgb(255,255,255)', border:'transparent', borderRadius:'10px', boxShadow:"0px 4px 8px 0px rgb(230,230,230)", height:'fit-content'}}>
                            
                        <div className="col-5" style={{fontSize:"0.7vw"}}>
                            <ReactApexChart options={completed.options} series={completed.series} type="radialBar"/>
                        </div>
                        <div className="col-7" style={{display:"flex", alignItems:'center', justifyContent:'start'}}>
                            <ul style={{marginTop:'0.5vw'}}>
                                <li style={{color:'rgb(36, 157, 249)'}}>
                                    <span style={{fontSize:'0.8vw',fontWeight:'700',color:'rgb(0,0,0,0.6)'}}>Solved : </span>
                                    <span style={{fontSize:'0.7vw',color:'gray'}}>{solved.user.count}</span>
                                </li>
                                <li style={{color:'rgb(36, 157, 249)'}}>
                                    <span style={{fontSize:'0.8vw',fontWeight:'700',color:'rgb(0,0,0,0.6)'}}>Time : </span>
                                    <span style={{fontSize:'0.7vw',color:'gray'}}>{solved.user.time}</span>
                                </li>
                                <li style={{color:'rgb(36, 157, 249)'}}>
                                    <span style={{fontSize:'0.8vw',fontWeight:'700',color:'rgb(0,0,0,0.6)'}}>Accuracy : </span>
                                    <span style={{fontSize:'0.7vw',color:'gray'}}>{solved.user.accuracy}</span>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className="row" style={{marginTop:"2vw", backgroundColor: 'rgb(255,255,255)', border:'transparent', borderRadius:'10px', boxShadow:"0px 4px 8px 0px rgb(230,230,230)", height:'fit-content',padding:'1.5vw 1vw'}}>
                        <div className={styles.skills}>
                            {company_keys.map((item,i)=>
                                <>
                                    <div key={`skill${i}`} className={styles.skill}>
                                        <div className={styles.skillname}>{item}</div>
                                        <div className={styles.skillbar}>
                                            <div className={styles.skillper} per={Math.round((solved.user.data[item]/solved.company.data[item])*100)} style={{maxWidth:`${Math.round((solved.user.data[item]/solved.company.data[item])*100)}%`}}>
                                                <span className={styles.tooltip}>{Math.round((solved.user.data[item]/solved.company.data[item])*100)}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                </div>
                

            </div>

        </>)
        
    }

    else
    {
        return(null)
    }
}

export default Company;
