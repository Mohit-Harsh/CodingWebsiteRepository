import React from "react";
import ListFormat from "../ListFormat";
import wipro from '../images/wipro.png'
import google from '../images/google.png'
import amazon from '../images/amazon.png'
import microsoft from '../images/microsoft.jpg'
import styles from './Companylist.module.css'

export default function Companylist()
{
    let companies = [[wipro,'Wipro'],[google,'Google'],[amazon,'Amazon'],[microsoft,'Microsoft']]

    return(
        <>
            <div className="row" style={{marginTop:'2vw'}}>

                {companies.map((item) => <div className="col-4" id={styles.col4}>

                    <ListFormat title={`${item[1]} Interview Questions`} 
                             content={"Ace the Wipro coding interview by solving the Wipro interview questions exclusively on CodeStudio with a range..."}
                             logo={item[0]} total_problems={187} time={"15 hrs"}></ListFormat>

                </div>)}

            </div>
               
        </>
    )
}