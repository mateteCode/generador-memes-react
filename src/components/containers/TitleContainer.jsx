import "./TitleContainer.css";
const TitleContainer = ({ title, children }) => {
  return (
    <div className="title-container">
      <span className="title-container__title">{title}</span>
      {children}
    </div>
  );
};
export default TitleContainer;
