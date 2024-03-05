import React from "react";
import { Form } from "react-bootstrap";

const TextField = ({ id, type, text, value, onChange, disabled,maxlength }) => {
  return (
    <div className="mb-3 row">
      <label htmlFor={id} className="col-sm-2 col-form-label">
        {text}
      </label>
      <div className="col-sm-10">
        <Form.Control
          type={type}
          className="form-control"
          id={id}
          style={{ backgroundColor: "#EFEFEF" }}
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxlength={maxlength} 
        />
      </div>
    </div>
  );
};

export default TextField;
