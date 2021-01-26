import React from 'react';
import { data } from './Data.js';
import { PegBoard } from './PegBoard';
import { ScoreBoard } from './ScoreBoard';
import { Col, Row, Button, Container, Form, Card } from 'react-bootstrap';

export const PegGameBoard = () => {
        return (<Container>
                <Row>

                        <Col sm={12} md={8} lg={8}>

                                <PegBoard
                                        name="URBI"
                                        data={data} />
                        </Col>
                        <Col sm={12} md={4} lg={4}>
                                <p className="muted-text">Version 1.2</p>  
                             
                                <ScoreBoard/>
                                <hr/>
                                <p className="muted-text">
                                        The goal is to remove all pegs but one by jumping pegs from one side of an occupied peg hole to available space, removing the peg which was jumped over.</p>
                                
                                <small className="mb-2">
                                        <b>How to play ?</b>
                                        <ol>
                                                <li> Start New Game! </li>
                                                <li> Start the game by taking out any peg.</li>
                                                <li> Select the peg that can jump one peg over to the available space.  </li>
                                                <li> Play until you are out of moves.</li>
                                        </ol>
                                </small>
                        </Col>
                </Row>
        </Container>);
}