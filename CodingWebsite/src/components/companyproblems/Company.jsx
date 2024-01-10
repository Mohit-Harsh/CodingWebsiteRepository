import { useState, useEffect } from "react";
import styles from './Company.module.css';
import { Link, useParams } from "react-router-dom";
import Recomprob from "../recommendations/Recomprob";
import axios from "axios";


const Company = () =>
{   
    
    const {company_name} = useParams();
    const [problist,setProblemList] = useState([]);
    const [pages,setPages] = useState(0);
    const [currpage, setCurrPage] = useState(1);
    const [pagination,setPagination] = useState([1,2,3,4,5]);

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
            setProblemList(res.data['results']);
            setPages(res.data['count']);
            console.log(res.data);
        }   
        fetchdata();

    },[currpage])

    if((pages != 0) && (problist.length != 0))
    {
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
