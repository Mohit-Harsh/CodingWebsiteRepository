import React from "react";
import Companylist from "./company_wise_list/Companylist";

export default function TopProblemList({tabstate})
{
    if(tabstate == 0)
    {
        return <Companylist/>
    }
    if(tabstate == 1)
    {
        return <Companylist/>
    }
}