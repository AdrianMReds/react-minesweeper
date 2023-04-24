import "./App.css";
import { useState } from "react";
import Board from "./Components/board";
import { Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import SettingsModal from "./Components/settings-modal";

const App = () => {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
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
      <Board />
      <SettingsModal
        modalOpen={settingsModalOpen}
        setModalOpen={setSettingsModalOpen}
      />
      <footer>
        This game was developed by{" "}
        <a
          href="https://github.com/AdrianMReds"
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
