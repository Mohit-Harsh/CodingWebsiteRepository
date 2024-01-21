import styles from './Newcard.module.css';
import { Link } from 'react-router-dom';

const Newcard = ({obj,title,tags}) =>
{

    return(
        <>
            <Link to={`/problem/${title}`} state={obj} style={{textDecoration:'none'}} id={styles.card}>
                            
                <div id={styles.div}>
                
                    {tags.map((tag) => <span key={tag} id={styles.span}>{tag}</span>)}
                
                </div>
        
                <h3 id={styles.h3}>{title}</h3>
            </Link>
        </>
    )
}

export default Newcard;