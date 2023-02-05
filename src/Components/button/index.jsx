import React from "react";
import "./btn.css";
import { FaBomb, FaFontAwesomeFlag } from "react-icons/fa";
import { useState } from "react";

function Button({ value }) {
  const [status, setStatus] = useState("b");

  const handleClick = (e) => {
    if (e.type === "click") {
      setStatus(status === "b" ? "u" : status === "f" ? "f" : "u");
    } else if (e.type === "contextmenu") {
      e.preventDefault();
      setStatus(status === "b" ? "f" : status === "f" ? "b" : "u");
    }
  };

  return (
    <button className="btn" onClick={handleClick} onContextMenu={handleClick}>
      {status === "b" ? (
        "."
      ) : status === "f" ? (
        <FaFontAwesomeFlag />
      ) : value === 9 ? (
        <FaBomb />
      ) : (
        value
      )}
    </button>
  );
}

export default Button;
