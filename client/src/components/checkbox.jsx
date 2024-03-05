import React from "react";

const Checkbox = ({
  value,
  isChecked,
  onCheckboxChange,
  grantedCodes = [],
}) => {
  const initialChecked = grantedCodes.includes(value);
  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    onCheckboxChange(checked, value);
  };

  return (
    <div>
      <input
        type="checkbox"
        value={value}
        checked={isChecked || initialChecked}
        onChange={(e) => handleCheckboxChange(e)}
      />
    </div>
  );
};

export default Checkbox;
