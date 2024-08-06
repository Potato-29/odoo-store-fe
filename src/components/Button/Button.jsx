import React from "react";

const Button = ({
  text,
  isDisabled = false,
  className,
  onClick,
  bgColor = "black",
  fgColor = "white",
}) => {
  return (
    <button
      style={{
        backgroundColor: bgColor,
        color: fgColor,
      }}
      className={`p-2 rounded-lg ${className}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
