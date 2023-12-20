import styles from "./Userinfo.module.css"

const Userinfo = () =>
{
    return (
        <>
            <div className="row" id={styles.row}>
                <div className="col-4" style={{padding:0}}>
                
                    <div className="card text-center mb-3" id={styles.card}>
                        <div className="card-body">
                            
                            <div id={styles.profile} ><img id={styles.img} alt="" /></div>
                            <h5 id={styles.h5} className="card-title">Username</h5> 
                            <hr/>
                            <div className="row">
                                <div className="col-4">
                                    <div>
                                        <h5 id={styles.h5}>256</h5>
                                        <p id={styles.p}>solved</p>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div>
                                        <h5 id={styles.h5}>67.8%</h5>
                                        <p id={styles.p}>accuracy</p>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div>
                                        <h5 id={styles.h5}>175</h5>
                                        <p id={styles.p}>score</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>
                <div className="col-8" id={styles.chart}>

                
                </div>
            </div>

        </>

    )
}

export default Userinfo;