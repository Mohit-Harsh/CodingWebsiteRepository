import React from "react";
import { useParams } from "react-router-dom";
import styles from './Interviews.module.css';

export default function Interviews()
{
    const {company_name} = useParams();

    return(
        <>
            <div className="row" style={{margin:'2vw 2vw 2vw 2vw',borderRadius:'5px',backgroundColor:'white',boxShadow:'0px 4px 8px 4px rgb(230,230,230)', padding:'1vw'}}>
                <h5 id={styles.h5}>{company_name} Interview Process</h5>
                <p id={styles.p}>
                The Google interview process is the ultimate test of your programming and problem-solving abilities. Before you decide to begin your Google interview preparation study plan, knowing what the process entails is key to getting clarity on what interviewers expect of you. 
                </p>
                <p id={styles.p}>
                Spread over multiple rounds, the Google interview process begins with the Initial Phone Screen with a recruiter human resources, followed by the Technical Phone Screen with a senior engineer or hiring manager, and ultimately, the on-site interview that comprises multiple coding and design rounds, and behavioral/leadership interviews where an interview panel keenly observe your response to tricky Google behavioral interview questions.
                </p>
                <p id={styles.p}>
                While the Technical Phone Screen round of the Google interview process is usually conducted remotely, recruiters invite you to the Google campus for the on-site interview. During the pandemic, all rounds of the Google interview process, including the On-site interview, took place remotely.
                </p>
            </div>
            
            <div className="row" style={{margin:'2vw 2vw 1vw 2vw',borderRadius:'5px',backgroundColor:'white',boxShadow:'0px 4px 8px 4px rgb(230,230,230)', padding:'1vw'}}>
                <h5 id={styles.h5} style={{marginTop:'1vw'}}>Topics to Prepare for the {company_name} Technical Interview</h5>
                <p id={styles.p}>The Google interview process tests the depth and extent of your knowledge in core data structures and algorithms, your ability to design and work with scalable distributed systems, and whether you are a good cultural fit to a series of behavioral and situational based interview questions.</p>
                <p id={styles.p}>There are essentially three main components that you should address while going about your Google interview preparation.</p>
                <h5 id={styles.h5}>The Coding Aspect</h5>
                <p id={styles.p}>Coding should be the most important part of your Google interview preparation plan. Your knowledge of core DSA is evaluated in the coding rounds that happen during the Technical Screen and On-site interviews. You’ll be given a problem or two to solve during the technical phone screen and On-site interviews. The hiring manager will essentially test how you approach the problem and arrive at the most optimal solution. </p>
                <ul style={{marginLeft:'2vw'}}>
                    <li>Two Sum</li>
                    <li>Regular Expression Matching</li>
                    <li>3Sum</li>
                    <li>Valid Parenthesis</li>
                    <li>Generate Parenthesis</li>
                    <li>Merge k Sorted Lists</li>
                </ul>
                <h5 id={styles.h5} style={{marginTop:'1vw'}}>The Design Aspect</h5>
                <p id={styles.p}>The systems design round, which usually takes place during the on-site interview, tests your ability to work with scalable and distributed systems. The design interview usually carries more weight if you’re interviewing for senior positions. To ace the design rounds, make sure your Google interview preparation plan covers the following systems design topics:</p>
                <ul style={{marginLeft:'2vw'}}>
                    <li>Network Protocols and Proxies</li>
                    <li>Sharding Techniques</li>
                    <li>Caching</li>
                    <li>Database Management Systems</li>
                    <li>Latency, Availability, and Throughput</li>
                    <li>Load Balancing</li>
                    <li>Polling, SSE, and Websocket</li>
                    <li>Queues and Pub-sub</li>
                </ul>
                <h5 id={styles.h5} style={{marginTop:'1vw'}}>The Behavioral Aspect</h5>
                <p id={styles.p}>Google's behavioral interview is mostly a test of your attitude, conduct, and how much you’ve learned from your past experiences and projects. Questions in the behavioral interview are primarily around the following areas:</p>
                <ul style={{marginLeft:'2vw'}}>
                    <li>Google's company culture</li>
                    <li>Workplace-related situations</li>
                    <li>Relationships with coworkers and superiors</li>
                    <li>Past projects and experiences</li>
                </ul>
            </div>
        </>
    );
}