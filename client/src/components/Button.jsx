import React from "react";
import Button from "react-bootstrap/Button";

const ButtonComponent = ({ name, className, type }) => {
  return (
    <Button
      className={`float-end ${className}`}
      variant="secondary"
      style={{ backgroundColor: "#B5A28C", color: "white", border: "none" }}
      type={type}
    >
      {name}
    </Button>
  );
};

export default ButtonComponent;
