export default function Start({ startGame }) {
  return (
    <button
      type="button"
      className="btn btn-primary mt-5 startButton"
      onClick={startGame}
    >
      Start Quiz
    </button>
  );
}
