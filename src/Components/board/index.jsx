import React, { useState, useEffect, useRef } from "react";
import ButtonGrid from "../button-grid";
import { FaFlag } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateBoard } from "../../Features/board";
import generateBoard from "../helper";

const Board = () => {
  const board = useSelector((state) => state.board.value.board);
  const difficulty = useSelector((state) => state.board.value.difficulty);
  const [flags, setFlags] = useState(10);
  const [lostGame, setLostGame] = useState(false);
  const [wonGame, setWonGame] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Cambió lostGame");
    console.log(lostGame);
  }, [lostGame]);

  const modifyFlags = (type) => {
    setFlags((prevFlags) =>
      type === "+" ? prevFlags + 1 : type === "-" ? prevFlags - 1 : prevFlags
    );
  };

  return (
    <div>
      {!lostGame && !wonGame ? (
        <div style={{ textAlign: "-webkit-center" }}>
          <h2>
            <FaFlag /> Flags: {flags}
          </h2>
          <ButtonGrid
            board={board}
            modFlags={modifyFlags}
            setLost={setLostGame}
            setWon={setWonGame}
          />
        </div>
      ) : lostGame ? (
        <div style={{ textAlign: "-webkit-center" }}>
          <button
            onClick={() => {
              dispatch(updateBoard(generateBoard()));
              setLostGame(false);
              setWonGame(false);
              setFlags(10);
            }}
          >
            Restart
          </button>
          <div style={{ pointerEvents: "none" }}>
            <h1>GAME OVER</h1>
            <ButtonGrid
              board={board}
              modFlags={modifyFlags}
              setLost={setLostGame}
              setWon={setWonGame}
            />
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "-webkit-center" }}>
          <button
            onClick={() => {
              dispatch(updateBoard(generateBoard()));
              setLostGame(false);
              setWonGame(false);
              setFlags(10);
            }}
          >
            New Game
          </button>
          <div style={{ pointerEvents: "none" }}>
            <h1>GANASTE</h1>
            <ButtonGrid
              board={board}
              modFlags={modifyFlags}
              setLost={setLostGame}
              setWon={setWonGame}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
