import { useEffect, useRef } from "react";

const Checkbox = ({
  label,
  onChange,
  isChecked = false,
  className = "checkbox",
}) => {
  const checkboxRef = useRef(null);

  useEffect(() => {
    checkboxRef.current.checked = isChecked;
  }, []);

  const handleCheckboxChange = () => {
    onChange(checkboxRef.current.checked);
  };

  return (
    <label className={className ? `${className}` : "checkbox"}>
      <span className={className ? `${className}__label` : "checkbox__label"}>
        {label}
      </span>
      <input
        className={className ? `${className}__input` : "checkbox__input"}
        type="checkbox"
        ref={checkboxRef}
        onChange={handleCheckboxChange}
      />
    </label>
  );
};

export default Checkbox;
