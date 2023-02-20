import React from "react";
import "./styles.css";
import Button from "../button";

const ButtonGrid = ({ board, modFlags, setRender }) => {
  return (
    <div className="grid">
      {board.map((row) => {
        return row.map((bt) => {
          return <Button bt={bt} modFlags={modFlags} setRender={setRender} />;
        });
      })}
    </div>
  );
};

export default ButtonGrid;
