import React from "react";
import "./styles.css";
import Button from "../button";

const ButtonGrid = ({ board, setBoard, modFlags }) => {
  return (
    <div className="grid">
      {board.map((row) => {
        return row.map((bt) => {
          return (
            <Button
              value={bt}
              board={board}
              setBoard={setBoard}
              modFlags={modFlags}
            />
          );
        });
      })}
    </div>
  );
};

export default ButtonGrid;
