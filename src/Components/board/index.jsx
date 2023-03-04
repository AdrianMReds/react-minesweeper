import React, { useState, useEffect, useRef } from "react";
import ButtonGrid from "../button-grid";
import { FaFlag } from "react-icons/fa";
import { useSelector } from "react-redux";

const Board = () => {
  const board = useSelector((state) => state.board.value);
  const [flags, setFlags] = useState(10);
  const [lostGame, setLostGame] = useState(false);

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
      {!lostGame ? (
        <div style={{ textAlign: "-webkit-center" }}>
          <h2>
            <FaFlag /> Flags: {flags}
          </h2>
          {/* <button
        onClick={() => {
          setBoard(generateBoard());
        }}
      >
        Restart
      </button> */}
          <ButtonGrid
            board={board}
            modFlags={modifyFlags}
            setLost={setLostGame}
          />
        </div>
      ) : (
        <div>Game over</div>
      )}
    </div>
  );
};

export default Board;
