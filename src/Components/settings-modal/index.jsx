import React from "react";
import { Modal, Button } from "antd";
import { useState, useEffect } from "react";
import { updateBoard, updateDifficulty } from "../../Features/board";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import generateBoard from "../helper";
import { sizes } from "../helper";

const SettingsModal = ({ modalOpen, setModalOpen }) => {
  const difficulty = useSelector((state) => state.board.value.difficulty);
  const [tempDiff, setTempDiff] = useState(difficulty);
  const dispatch = useDispatch();

  useEffect(() => {
    if (modalOpen) {
      setTempDiff(difficulty);
    }
  }, [modalOpen]);

  const handleOk = () => {
    setModalOpen(false);
    dispatch(updateDifficulty(tempDiff));
    dispatch(updateBoard(generateBoard(tempDiff)));
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <Modal
      open={modalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      bodyStyle={{ height: 200 }}
    >
      <div style={{ alignContent: "center" }}>
        <h1 style={{ textAlign: "center" }}>Dificultad</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            style={{ margin: 10 }}
            type={tempDiff === "facil" ? "primary" : "default"}
            onClick={() => {
              setTempDiff("facil");
            }}
          >
            Fácil
          </Button>
          <Button
            style={{ margin: 10 }}
            type={tempDiff === "medio" ? "primary" : "default"}
            onClick={() => {
              setTempDiff("medio");
            }}
          >
            Medio
          </Button>
          <Button
            style={{ margin: 10 }}
            type={tempDiff === "dificil" ? "primary" : "default"}
            onClick={() => {
              setTempDiff("dificil");
            }}
          >
            Díficil
          </Button>
        </div>
      </div>
      <p style={{ marginTop: 70, fontSize: 10, textAlign: "center" }}>
        <b style={{ color: "red" }}>* </b>
        If you change the difficulty in the middle of a game it will
        automatically restart
        <b style={{ color: "red" }}> *</b>
      </p>
    </Modal>
  );
};

export default SettingsModal;
