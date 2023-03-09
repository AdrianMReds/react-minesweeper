import React from "react";
import "./btn.css";
import { FaBomb, FaFlag } from "react-icons/fa";
import { useState } from "react";
import { updateBoard } from "../../Features/board";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Button = ({ bt, modFlags, setLost, setWon }) => {
  const board = useSelector((state) => state.board.value);
  let bx = bt.coords.x;
  let by = bt.coords.y;
  let stat = board[bx][by].status;

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
    return brd;
  };

  const revealAllMines = (b) => {
    for (let x = 0; x < b.length; x++) {
      for (let y = 0; y < b[x].length; y++) {
        if (b[x][y].value === 9) {
          b = updateObjectInArray(b, {
            x: x,
            y: y,
            st: "u",
          });
        }
      }
    }
    return b;
  };

  const wonAlready = (b) => {
    for (let x = 0; x < b.length; x++) {
      for (let y = 0; y < b[x].length; y++) {
        if (b[x][y].value !== 9 && b[x][y].status === "b") {
          return false;
        }
      }
    }
    return true;
  };

  const flagRemaining = (b) => {
    for (let x = 0; x < b.length; x++) {
      for (let y = 0; y < b[x].length; y++) {
        if (b[x][y].status === "b") {
          b = updateObjectInArray(b, {
            x: x,
            y: y,
            st: "f",
          });
        }
      }
    }
    return b;
  };

  const nearbyTiles = (b, x, y) => {
    const tiles = [];
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        const tile = b[x + xOffset]?.[y + yOffset];
        if (
          tile &&
          tile.status === "b" &&
          (tile.coords.x !== x || tile.coords.y !== y)
        ) {
          tiles.push(tile);
        }
      }
    }
    console.log(`Number of nearby tiles: ${tiles.length}`);
    console.log(`Nearby tiles: ${JSON.stringify(tiles)}`);
    return tiles;
  };

  const revealTile = (b, x, y) => {
    // let b = [...board];
    const adjacentTiles = nearbyTiles(b, x, y);
    const mines = adjacentTiles.filter((t) => t.value === 9);
    console.log(`Cuantas minas alrededor: ${mines.length}`);
    if (b[x][y].value === 0) {
      if (b[x][y].status !== "u") {
        b = updateObjectInArray(b, {
          x: x,
          y: y,
          st: "u",
        });
      }
      for (let i = 0; i < adjacentTiles.length; i++) {
        b = updateObjectInArray(b, {
          x: adjacentTiles[i].coords.x,
          y: adjacentTiles[i].coords.y,
          st: adjacentTiles[i].status === "b" ? "u" : stat === "f" ? "f" : "u",
        });
        b = revealTile(b, adjacentTiles[i].coords.x, adjacentTiles[i].coords.y);
      }
    } else {
      b = updateObjectInArray(b, {
        x: x,
        y: y,
        st: b[x][y].status === "b" ? "u" : stat === "f" ? "f" : "u",
      });
    }
    return b;
  };

  const flagTile = (x, y) => {
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
  };

  const handleClick = (e) => {
    const x = bt.coords.x;
    const y = bt.coords.y;
    const b = [...board];
    let brd;

    if (e.type === "click") {
      if (b[x][y].status === "f") {
        return;
      } else if (b[x][y].value === 9) {
        brd = revealAllMines(b);
        dispatch(updateBoard(brd));
        setLost(true);
        return;
      }
      brd = revealTile(b, x, y);
      if (wonAlready(brd)) {
        brd = flagRemaining(brd);
        dispatch(updateBoard(brd));
        setWon(true);
        return;
      }
      dispatch(updateBoard(brd));
    } else if (e.type === "contextmenu") {
      e.preventDefault();
      flagTile(x, y);
    }
  };

  return (
    <button
      className="btn"
      onClick={handleClick}
      onContextMenu={handleClick}
      disabled={stat === "u" ? true : false}
      style={{ cursor: stat === "u" ? "auto" : "pointer" }}
    >
      {stat === "b" ? (
        "."
      ) : stat === "f" ? (
        <FaFlag />
      ) : bt.value === 9 ? (
        <FaBomb color="white" />
      ) : bt.value !== 0 ? (
        bt.value
      ) : (
        "."
      )}
    </button>
  );
};

export default Button;
