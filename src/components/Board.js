import React, { useState } from 'react';
import Square from './Square';

function CheckBoard(board){
  if(board[0] === board[1] && board[1] === board[2]) return board[0];
  // horizontals
  else if(board[0] === board[3] && board[3] === board[6]) return board[0];
  else if(board[1] === board[4] && board[4] === board[7]) return board[1];
  else if(board[2] === board[5] && board[5] === board[8]) return board[2];
  // verts
  else if(board[0] === board[1] && board[1] === board[2]) return board[0];
  else if(board[3] === board[4] && board[4] === board[5]) return board[3];
  else if(board[6] === board[7] && board[7] === board[8]) return board[6];
  // diags
  else if(board[0] === board[4] && board[4] === board[8]) return board[0];
  else if(board[2] === board[4] && board[4] === board[6]) return board[2];
  else return null;
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(0);
  const turns = ['X', 'O'];
  const [message, setMessage] = useState("Next player: X");
  const [num_goes, setGoes] = useState(0);
  const [won, setWon] = useState(false);

  const handleClick = (index) => {
    if(!won && squares[index] === null){
      const newSquares = squares.slice();
      newSquares[index] = turns[turn]; // 'X' or 'O' depending on the turn
      let nextTurn = (turn + 1) % 2;
      setTurn(nextTurn);
      let nextGo = num_goes+1;
      let check = CheckBoard(newSquares);
      if(check!=null){
        setMessage("Winner: "+check);
        setWon(true);
      }
      else if(nextGo >= 9) setMessage("Tie");
      else setMessage("Next player: "+ turns[nextTurn]);
      setSquares(newSquares);
      setGoes(nextGo);
    }
    
  };

  const renderSquare = (index) => {
    return (
      <Square 
        value={squares[index]} 
        onClick={() => handleClick(index)} 
      />
    );
  };

  const resetSquare = () => {
    const newSquares = squares.slice().fill(null);
    setSquares(newSquares);
    setGoes(0);
    setMessage("Next Player: X");
    setTurn(0);
    setWon(false);
  }

  return (
    <div>
      <div className="status">{message}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="reset" onClick={resetSquare}>Reset</button>
    </div>
  );
}

export default Board;