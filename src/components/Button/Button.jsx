import React from "react";
import "./Button.css";

const Button = ({
  text,
  onClick,
  variant = "primary", // primary, secondary, danger
  size = "medium", // small, medium, large
  disabled = false,
  className = "",
}) => {
  return (
    <button
      className={`custom-button ${variant} ${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
