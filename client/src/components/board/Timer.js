import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';

export const Timer = (props) => {
    const [timer, setTimer] = useState(0);
    const [startTimer, setStartTimer] = useState(null);
    const [stopTimer, setStopTimer] = useState(false);
    const countRef = useRef(null);

    useEffect(() => {
        if (stopTimer === false && startTimer === null && props.startTimer  === true) { 
            start();
        }else if(stopTimer === false && startTimer===true && props.startTimer === false)
           getTotalTime(); 
    });

    const start = () => {
        setStartTimer(true); 
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000);
    }

    const getTotalTime = () => {
        props.getTotalTime(timer);
        clearInterval(countRef.current);
        setTimer(0);
        setStopTimer(true);
    }

    return (
        <div className="p-1">
            <FontAwesomeIcon icon={faClock} />
            {props.startTimer && <mark>  {` : ${timer} `} </mark>}
        </div>
    );

}

