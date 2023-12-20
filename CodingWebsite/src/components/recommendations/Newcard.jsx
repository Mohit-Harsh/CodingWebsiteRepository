import styles from './Newcard.module.css';

const Newcard = ({title,tags}) =>
{

    return(
        <>
            <a href="" id={styles.card}>
                            
                <div id={styles.div}>
                
                    {tags.map((tag) => <span key={tag} id={styles.span}>{tag}</span>)}
                
                </div>
        
                <h3 id={styles.h3}>{title}</h3>
            </a>
        </>
    )
}

export default Newcard;