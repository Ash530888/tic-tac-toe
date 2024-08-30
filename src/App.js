import React from 'react';
import Board from './components/Board';
import './components/Board.css';
import './components/Square.css';

function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <Board />
      <button></button>
    </div>
  );
}

export default App;
