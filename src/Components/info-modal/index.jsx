import React from "react";
import { Modal } from "antd";

const InfoModal = ({ modalOpen, setModalOpen }) => {
  const handleOk = () => {
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <Modal
      open={modalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      bodyStyle={{ height: 400, overflowX: "auto" }}
    >
      <div style={{ alignContent: "center" }}>
        <h1 style={{ textAlign: "center" }}>Instructions</h1>
        <ol>
          <li>
            Once the game is open, you will see a rectangular grid of squares,
            some of which contain mines. Your job is to uncover all of the
            squares that do not contain mines without detonating any of the
            mines.
          </li>
          <li>
            To uncover a square, simply left-click on it. If the square contains
            a mine, the game is over and you lose. If the square does not
            contain a mine, a number will be revealed indicating the number of
            mines that are adjacent to that square.
          </li>
          <li>
            Using the numbers revealed by the squares you have uncovered, you
            can determine the locations of the remaining mines. For example, if
            a square has the number "1" on it, that means there is exactly one
            mine adjacent to that square. Use this information to flag or mark
            the squares that you believe contain mines.
          </li>
          <li>
            To flag or mark a square, simply right-click on it. This will place
            a flag or marker on the square to indicate that you believe there is
            a mine there.
          </li>
          <li>
            Continue to left-click on squares and flag or mark them until you
            have uncovered all of the squares that do not contain mines. If you
            successfully uncover all of these squares, you win the game!
          </li>
          <li>
            If at any point you left-click on a square that contains a mine, the
            game is over and you will need to start again.
          </li>
          <li>
            If you are having trouble with the game, try using the "Easy,"
            "Intermediate," or "Hard" levels to adjust the size of the board and
            the number of mines. You can also use the "Custom" level to create
            your own board with a specific size and number of mines.
          </li>
        </ol>
        <h1 style={{ textAlign: "center" }}>Competition</h1>
        <ol>
          <li>
            On this minesweeper, instead of a number you'll get a team logo,
            which means how many times has the team won that competition
          </li>
          <p>
            For example: Miami Dolphins have won the Super Bowl two times, so if
            the Miami Dolphins logo pop up, it means that cell is the equivalent
            to a number 2
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <img
              style={{ marginRight: 25 }}
              src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/mia.png"
              height={75}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Arrow_right.svg/2560px-Arrow_right.svg.png"
              height={35}
            />
            <img
              src="https://www.printableparadise.com/numbers/printable-number-2-outline.png"
              height={50}
              style={{ marginLeft: 25 }}
            />
          </div>
        </ol>
      </div>
    </Modal>
  );
};

export default InfoModal;
