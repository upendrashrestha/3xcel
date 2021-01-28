import { faCrown, faShieldAlt, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import ScoresService from '../../services/scores.service';
export const ScoreBoard = (props) => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAPI();
    }, []);

    const getAPI = async () => {
        await ScoresService.getContent()
            .then((result) => {
                result.data.sort(function (a, b) {
                    return a.time - b.time;
                })
                setScores(result.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <strong><FontAwesomeIcon icon={faTrophy} /> SCORE BOARD </strong>


            {loading && 'Loading...' ||
                <div className="p-2">
                    {scores.map((x, i) => {
                        return <Row className="text-uppercase text-monospace">
                            <div className="col-1">
                                {i === 0 && <FontAwesomeIcon icon={faCrown} />}
                            </div>
                            <div className="col-7">
                               <u> {x.name} </u>
                            </div>
                            <div className="col-2">
                                <span className="badge badge-primary">{x.time}</span>
                            </div>
                        </Row>
                    })
                    }
                </div>}

        </>
    );
}



