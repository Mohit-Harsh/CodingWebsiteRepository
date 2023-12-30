import styles from "./Recomprob.module.css";
import { Link } from "react-router-dom";


const Recomprob = ({obj,title,difficulty,accuracy,submissions}) =>
{

    if(difficulty == "Easy")
    {
        return(
            <>
                <Link to={`/problem/${title}`} state={obj} style={{textDecoration:'none'}}>
                    <div className="card" id={styles.btn}>
                        <div className="card-body" style={{padding:0, height: '100%'}}>
                            <div className="row" style={{padding:0, height: '100%'}}>
                                <div id={styles.col6} className="col-6" >
                                    <p className="problems2" name="problem_title" id={styles.p}>{title}</p>
                                </div>
                                <div id={styles.col2} className="col-2" >
                                    <p className="problems2" name="difficulty" id={styles.easy}>{difficulty}</p>
                                </div>
                                <div id={styles.col2} className="col-2">
                                    <p className="problems2" name="accuracy" id={styles.p}>{accuracy}</p>
                                </div>
                                <div id={styles.col2} className="col-2">
                                    <p className="problems2" name="rating" id={styles.p}>{submissions}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>        
            </>
        )
    }
    else if(difficulty == "Medium")
    {
        return(
            <>
                <Link to={`/problem/${title}`} state={obj} style={{textDecoration:'none'}}>
                    <div className="card" id={styles.btn}>
                        <div className="card-body" style={{padding:0, height: '100%'}}>
                            <div className="row" style={{padding:0, height: '100%'}}>
                                <div id={styles.col6} className="col-6" >
                                    <p className="problems2" name="problem_title" id={styles.p}>{title}</p>
                                </div>
                                <div id={styles.col2} className="col-2" >
                                    <p className="problems2" name="difficulty" id={styles.medium}>{difficulty}</p>
                                </div>
                                <div id={styles.col2} className="col-2">
                                    <p className="problems2" name="accuracy" id={styles.p}>{accuracy}</p>
                                </div>
                                <div id={styles.col2} className="col-2">
                                    <p className="problems2" name="rating" id={styles.p}>{submissions}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>        
            </>
        )
    }
    else
    {
        return(
            <>
                <Link to={`/problem/${title}`} state={obj} style={{textDecoration:'none'}}>
                    <div className="card" id={styles.btn} onClick={() => <Navigate to={`problem/:${title}`} state={obj}/>}>
                        <div className="card-body" style={{padding:0, height: '100%'}}>
                            <div className="row" style={{padding:0, height: '100%'}}>
                                <div id={styles.col6} className="col-6" >
                                    <p className="problems2" name="problem_title" id={styles.p}>{title}</p>
                                </div>
                                <div id={styles.col2} className="col-2" >
                                    <p className="problems2" name="difficulty" id={styles.hard}>{difficulty}</p>
                                </div>
                                <div id={styles.col2} className="col-2">
                                    <p className="problems2" name="accuracy" id={styles.p}>{accuracy}</p>
                                </div>
                                <div id={styles.col2} className="col-2">
                                    <p className="problems2" name="rating" id={styles.p}>{submissions}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>       
            </>
        )
    }
}

export default Recomprob;