import React from 'react';
import ReactDOM from 'react-dom';
import Board from './board/Board';
import { SIMPLE_BOARD } from './board/boards/boards';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Board board={SIMPLE_BOARD.board1D} width={4} path={SIMPLE_BOARD.path}/>
  </React.StrictMode>,
  document.getElementById('root')
);
