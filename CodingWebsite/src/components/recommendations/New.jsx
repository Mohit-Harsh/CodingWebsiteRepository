import Newcard from './Newcard.jsx';
import styles from './New.module.css';
import React from 'react';

const New = ({new_prob_list}) =>
{
    
    return(
        <>
            <div className="card" id={styles.card}>
                <div className="card-header" id={styles.header}>
                    What's new
                </div>
                <div className="card-body" id={styles.body}>

                    {new_prob_list.map((prob)=><Newcard key={prob['id']} title={prob['title']} tags={prob['related_topics'].split(',')}></Newcard>)}
                    
                </div>
            </div>
        </>
    )
}

export default New;