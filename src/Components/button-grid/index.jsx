import React from "react";
import Button from "../button";
import { useSelector } from "react-redux";
import { sizes } from "../helper";

const ButtonGrid = ({ board, modFlags, setLost, setWon, numValues }) => {
  const difficulty = useSelector((state) => state.board.value.difficulty);

  const style = {
    backgroundColor: "lightgray",
    width: 520,
    height: 520,
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
              numValues={numValues}
            />
          );
        });
      })}
    </div>
  );
};

export default ButtonGrid;
