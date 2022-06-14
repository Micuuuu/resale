import React from "react";
import "./form-input.styles.scss";
const FormInput = ({ label, ...otherProps }) => {
  const labelClassName = otherProps.value && otherProps.value.length ? "shrink" : "";
  return (
    <div className="group">
      <input className="form-input" {...otherProps} autoComplete="on" />
      {label && <label className={`${labelClassName} form-input-label`}>{label}</label>}
    </div>
  );
};

export default FormInput;
