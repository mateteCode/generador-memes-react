const TextInput = ({
  label,
  onChange,
  className = "text-input",
  disabled = null,
  placeholder = null,
  state = null,
}) => {
  const handleTextChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <label className={`${className}`}>
      <span className={`${className}__label`}>{label}</span>
      <input
        type="text"
        className={`${className}__input`}
        onChange={handleTextChange}
        placeholder={placeholder}
        value={state}
      />
    </label>
  );
};
export default TextInput;
