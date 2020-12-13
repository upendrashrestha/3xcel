import React, { useState } from 'react';
import { Peg } from './Peg';
import PopUp from '../popup';



export const PegBoard = (props) => {
    const [datas, setData] = useState(props.data);
    const [pegCount, setPegCount] = useState(15);
    const [count, setCount] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    return (
        <>
            {datas &&
                <div className="App">
                    <button onClick={() => resetGame()}>
                        New Game !
                        </button>

                    <br />
                    <span id="pegCount"> Number of pegs left :<strong>{pegCount}</strong></span>

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
                        <span className="link" onClick={() => howToPlay()}>How to play?
                        </span>

                    </div>
                    <span className="muted-text">Version 1.0 | www.upsth.com | www.urbi.xyz</span>


                    <PopUp
                        title="PEG JUMP SOLITAIRE"
                        description="The goal is to remove all pegs but one by jumping pegs from one side of an occupied peg hole to available space, removing the peg which was jumped over."
                        show={showPopup}
                        hide={() => closePopup()}
                        size="lg">



                        <p className="text-left">
                            <b>**</b> "T" is a valid peg to move. "O" is available space to move the peg in.
</p>
                        <br />
                        <h4>How to play ?</h4>
                        <ol>
                            <li> Start New Game! </li>
                            <li> Start the game by taking out any peg.</li>
                            <li> Select the peg that can jump one peg over to the available space.  </li>
                            <li> Play until you are out of moves.</li>
                        </ol>
                        <strong>Enjoy ! </strong><br />
                        <a href="/faq"> FAQ </a>
                        <span className="muted-text">Version 1.1</span>

                    </PopUp>

                </div>

            }
        </>
    );

    function howToPlay() {
        setShowPopup(true);
    }

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
        setPegCount(15);
    }

    function getPegCount() {
        let numberOfPegs = datas.nodes.filter(x => x.value === 1).length;
        setPegCount(numberOfPegs);
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


