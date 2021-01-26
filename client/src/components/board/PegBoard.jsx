import React, { useRef, useState } from 'react';
import { Peg } from './Peg';
import PopUp from '../popup';
import './style.css';
import ScoresService from '../../services/scores.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

export const PegBoard = (props) => {
    const [datas, setData] = useState(props.data);
    const [pegCount, setPegCount] = useState(15);
    const [count, setCount] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [timer, setTimer] = useState(0);
    const countRef = useRef(null);
    const [score, setScore] = useState(0);
    const [winner, setWinner] = useState("");
    const [message, setMessage] = useState("");
    const [showScoreBoard, setShowScoreBoard] = useState(false);

    const getAPI = async () => {  
        let sc=0;      
        if (timer !== 0){
            sc=timer;
            setScore(timer);
        }
        else{
            sc=score;
        }
        activateTimer(false);
        await ScoresService.getContent()
            .then((result) => {
                let res = result.data.filter(x => x.time > sc);
                if (res.length > 0 || result.data.length < 5)
                    setShowScoreBoard(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const activateTimer = (v) => {
        if (v) {
            countRef.current = setInterval(() => {
                setTimer((timer) => timer + 1)
            }, 1000)
        } else {
            clearInterval(countRef.current);
            setTimer(0);
        }
    }

    const showWinnerPopup = () => {  
        setShowScoreBoard(false);             
        setShowPopup(true);
        getAPI();
    }

    const saveScore = async () => {
        let model = { name: winner, time: score };
        await ScoresService.addContent(model)
            .then((result) => {
                setShowPopup(false);
            })
            .catch((err) => {
                setMessage("Something went wrong!");

            });
    }

    return (
        <>
            {datas &&
                <div className="App">
                    <div className="triangleBoard">
                        <ul className="board">
                            <li>
                                <Peg node={datas.nodes[0]} handleSelect={(e) => handleSelect(e)} />
                            </li>
                            <li>
                                <Peg node={datas.nodes[1]} handleSelect={(e) => handleSelect(e)} />
                                <Peg node={datas.nodes[2]} handleSelect={(e) => handleSelect(e)} />
                            </li>
                            <li>
                                <Peg node={datas.nodes[3]} handleSelect={(e) => handleSelect(e)} />
                                <Peg node={datas.nodes[4]} handleSelect={(e) => handleSelect(e)} />
                                <Peg node={datas.nodes[5]} handleSelect={(e) => handleSelect(e)} />
                            </li>
                            <li>
                                <Peg node={datas.nodes[6]} handleSelect={(e) => handleSelect(e)} />
                                <Peg node={datas.nodes[7]} handleSelect={(e) => handleSelect(e)} />
                                <Peg node={datas.nodes[8]} handleSelect={(e) => handleSelect(e)} />
                                <Peg node={datas.nodes[9]} handleSelect={(e) => handleSelect(e)} />
                            </li>
                            <li>
                                <Peg node={datas.nodes[10]} handleSelect={(e) => handleSelect(e)} />
                                <Peg node={datas.nodes[11]} handleSelect={(e) => handleSelect(e)} />
                                <Peg node={datas.nodes[12]} handleSelect={(e) => handleSelect(e)} />
                                <Peg node={datas.nodes[13]} handleSelect={(e) => handleSelect(e)} />
                                <Peg node={datas.nodes[14]} handleSelect={(e) => handleSelect(e)} />
                            </li>
                        </ul>
                    </div>
                    <div className="footer">
                        {timer !== 0 && <mark> {` Timer : ${timer} `} </mark>} <br />
                        <button onClick={() => resetGame()}> Reset Game </button>
                        <span id="pegCount"> Number of pegs left :<strong>{pegCount}</strong></span>
                    </div>
                    <PopUp
                        title="Congratulations!"
                        description=""
                        show={showPopup}
                        hide={() => closePopup()}
                        size="md">
                        <p className="text-center"><strong>YOU DID IT!</strong></p>

                        {message && <p style={{ color: 'red' }}>{message}</p>}
                        <b>Total Time (Seconds) : {score}</b>
                        {showScoreBoard && <>
                            <p>Save your score to <b>Score Board</b>.</p>
                            <input type="text" name="winner" maxLength="7" placeholder="Your Name" onChange={e => setWinner(e.target.value)} />
                            {" "}
                            <button value="Save" onClick={saveScore}>
                                <FontAwesomeIcon icon={faSave} />
                                {" "}SAVE</button>
                        </>}
                    </PopUp>
                </div>

            }
        </>
    );



    function closePopup() {
        setShowPopup(false);
    }

    function getNode(id) {
        return datas.nodes.find(x => x.id === id);
    }

    function getSourceNode(currentNode) {
        let srcNode = datas.nodes.find(x => x.flag === 'S');
        srcNode.neighbors.sort(function (a, b) { return a - b });
        return srcNode;
    }

    function resetGame() {
        let newData = datas.nodes.map((x) => {
            x.stylename = "bttn";
            x.value = 1;
            x.displayValue = "T";
            x.flag = "";
            return x;
        })
        datas.nodes = newData;
        setData(datas);
        setCount(0);
        activateTimer(false);
        setPegCount(15);
    }

    function getPegCount() {
        let numberOfPegs = datas.nodes.filter(x => x.value === 1).length;
        setPegCount(numberOfPegs);
        if (numberOfPegs === 1) {
            showWinnerPopup();
        }
    }

    function deactivateAllNodes() {
        const newData = datas.nodes.map(
            (x) => {
                x.flag = '';
                x.stylename = "bttn";
                return x;
            });
        datas.nodes = newData;
        setData(datas);
    }

    function setNodeValueZero(id) {
        const newData = datas.nodes.map((x) => {
            if (x.id === id) {
                x.value = 0;
                x.displayValue = "O";
            }
            return x;
        }
        );
        datas.nodes = newData;
        setData(datas);
    }

    function setNodeValueOne(id) {
        const newData = datas.nodes.map((x) => {
            if (x.id === id) {
                x.value = 1;
                x.displayValue = "T";
                x.stylename = "bttn";
            }
            return x;
        }
        );
        datas.nodes = newData;
        setData(datas);
    }

    function refreshDatas(node) {
        if (node)
            datas.nodes[node.id - 1] = node;
        setData(datas);
    }

    function handleSelect(id) {

        let selectedNode = getNode(id);

        if (datas.nodes.findIndex(x => x.value === 0) === -1) {
            selectedNode.value = 0;
            selectedNode.displayValue = "O";
            selectedNode.flag = "I";
            selectedNode.stylename = "bttn";
            activateTimer(true);
            refreshDatas(selectedNode);
        } else if (selectedNode.flag === 'S') {
            selectedNode.value = 1;
            selectedNode.displayValue = "T";
            selectedNode.flag = '';
            deactivateAllNodes();
            refreshDatas(selectedNode);
        }
        else if (selectedNode.value === 0 && selectedNode.flag === 'D') {
            selectedNode.value = 1;
            selectedNode.displayValue = "T";
            let sourceNode = getSourceNode();
            selectedNode.moves.sort(function (a, b) { return a - b });
            selectedNode.neighbors.sort(function (a, b) { return a - b });
            let sourceIndex = selectedNode.moves.findIndex(x => x === sourceNode.id);
            setNodeValueZero(sourceNode.id);
            let jumpedPegId = selectedNode.neighbors[sourceIndex];
            setNodeValueZero(jumpedPegId);
            deactivateAllNodes();
            refreshDatas();
        }
        else if (selectedNode.value === 0 && selectedNode.flag !== 'D') {
            //return;

        }
        else if (selectedNode.value !== 0) {
            let d = datas.nodes.find(x => x.flag === 'D');

            if (d && d.id !== selectedNode.id) {
                let srcNode = getSourceNode();
                setNodeValueOne(srcNode.id);
                deactivateAllNodes();
                refreshDatas(selectedNode);
            }
            selectedNode.moves.sort(function (a, b) { return a - b });
            selectedNode.neighbors.sort(function (a, b) { return a - b });

            for (let i = 0; i < selectedNode.moves.length; i++) {
                let destinationNodeId = selectedNode.moves[i];
                let destinationNode = getNode(destinationNodeId);
                if (destinationNode.value === 0) {
                    let neighborNodeId = selectedNode.neighbors[i];
                    let neighborNode = getNode(neighborNodeId);
                    if (neighborNode.value === 1) {
                        // destinationNode.active = 'Y';
                        destinationNode.flag = 'D';
                        destinationNode.stylename = "bttnFocus";
                        selectedNode.displayValue = "T";
                        selectedNode.value = 0;
                        selectedNode.flag = 'S';
                        selectedNode.stylename = "bttnSelect";
                        refreshDatas(selectedNode);
                        refreshDatas(destinationNode);
                    }
                    else {
                        // deactivateAllNodes();
                    }

                }
                else {
                    // deactivateAllNodes();
                }
            }
            let destinationNodes = datas.nodes.find(x => x.flag === 'D');
            if (!destinationNodes) {
                selectedNode.stylename = "bttnInvalid";
                refreshDatas();
            }

        }
        else if (selectedNode.flag !== 'I') {
            selectedNode.className = "bttn";
            setNodeValueOne(selectedNode.id);
            deactivateAllNodes();
            refreshDatas(selectedNode);
        }
        else {
            selectedNode.className = "bttn";
        }
        setCount(count + 1);
        getPegCount();
    }
}


