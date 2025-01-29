import React from "react";

import { ButtonTypes } from "./ButtonTypes";
export default function CustomButton({
  label,
  icon,
  buttonStyles,
  onClick,
  iconPosition,
  type = "button",
  disabled = false,
}: ButtonTypes) {
  return (
    <>
      <button
        onClick={onClick}
        className={buttonStyles}
        type={type}
        disabled={disabled}
      >
        {iconPosition === "LEFT" && icon}
        {label}
        {iconPosition === "RIGHT" && icon}
      </button>
    </>
  );
}
