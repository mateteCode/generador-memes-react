const NumberInput = ({
  label,
  onChange,
  className = "number-input",
  defaultValue = 0,
  disabled = null,
}) => {
  const handleNumberChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <label className={`${className}`}>
      <span className={`${className}__label`}>{label}</span>
      <input
        className={`${className}__input`}
        type="number"
        onChange={handleNumberChange}
        defaultValue={defaultValue}
      />
    </label>
  );
};
export default NumberInput;
