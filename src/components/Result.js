export default function Result({ startGame, correct, incorrect, score }) {
  return (
    <div>
      <h1 className="pt-5">All done!</h1>
      <h3 className="mt-5 mb-5">Score: {score}</h3>
      <h3 className="mt-5 mb-5">Correct: {correct}</h3>
      <h3 className="mt-5 mb-5">Incorrect: {incorrect}</h3>
      <div onClick={startGame} className="startOver">
        Start over
      </div>
    </div>
  );
}
