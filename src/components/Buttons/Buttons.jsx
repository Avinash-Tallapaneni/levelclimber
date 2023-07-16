import React from "react";

const Buttons = ({ className, text, onClick, isPrevDisabled, disabled }) => {
  const isDisabled = disabled || isPrevDisabled;

  return (
    <button
      className={className}
      disabled={isDisabled}
      onClick={onClick}
      style={{ backgroundColor: isDisabled ? "#8bb3f086" : "" }}
    >
      {text}
    </button>
  );
};

export default Buttons;
