import React from "react";
import Timer from "./Timer";
import GameOver from "./GameOver";
import { useAppContext } from "../context/appContext";
import { questions } from "../Questions";

const PlayScreen = () => {
  const { ques, cash, gameOver, checkAns } = useAppContext();
  return (
    <section className="playscreen">
      {gameOver ? (
        <GameOver cash={cash} />
      ) : (
        <>
          <div className="timer">
            <Timer />
          </div>
          <div className="ques-ans">
            <h3 className="question">{questions[ques].question}</h3>
            <div className="answers">
              {questions[ques].answers.map((ans, index) => {
                return (
                  <p
                    key={ans.text}
                    className={`ans${index} ans`}
                    onClick={() => checkAns(index)}
                  >
                    {ans.text}
                  </p>
                );
              })}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default PlayScreen;
