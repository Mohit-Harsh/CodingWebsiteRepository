import styles from './Title.module.css';

const Title = () =>
{
    return(

        <>
            <div className="row">
                
                <h5 id={styles.h5}>RECOMMENDED PROBLEMS</h5>
                <p id={styles.p}>List of problems recommended for the improvement for your performance</p>
                
            </div>
            
            <div className="row" id={styles.row}>
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
            
            
        </>
    )
}

export default Title;