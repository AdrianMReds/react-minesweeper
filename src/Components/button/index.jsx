import React from "react";
import "./btn.css";
import { FaBomb, FaFlag } from "react-icons/fa";
import { useState } from "react";
import { updateBoard } from "../../Features/board";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Button({ bt, modFlags, setRender }) {
  const board = useSelector((state) => state.board.value);
  let bx = bt.coords.x;
  let by = bt.coords.y;
  const [stat, setStatus] = useState(board[bx][by].status);

  const dispatch = useDispatch();

  const updateObjectInArray = (array, action) => {
    let brd;
    brd = array.map((item, index) => {
      if (index !== action.x) {
        return item;
      } else {
        return item.map((btn, i) => {
          if (i !== action.y) {
            return btn;
          } else {
            console.log(
              `boton [${action.x}][${action.y}]: ${JSON.stringify(btn)}`
            );
            return {
              ...btn,
              status: action.st,
            };
          }
        });
      }
    });
    // console.log(`brd: ${JSON.stringify(brd)}`);
    return brd;
  };

  const handleClick = (e) => {
    const x = bt.coords.x;
    const y = bt.coords.y;
    if (e.type === "click") {
      const b = [...board];
      dispatch(
        updateBoard(
          updateObjectInArray(b, {
            x: x,
            y: y,
            st: stat === "b" ? "u" : stat === "f" ? "f" : "u",
          })
        )
      );
      // setStatus(status === "b" ? "u" : status === "f" ? "f" : "u");
    } else if (e.type === "contextmenu") {
      e.preventDefault();
      const b = [...board];
      dispatch(
        updateBoard(
          updateObjectInArray(b, {
            x: x,
            y: y,
            st: stat === "b" ? "f" : stat === "f" ? "b" : "u",
          })
        )
      );
      modFlags(stat === "b" ? "-" : stat === "f" ? "+" : "");
      // setStatus(stat === "b" ? "f" : stat === "f" ? "b" : "u");
    }
    setRender();
  };

  return (
    <button className="btn" onClick={handleClick} onContextMenu={handleClick}>
      {stat === "b" ? (
        "."
      ) : stat === "f" ? (
        <FaFlag />
      ) : bt.value === 9 ? (
        <FaBomb />
      ) : (
        bt.value
      )}
    </button>
  );
}

export default Button;
