import React from "react";
import { useState } from 'react';
import styles from './Topicfilter.module.css'

const Topicfilter = ({setTopicFilter}) =>
{
    const [val,setVal] = useState([]);


    const [topicmap,setMap] = useState({'Backtracking':0,'Memoization':0,'Random':0, 'Greedy':0,'Meet in the Middle':0, 'Sliding Window':0, 'Graph':0, 'Linked List':0,  'Array':0,'Reservoir Sampling':0, 'Design':0,
    'Geometry':0, 'Sort':0, 'Dequeue':0,  'Stack':0, 'Suffix Array':0, 'Math':0, 'Line Sweep':0, 'Bit Manipulation':0, 'String':0, 'Minimax':0, 'Hash Table':0, 'Topological Sort':0, 'OOP':0,'Breadth-first Search':0,
    'Trie':0, 'Segment Tree':0,'Binary Search':0,'Brainteaser':0,'Rejection Sampling':0,'Recursion':0, 'Tree':0, 'Ordered Map':0, 'Two Pointers':0, 'Divide and Conquer':0, 'Dynamic Programming':0,
    'Union Find':0,'Binary Search Tree':0,'Heap':0,'Queue':0,'Rolling Hash':0,'Depth-first Search':0,'Binary Indexed Tree':0});

    function changeTopic(event)
    {
        if(topicmap[event.target.innerText] === 0)
        {
            const topics = [...val,[event.target.innerText]];
            topics.sort()
            setVal(topics);
            let newmap = topicmap;
            newmap[event.target.innerText] = 1;
            setMap(newmap);
            setTopicFilter(topics.join(','));
        } 
    }

    function removeFilter(event)
    {
        let newmap = topicmap;
        newmap[event.target.innerText] = 0;
        setMap(newmap);
        let newval = [];
        for(let k=0;k<val.length;k++)
        {
            if(val[k][0] !== event.target.innerText)
            {
                newval.push(val[k]);
            }
        }
        setVal(newval);
        setTopicFilter(newval);
    }

    let topiclist = ['Backtracking','Memoization','Random', 'Greedy','Meet in the Middle', 'Sliding Window', 'Graph', 'Linked List',  'Array','Reservoir Sampling', 'Design',
    'Geometry', 'Sort', 'Dequeue',  'Stack', 'Suffix Array', 'Math', 'Line Sweep', 'Bit Manipulation', 'String', 'Minimax', 'Hash Table', 'Topological Sort', 'OOP','Breadth-first Search',
    'Trie', 'Segment Tree','Binary Search','Brainteaser','Rejection Sampling','Recursion', 'Tree', 'Ordered Map', 'Two Pointers', 'Divide and Conquer', 'Dynamic Programming',
    'Union Find','Binary Search Tree','Heap','Queue','Rolling Hash','Depth-first Search','Binary Indexed Tree'];
    

    return(
        
        <>

            <div className="row" id={styles.filterrow}>
                {val.map((item,i) => {return(<button key={"filterbtn"+i} id={styles.filterbtn} onClick={removeFilter}>{item}</button>)})}
            </div>

            <div className="card" id={styles.card}>
                <div className="card-header" id={styles.header}>
                    Related Topics
                </div>
                
                <div className="card-body" id={styles.body}>

                    {topiclist.map((item,i) => <button key={"topic-"+i} id={styles.topicbtn} onClick={changeTopic}>{item}</button>)}
                    
                </div>
            </div>

        </>

    );
}

export default Topicfilter;