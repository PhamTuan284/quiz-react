export default function QuestionsCount({ questionsCount, questions }) {
    return (
      <div className="questionsCount">
        {questionsCount}/{questions.length}
      </div>
    );
  }
  