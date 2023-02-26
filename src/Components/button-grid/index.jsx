import React from "react";
import "./styles.css";
import Button from "../button";

const ButtonGrid = ({ board, modFlags }) => {
  return (
    <div className="grid">
      {board.map((row) => {
        return row.map((bt) => {
          return <Button bt={bt} modFlags={modFlags} />;
        });
      })}
    </div>
  );
};

export default ButtonGrid;
