import "./App.css";
import { useState } from "react";
import Board from "./Components/board";
import { Button } from "antd";
import { SettingOutlined, InfoCircleOutlined } from "@ant-design/icons";
import SettingsModal from "./Components/settings-modal";
import InfoModal from "./Components/info-modal";

const App = () => {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  return (
    <div className="App">
      <h1 style={{ margin: 0 }}>Football Minesweeper</h1>
      <Button
        icon={<SettingOutlined />}
        shape="circle"
        size="large"
        style={{ position: "absolute", top: 0, right: 0, margin: 20 }}
        onClick={() => setSettingsModalOpen(true)}
      />
      {/* <Button
        icon={<InfoCircleOutlined />}
        shape="circle"
        size="large"
        style={{ position: "absolute", top: 0, left: 0, margin: 20 }}
        onClick={() => setInfoModalOpen(true)}
      /> */}
      <Board />
      <SettingsModal
        modalOpen={settingsModalOpen}
        setModalOpen={setSettingsModalOpen}
      />
      <InfoModal modalOpen={infoModalOpen} setModalOpen={setInfoModalOpen} />
      <footer>
        This game was developed by{" "}
        <a
          href="https://adrianmreds.vercel.app/"
          style={{ textDecoration: "none" }}
          target="_blank"
        >
          @AdrianMReds
        </a>
      </footer>
    </div>
  );
};

export default App;
