export default function Answer({ optionStr, option, optionsClass, handleAnswerOptionClick }) {
  return (
    <div
      className="col-12 col-md-3 answer mb-4"
      onClick={(e) => handleAnswerOptionClick(e, optionStr)}
      
    >
      <p className={optionsClass}>{option}</p>
    </div>
  );
}
