import React from "react";
import Button from "../button";
import { useSelector } from "react-redux";
import { sizes } from "../helper";

const ButtonGrid = ({ board, modFlags, setLost, setWon }) => {
  const difficulty = useSelector((state) => state.board.value.difficulty);

  const style = {
    backgroundColor: "lightgray",
    width: 550,
    height: 550,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "20px auto",
  };

  return (
    <div style={style}>
      {board.map((row) => {
        return row.map((bt) => {
          return (
            <Button
              bt={bt}
              modFlags={modFlags}
              setLost={setLost}
              setWon={setWon}
              btWidth={style.width / sizes[difficulty].columns}
              btHeight={style.height / sizes[difficulty].columns}
            />
          );
        });
      })}
    </div>
  );
};

export default ButtonGrid;
