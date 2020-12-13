import React from 'react';
import { data } from './Data.js';
import { PegBoard } from './PegBoard';
import './style.css';

export const PegGameBoard = () => { 
return (<PegBoard
        name="URBI" 
        data={data} />) ;
}