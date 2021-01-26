import React, { useRef, useState } from 'react';

export const Timer = (props) => {
    const [timer, setTimer] = useState(0);
    const countRef = useRef(null)
    
    if(props.startTimer){
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }
    
    if(props.stopTimer) {        
        props.totalTime = timer;
        clearInterval(countRef.current);
        setTimer(0);
    }

    return (
        <div>
            <p>{timer}</p> 
        </div>
    );

}

