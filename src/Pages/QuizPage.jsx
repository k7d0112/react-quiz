import { useEffect, useState } from "react";
import Button from "../Components/Button/Button";
import Display from "../Components/Display/Display"
import { quizData } from "../Data/quiz"
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../const";

export default function QuizPage() {
  const [quizIndex, setQuizIndex] = useState(0);
  const [answerLogs, setAnswerLogs] = useState([]);
  const navigation = useNavigate();
  const MAX_QUIZ_LEN = quizData.length;

  const handleClick = (clickedIndex) => {
    if (clickedIndex === quizData[quizIndex].answerIndex) {
      setAnswerLogs((prev) => [...prev, true]);
    } else {
      setAnswerLogs((prev) => [...prev, false]);
    }
    setQuizIndex((prev) => prev + 1);
  }

  useEffect(() => {
    if (answerLogs.length === MAX_QUIZ_LEN) {
      const correctNum = answerLogs.filter((answer) => answer === true);
      navigation(ROUTES.RESULT, {
        state: {
          maxQuizLen: MAX_QUIZ_LEN,
          correctNum: correctNum,
        }
      });
    }
  }, [answerLogs, MAX_QUIZ_LEN, navigation]);

  return (
    <>
      {quizData[quizIndex] &&
        <Display>
          {`Q1. ${quizData[quizIndex].question}`}
        </Display>
      }
      {quizData[quizIndex] && quizData[quizIndex].options.map((option, index) => (
        <Button
          key={index}
          onClick={() => handleClick(index)}
        >
          {option}
        </Button>
      ))}
    </>
  )
}
