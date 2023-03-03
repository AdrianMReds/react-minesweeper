import React, { useState, useEffect, useRef } from "react";
import ButtonGrid from "../button-grid";
import { FaFlag } from "react-icons/fa";
import { useSelector } from "react-redux";

const Board = () => {
  const board = useSelector((state) => state.board.value);
  // const [board, setBoard] = useState(generateBoard());
  const [reRender, setReRender] = useState(true);
  const [flags, setFlags] = useState(10);

  const modifyFlags = (type) => {
    setFlags((prevFlags) =>
      type === "+" ? prevFlags + 1 : type === "-" ? prevFlags - 1 : prevFlags
    );
  };

  useEffect(() => {
    // console.log(`board: ${JSON.stringify(board)}`);
    console.log(`Cambió board`);
  }, [board]);

  // const countMines = () => {
  //   let mineCounter = 0;
  //   board.map((row) => {
  //     let num = row.filter((x) => x === 9).length;
  //     mineCounter += num;
  //   });
  //   return mineCounter;
  // };

  return (
    <div style={{ textAlign: "-webkit-center" }}>
      <h2>
        <FaFlag /> Flags: {flags}
      </h2>
      {/* <div>{board}</div> */}
      {/* <button
        onClick={() => {
          setBoard(generateBoard());
        }}
      >
        Restart
      </button> */}
      <ButtonGrid board={board} modFlags={modifyFlags} />
    </div>
  );
};

export default Board;
