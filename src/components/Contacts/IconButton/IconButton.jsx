import React from "react";
import style from "./IconButton.module.css";

const IconButton = ({
  children,
  onClick,
  showModal,
  color,
  position,
  ...allyProps
}) => {
  function maceOptionClassName(value, position) {
    const optionClasses = [];
    if (value) {
      optionClasses.push(style.btn_close);
    } else if (position) {
      optionClasses.push(style.btn_plus_contact);
    } else {
      optionClasses.push(style.iconButton);
    }
    return optionClasses;
  }

  return (
    <button
      style={{
        backgroundColor: `${color}`,
      }}
      type="button"
      className={maceOptionClassName(showModal, position)}
      onClick={onClick}
      {...allyProps}
    >
      {children}
    </button>
  );
};

IconButton.defaultProps = {
  onClick: () => null,
  children: null,
  showModal: null,
  color: "#b399cb",
  position: null,
};

export default IconButton;
