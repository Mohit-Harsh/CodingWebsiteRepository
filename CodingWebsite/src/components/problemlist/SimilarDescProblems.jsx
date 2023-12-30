import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./SimilarDescProblems.module.css";
import Recomprob from '../recommendations/Recomprob';

export default function SimilarProblems({problems})
{
    if(problems)
    {
        return(<>
            {problems.map((item,i) => <Recomprob key={i+'problem'} obj={item} title={item['title']} difficulty={item['difficulty']} accuracy={item['acceptance_rate']} submissions={item['submissions']}></Recomprob>)}
            </>)
    }
    else
    {

        return(null)
    }
}