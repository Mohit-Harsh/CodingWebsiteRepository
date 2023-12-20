import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SimilarProblems({problems})
{
    if(problems)
    {
        return(<>{problems.map((item,i) => <>

        <Link key={i+"L"} to={`/problem/${item['title']}`} state={item} style={{textDecoration:'none'}}>
            <p key={i+'P'}>{item['title']}</p>
        </Link>

        </>)}</>)
    }
    else
    {

        return(null)
    }
}