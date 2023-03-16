import React, { useState, useEffect, useRef } from "react";
import ButtonGrid from "../button-grid";
import { FaFlag } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateBoard } from "../../Features/board";
import generateBoard from "../helper";
import { sizes } from "../helper";
import clubs_players from "../../clubs-players";

const setNumbers = () => {
  const nv = {
    1:
      clubs_players.clubs["1"].length > 1
        ? clubs_players.clubs["1"][
            Math.floor(Math.random() * clubs_players.clubs["1"].length)
          ]
        : clubs_players.clubs[1][0],
    2:
      clubs_players.clubs["2"].length > 1
        ? clubs_players.clubs[2][
            Math.floor(Math.random() * clubs_players.clubs["2"].length)
          ]
        : clubs_players.clubs[2][0],
    3:
      clubs_players.clubs["3"].length > 1
        ? clubs_players.clubs[3][
            Math.floor(Math.random() * clubs_players.clubs["3"].length)
          ]
        : clubs_players.clubs[3][0],
    4:
      clubs_players.clubs["4"].length > 1
        ? clubs_players.clubs[4][
            Math.floor(Math.random() * clubs_players.clubs["4"].length)
          ]
        : clubs_players.clubs[4][0],
    5:
      clubs_players.clubs["5"].length > 1
        ? clubs_players.clubs[5][
            Math.floor(Math.random() * clubs_players.clubs["5"].length)
          ]
        : clubs_players.clubs[5][0],
    6:
      clubs_players.clubs["6"].length > 1
        ? clubs_players.clubs[6][
            Math.floor(Math.random() * clubs_players.clubs["6"].length)
          ]
        : clubs_players.clubs[6][0],
    7:
      clubs_players.clubs["7"].length > 1
        ? clubs_players.clubs[7][
            Math.floor(Math.random() * clubs_players.clubs["7"].length)
          ]
        : clubs_players.clubs[7][0],
    8: null,
  };
  return nv;
};

const Board = () => {
  const board = useSelector((state) => state.board.value.board);
  const difficulty = useSelector((state) => state.board.value.difficulty);
  const [flags, setFlags] = useState(10);
  const [lostGame, setLostGame] = useState(false);
  const [wonGame, setWonGame] = useState(false);
  const [numberValues, setNumberValues] = useState(setNumbers());

  const dispatch = useDispatch();

  useEffect(() => {
    setFlags(sizes[difficulty].mines);
    setNumberValues(setNumbers());
  }, [difficulty]);

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
            numValues={numberValues}
          />
        </div>
      ) : lostGame ? (
        <div style={{ textAlign: "-webkit-center" }}>
          <button
            onClick={() => {
              dispatch(updateBoard(generateBoard(difficulty)));
              setNumberValues(setNumbers());
              setLostGame(false);
              setWonGame(false);
              setFlags(sizes[difficulty].mines);
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
              numValues={numberValues}
            />
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "-webkit-center" }}>
          <button
            onClick={() => {
              dispatch(updateBoard(generateBoard(difficulty)));
              setLostGame(false);
              setWonGame(false);
              setFlags(sizes[difficulty].mines);
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
              numValues={numberValues}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
