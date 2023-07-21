const FileInput = ({ label, labelBtn, onChange, className = "file-input" }) => {
  const inputId = Date.now();

  const handleUploadBtn = (e) => {
    onChange(e.target.files[0]);
  };

  return (
    <div className={`${className}`}>
      <span className={`${className}__label`}>{label}</span>
      <input
        type="file"
        hidden
        id={`upload-${inputId}`}
        onChange={handleUploadBtn}
      />
      <label className={`${className}__button`} htmlFor={`upload-${inputId}`}>
        {labelBtn}
      </label>
    </div>
  );
};
export default FileInput;
