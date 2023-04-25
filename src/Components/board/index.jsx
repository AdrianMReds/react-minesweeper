import React, { useState, useEffect, useRef } from "react";
import ButtonGrid from "../button-grid";
import { FaFlag, FaFootballBall, FaFutbol } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateBoard } from "../../Features/board";
import generateBoard from "../helper";
import { sizes } from "../helper";
import clubs_players from "../../clubs-players";

const setNumbers = (comp) => {
  console.log(comp);
  const nv = {
    1: clubs_players.clubs[comp]["1"]
      ? clubs_players.clubs[comp]["1"].length > 1
        ? clubs_players.clubs[comp]["1"][
            Math.floor(Math.random() * clubs_players.clubs[comp]["1"].length)
          ]
        : clubs_players.clubs[comp][1][0]
      : null,
    2: clubs_players.clubs[comp]["2"]
      ? clubs_players.clubs[comp]["2"].length > 1
        ? clubs_players.clubs[comp][2][
            Math.floor(Math.random() * clubs_players.clubs[comp]["2"].length)
          ]
        : clubs_players.clubs[comp][2][0]
      : null,
    3: clubs_players.clubs[comp]["3"]
      ? clubs_players.clubs[comp]["3"].length > 1
        ? clubs_players.clubs[comp][3][
            Math.floor(Math.random() * clubs_players.clubs[comp]["3"].length)
          ]
        : clubs_players.clubs[comp][3][0]
      : null,
    4: clubs_players.clubs[comp]["4"]
      ? clubs_players.clubs[comp]["4"].length > 1
        ? clubs_players.clubs[comp][4][
            Math.floor(Math.random() * clubs_players.clubs[comp]["4"].length)
          ]
        : clubs_players.clubs[comp][4][0]
      : null,
    5: clubs_players.clubs[comp]["5"]
      ? clubs_players.clubs[comp]["5"].length > 1
        ? clubs_players.clubs[comp][5][
            Math.floor(Math.random() * clubs_players.clubs[comp]["5"].length)
          ]
        : clubs_players.clubs[comp][5][0]
      : null,
    6: clubs_players.clubs[comp]["6"]
      ? clubs_players.clubs[comp]["6"].length > 1
        ? clubs_players.clubs[comp][6][
            Math.floor(Math.random() * clubs_players.clubs[comp]["6"].length)
          ]
        : clubs_players.clubs[comp][6][0]
      : null,
    7: clubs_players.clubs[comp]["7"]
      ? clubs_players.clubs[comp]["7"].length > 1
        ? clubs_players.clubs[comp][7][
            Math.floor(Math.random() * clubs_players.clubs[comp]["7"].length)
          ]
        : clubs_players.clubs[comp][7][0]
      : null,
    8: clubs_players.clubs[comp]["8"]
      ? clubs_players.clubs[comp]["8"].length > 1
        ? clubs_players.clubs[comp][8][
            Math.floor(Math.random() * clubs_players.clubs[comp]["8"].length)
          ]
        : clubs_players.clubs[comp][8][0]
      : null,
  };
  return nv;
};

const Board = () => {
  const board = useSelector((state) => state.board.value.board);
  const difficulty = useSelector((state) => state.board.value.difficulty);
  const competition = useSelector((state) => state.board.value.competition);
  const [flags, setFlags] = useState(10);
  const [lostGame, setLostGame] = useState(false);
  const [wonGame, setWonGame] = useState(false);
  const [numberValues, setNumberValues] = useState(setNumbers(competition));

  const dispatch = useDispatch();

  useEffect(() => {
    setFlags(sizes[difficulty].mines);
    setNumberValues(setNumbers(competition));
    setLostGame(false);
  }, [difficulty, competition]);

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
            {competition === "champions_league" ? (
              <FaFutbol />
            ) : (
              <FaFootballBall />
            )}{" "}
            Flags: {flags}
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
              setNumberValues(setNumbers(competition));
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
              setNumberValues(setNumbers(competition));
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
