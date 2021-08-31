import "./App.css";
import { useState, useRef } from "react";
import Start from "./components/Start";
import Result from "./components/Result";
import QuestionsCount from "./components/QuestionsCount";
import Timer from "./components/Timer";
import Streak from "./components/Streak";
import Question from "./components/Question";
import Answer from "./components/Answer";

const QUESTIONS = [
  {
    id: 1,
    question: "How many days makes a week ?",
    optionA: "10 days",
    optionB: "14 days",
    optionC: "5 days",
    optionD: "7 days",
    correctOption: "optionD",
  },

  {
    id: 2,
    question: "Who was the first President of USA ?",
    optionA: "Donald Trump",
    optionB: "Barack Obama",
    optionC: "Abraham Lincoln",
    optionD: "George Washington",
    correctOption: "optionD",
  },

  {
    id: 3,
    question: "How many hours can be found in a day ?",
    optionA: "30 hours",
    optionB: "38 hours",
    optionC: "48 hours",
    optionD: "24 hours",
    correctOption: "optionD",
  },

  {
    id: 4,
    question: "Which is the longest river in the world ?",
    optionA: "River Nile",
    optionB: "Long River",
    optionC: "River Niger",
    optionD: "Lake Chad",
    correctOption: "optionA",
  },
];

const TIME_LIMIT = 10;

function App() {
  //state
  const [questions, setQuestions] = useState(QUESTIONS);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [timer, setTimer] = useState(TIME_LIMIT);
  const [streak, setStreak] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(null);
  const [score, setScore] = useState(0);

  let optionClass = "d-flex justify-content-center align-items-center";
  const [optionsClassA, setOptionsClassA] = useState(`${optionClass} optionA`);
  const [optionsClassB, setOptionsClassB] = useState(`${optionClass} optionB`);
  const [optionsClassC, setOptionsClassC] = useState(`${optionClass} optionC`);
  const [optionsClassD, setOptionsClassD] = useState(`${optionClass} optionD`);

  //ref
  const refTimer = useRef(0);

  function playAudio() {
    const audio = document.getElementById("audio-element");
    audio.play()
  }

  function stopAudio() {
    const audio = document.getElementById("audio-element");
    audio.pause()
  }

  function randomQuestions() {
    let randomQuestions = [];
    let cloneQuestions = [...QUESTIONS];

    for (let i = 0; i < questions.length; i++) {
      const random =
        cloneQuestions[Math.floor(Math.random() * cloneQuestions.length)];

      cloneQuestions = cloneQuestions.filter(
        (question) => question.id !== random.id
      );

      randomQuestions.push(random);
    }

    setQuestions(randomQuestions);
  }

  function startGame() {
    // playAudio();
    setScore(0);
    randomQuestions();
    setCurrentQuestion(0);
    setQuestionsCount(1);
    setStreak(0);
    setCorrect(0);
    setIncorrect(0);
    setTimer(TIME_LIMIT);

    refTimer.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          setIncorrect((prevIncorrect) => {
            return prevIncorrect + 1;
          });

          setCurrentQuestion((prevQuestion) => {
            setQuestionsCount((prevQuestionsCount) => {
              return prevQuestionsCount + 1;
            });

            if (prevQuestion < questions.length - 1) {
              return prevQuestion + 1;
            } else {
              stopAudio();
              clearInterval(refTimer.current);
              return prevQuestion;
            }
          });

          return timer;
        }
      });
    }, 1000);
  }

  const handleAnswerOptionClick = (e, option) => {
    let currentQuestionAnswer = questions[currentQuestion].correctOption;
    
    if (option === currentQuestionAnswer) {
      setCorrect(correct + 1);
      setStreak(streak + 1);
      setScore(score + 100 + (streak * 100))
    } else if (option !== currentQuestionAnswer) {
      setIncorrect(incorrect + 1);
      setStreak(0);
    }

    if (currentQuestionAnswer === "optionA") {
      setOptionsClassA(`${optionClass} optionA green`);
      setOptionsClassB(`${optionClass} optionB red`);
      setOptionsClassC(`${optionClass} optionC red`);
      setOptionsClassD(`${optionClass} optionD red`);
    } else if (currentQuestionAnswer === "optionB") {
      setOptionsClassA(`${optionClass} optionA red`);
      setOptionsClassB(`${optionClass} optionB green`);
      setOptionsClassC(`${optionClass} optionC red`);
      setOptionsClassD(`${optionClass} optionD red`);
    } else if (currentQuestionAnswer === "optionC") {
      setOptionsClassA(`${optionClass} optionA red`);
      setOptionsClassB(`${optionClass} optionB red`);
      setOptionsClassC(`${optionClass} optionC green`);
      setOptionsClassD(`${optionClass} optionD red`);
    } else if (currentQuestionAnswer === "optionD") {
      setOptionsClassA(`${optionClass} optionA red`);
      setOptionsClassB(`${optionClass} optionB red`);
      setOptionsClassC(`${optionClass} optionC red`);
      setOptionsClassD(`${optionClass} optionD green`);
    }

    setTimeout(() => {
      setOptionsClassA(`${optionClass} optionA`);
      setOptionsClassB(`${optionClass} optionB`);
      setOptionsClassC(`${optionClass} optionC`);
      setOptionsClassD(`${optionClass} optionD`);
    }, 1000);

    if (questionsCount !== questions.length) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setQuestionsCount(questionsCount + 1);
        setTimer(TIME_LIMIT);
      }, 1000);
    } else {
      setTimeout(() => {
        setQuestionsCount(questionsCount + 1);
        setTimer(TIME_LIMIT);
        stopAudio();

        const interval_id = window.setInterval(function () {},
        Number.MAX_SAFE_INTEGER);
        for (let i = 1; i < interval_id; i++) {
          window.clearInterval(i);
        }
      }, 1000);
    }
    e.stopPropagation();
  };

  if (questionsCount === null) {
    return (
      <div className="App">
        <Start startGame={startGame} />
      </div>
    );
  } else if (questionsCount - 1 === questions.length) {
    return (
      <div className="App result">
        <Result correct={correct} incorrect={incorrect} score={score} startGame={startGame} />
      </div>
    );
  } else
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="topBar d-flex">
            <QuestionsCount
              questionsCount={questionsCount}
              questions={questions}
            />

            <Timer timer={timer} />

            <Streak streak={streak} />

            <div className="score">
              Score {score}
            </div>
          </div>

          <div className="qa">
            <Question questions={questions} currentQuestion={currentQuestion} />

            <div className="answers row gx-2">
              <Answer
                optionStr="optionA"
                option={questions[currentQuestion].optionA}
                optionsClass={optionsClassA}
                handleAnswerOptionClick={handleAnswerOptionClick}
              />

              <Answer
                optionStr="optionB"
                option={questions[currentQuestion].optionB}
                optionsClass={optionsClassB}
                handleAnswerOptionClick={handleAnswerOptionClick}
              />

              <Answer
                optionStr="optionC"
                option={questions[currentQuestion].optionC}
                optionsClass={optionsClassC}
                handleAnswerOptionClick={handleAnswerOptionClick}
              />

              <Answer
                optionStr="optionD"
                option={questions[currentQuestion].optionD}
                optionsClass={optionsClassD}
                handleAnswerOptionClick={handleAnswerOptionClick}
              />
            </div>
          </div>
        </div>
      </div>
    );
}

export default App;
