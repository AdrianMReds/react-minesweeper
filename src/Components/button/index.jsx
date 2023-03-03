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

  const nearbyTiles = (b, x, y) => {
    const tiles = [];
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        const tile = b[x + xOffset]?.[y + yOffset];
        if (tile) {
          tiles.push(tile);
        }
      }
    }
    console.log(`Number of nearby tiles: ${tiles.length - 1}`);
    console.log(`Nearby tiles: ${JSON.stringify(tiles)}`);
    return tiles;
  };

  const revealTile = (x, y) => {
    let b = [...board];
    // dispatch(
    //   updateBoard(
    //     updateObjectInArray(b, {
    //       x: x,
    //       y: y,
    //       st: stat === "b" ? "u" : stat === "f" ? "f" : "u",
    //     })
    //   )
    // );
    const adjacentTiles = nearbyTiles(b, x, y);
    const mines = adjacentTiles.filter((t) => t.value === 9);
    console.log(`Cuantas minas alrededor: ${mines.length}`);
    if (mines.length === 0) {
      // adjacentTiles.forEach(revealTile.bind(null, b));
      for (let i = 0; i < adjacentTiles.length; i++) {
        b = updateObjectInArray(b, {
          x: adjacentTiles[i].coords.x,
          y: adjacentTiles[i].coords.y,
          st: adjacentTiles[i].status === "b" ? "u" : stat === "f" ? "f" : "u",
        });
      }
    } else {
      b = updateObjectInArray(b, {
        x: x,
        y: y,
        st: b[x][y].status === "b" ? "u" : stat === "f" ? "f" : "u",
      });
    }
    dispatch(updateBoard(b));
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

    if (e.type === "click") {
      revealTile(x, y);
    } else if (e.type === "contextmenu") {
      e.preventDefault();
      flagTile(x, y);
    }
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
