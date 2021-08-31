export default function Question({ questions, currentQuestion }) {
  return (
    <h1 className="question d-flex justify-content-center align-items-center">
      {questions[currentQuestion].question}
    </h1>
  );
}
