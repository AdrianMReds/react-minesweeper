import React from "react";
import "./styles.css";
import Button from "../button";

const ButtonGrid = ({ board }) => {
  return (
    <div className="grid">
      {board.map((row) => {
        return row.map((bt) => {
          return <Button value={bt} />;
        });
      })}
    </div>
  );
};

export default ButtonGrid;
