import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./SimilarProblems.module.css";

export default function SimilarProblems({problems})
{
    if(problems)
    {
        return(<>{problems.map((item,i) => <>
        
        <ul id={styles.ul}>
            <Link key={i+"L"} to={`/problem/${item['title']}`} state={item} id={styles.link}>
                <li id={styles.li}><p key={i+'P'} id={styles.p}>{item['title']}</p></li>
            </Link>
        </ul>        
        </>)}</>)
    }
    else
    {

        return(null)
    }
}