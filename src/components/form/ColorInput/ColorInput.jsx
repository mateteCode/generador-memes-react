const ColorInput = ({
  label,
  onChange,
  className = "color-input",
  defaultValue = "#000000",
  disabled = null,
}) => {
  const handleColorChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <label className={`${className}`}>
      <span className={`${className}__label`}>{label}</span>
      <input
        className={`${className}__input`}
        type="color"
        onChange={handleColorChange}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </label>
  );
};
export default ColorInput;
