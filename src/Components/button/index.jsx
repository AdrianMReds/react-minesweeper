import React from "react";
import "./btn.css";
import { FaBomb } from "react-icons/fa";

function Button({ value, type }) {
  return <button className="btn">{value === 9 ? <FaBomb /> : value}</button>;
}

export default Button;
