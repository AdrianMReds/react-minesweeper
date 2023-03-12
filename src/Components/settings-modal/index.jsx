import React from "react";
import { Modal, Button } from "antd";

const SettingsModal = ({ modalOpen, setModalOpen }) => {
  return (
    <Modal
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      bodyStyle={{ height: 150 }}
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
          <Button style={{ margin: 10 }}>Fácil</Button>
          <Button style={{ margin: 10 }}>Medio</Button>
          <Button style={{ margin: 10 }}>Díficil</Button>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
