import React from 'react';
import { useState } from 'react';
import styles from './Problemlist.module.css';
import searchimg from './icons8-search-128.png';
import SimilarProblems from './SimilarProblems.jsx';
import { Link, useNavigate } from 'react-router-dom';

const Problemlist = ({data, setPageNumber, changeData, sortByAccuracy, sortByDifficulty, sortByFrequency}) =>
{

    const [currPage, setCurrState] = useState(1);

    
    const dataperpage = 20; // data displayed per page
    const pages = Math.ceil(1570 / dataperpage); // total number of pages
    let startpage = 0; // starting number in pagination buttons
    let endpage = 5; // ending number in pagination buttons

    if(currPage >=5)
    {
        startpage = currPage - 5;
        endpage = currPage;
    }

    const numbers = [...Array(pages+1).keys()].slice(1)

    function changePage(event)
    {
        setCurrState(Number(event.target.innerText));
        setPageNumber(Number(event.target.innerText));

    }

    function prevPage()
    {
        if(currPage > 1)
        {
            setCurrState(currPage - 1);
            setPageNumber(currPage - 1);
        }

    }

    function nextPage()
    {
        if(currPage < pages)
        {
            setCurrState(currPage + 1);
            setPageNumber(currPage + 1);
        }
    }

    return(
        <>
            <div className="container" id={styles.container}>
                <div className="row" id={styles.search}>

                    <div className="col-8">

                        <input type="search" name="" id={styles.searchbar} onChange={changeData}/>

                        <img src={searchimg} alt=""  id={styles.searchbtn}/>

                    </div>
                    <div className="col-4" id={styles.col4}>
                        
                        <div className="dropdown" id={styles.dropdown}>
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id={styles.sortbtn}>
                                Sort By
                            </button>
                            <ul className="dropdown-menu" id={styles.dropdownul1}>
                                <li onClick={sortByAccuracy}><a className="dropdown-item" id={styles.ditem}>Accuracy</a></li>
                                <li onClick={sortByFrequency}><a className="dropdown-item" id={styles.ditem}>Frequency</a></li>
                            </ul>
                        </div>
                    
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id={styles.sortbtn}>
                                Difficulty
                            </button>
                            <ul className="dropdown-menu" id={styles.dropdownul2}>
                                <li onClick={sortByDifficulty}><a className="dropdown-item" id={styles.ditem}>All</a></li>
                                <li onClick={sortByDifficulty}><a className="dropdown-item" id={styles.ditem}>Easy</a></li>
                                <li onClick={sortByDifficulty}><a className="dropdown-item" id={styles.ditem}>Medium</a></li>
                                <li onClick={sortByDifficulty}><a className="dropdown-item" id={styles.ditem}>Hard</a></li>
                            </ul>
                        </div>

                    </div>

                </div>

                <div className="row"> 
                    <div  className="col-6" style={{paddingLeft: '4vw',textAlign: 'start'}}> 
                        <h5 style={{fontSize: '0.7vw',fontWeight: '500',color: 'rgba(27, 2, 103, 0.75)'}}>Title</h5>
                    </div>
                    <div  className="col-2" style={{textAlign: 'start', paddingLeft:"2.5vw"}}>
                        <h5 style={{fontSize: '0.7vw',fontWeight: '500',color: 'rgba(27, 2, 103, 0.75)'}}>Accepted</h5>
                    </div>
                    <div  className="col-2" style={{textAlign: 'start', paddingLeft:"1.7vw"}}>
                        <h5 style={{fontSize: '0.7vw',fontWeight: '500',color: 'rgba(27, 2, 103, 0.75)'}}>Difficulty</h5>
                    </div>
                    <div className="col-2" style={{textAlign: 'start', paddingLeft:"1vw"}}>
                        <h5 style={{fontSize: '0.7vw',fontWeight: '500',color: 'rgba(27, 2, 103, 0.75)'}}>Frequency</h5>
                    </div>
                </div>

                {data.map((item,i) =>

                <>
                    <Link to={`problem/${item['title']}`} state={item} style={{textDecoration:'none'}}>
                        <div className="row" id={ Number(i)%2==1 ? styles.row : styles.row2} key={"row"+i+item['id']}> 
                            <div  className="col-6" id={styles.col6} > 
                                <span id={styles.p} >{item['title']}</span>
                            </div>
                            <div  className="col-2" id={styles.col2}>
                                <span id={styles.p}>{item['acceptance_rate']}</span>
                            </div>
                            <div  className="col-2" id={styles.col2}>
                                <span id={styles.p}>{item['difficulty']}</span>
                            </div>
                            <div className="col-2" id={styles.col2}>
                                <span id={styles.p}>{item['frequency']}</span>
                            </div>
                        </div>
                    </Link>
                
                </>    

                )}

                <div className="row" id={styles.paginate}>

                    <ul id={styles.ul}>

                        <li id={styles.li} onClick={prevPage}>{'<'}</li>
                        {numbers.slice(startpage,endpage).map((item,i) =>

                            <li id={item == currPage ? styles.activeli : styles.li} key={"li-"+i+item} onClick={changePage}>{item}</li>

                        )}
                        <li id={styles.li} onClick={nextPage}>{'>'}</li>

                    </ul>

                </div>
            </div>

        </>
    )
}

export default Problemlist;