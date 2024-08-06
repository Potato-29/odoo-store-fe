import React from "react";

const TextInput = ({
  type = "text",
  placeholder,
  className,
  isDisabled = false,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`p-2 rounded-lg ${className}`}
      disabled={isDisabled}
      onChange={onChange}
    />
  );
};

export default TextInput;
