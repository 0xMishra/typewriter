import React from "react";
import "./index.css";
import generateRandomWord from "random-words";
import { useEffect, useState } from "react";
const App = () => {
  const [words, setWords] = useState([]);
  const [count, setCount] = useState(60);
  const [wordIndex, setWordIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setWords(generateRandomWord(100));
  }, [isStarted]);

  useEffect(() => {
    if (isStarted) {
      let currentTime = 60;
      const interval = setInterval(() => {
        currentTime--;
        setCount(currentTime);

        if (currentTime === 0) {
          clearInterval(interval);
          setIsStarted(false);
          setCount(60);
          setInputValue("");
          setWordIndex(0);
        }
      }, 1000);
    }
  }, [isStarted]);
  const wordChecker = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.endsWith(" ")) {
      setInputValue("");
      console.log(wordIndex);
      setWordIndex(wordIndex + 1);
      console.log(words[wordIndex]);
      console.log(inputValue === words[wordIndex]);
      if (inputValue === words[wordIndex]) {
        setCorrect(correct + 1);
      } else if (inputValue !== words[wordIndex]) {
        setIncorrect(incorrect + 1);
      }
    }
  };
  const startCount = () => {
    setIsStarted(true);
    setIncorrect(0);
    setCorrect(0);
  };
  return (
    <main>
      <h1>TypeWriter</h1>
      <form action="">
        {isStarted ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <input
              type="text"
              onChange={(e) => wordChecker(e)}
              style={{ border: "1.3px solid black" }}
              value={inputValue}
            />
            <h2>{count}</h2>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <input
              type="text"
              disabled
              value=""
              style={{ border: "1px solid gray" }}
            />

            <button onClick={startCount} type="submit">
              START
            </button>
          </div>
        )}
      </form>
      {isStarted ? (
        <div className="Card">
          <div>
            {words.map((item, index) => {
              return <span key={index}>{item} </span>;
            })}
          </div>
        </div>
      ) : (
        ""
      )}
      {!isStarted ? (
        <footer>
          <div>
            <p>Words Per Minute</p>
            <h3>{((correct + incorrect) / 5) * 60}</h3>
          </div>
          <div>
            <p>Errors</p>
            <h3>{incorrect}</h3>
          </div>
          <div>
            <p>Accuracy</p>
            {correct + incorrect === 0 ? (
              <h3>0%</h3>
            ) : (
              <h3>{Math.round((correct / (incorrect + correct)) * 100)}%</h3>
            )}
          </div>
        </footer>
      ) : (
        ""
      )}
    </main>
  );
};

export default App;
