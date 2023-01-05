import { createContext, useContext, useEffect, useReducer } from "react";
import useSound from "use-sound";
import wrongSound from "../assets/sounds/wrong.mp3";
import correctSound from "../assets/sounds/correct.mp3";
import play from "../assets/sounds/play.mp3";
import wait from "../assets/sounds/wait.mp3";
import reducer from "../reducer/appReducer";
import { questions } from "../Questions";

const AppContext = createContext();
const initialState = {
  ques: 0,
  cash: "₹0",
  gameOver: false,
  time: 30,
  money: [
    { id: 1, amount: "₹ 5000" },
    { id: 2, amount: "₹ 10,000" },
    { id: 3, amount: "₹ 20,000" },
    { id: 4, amount: "₹ 40,000" },
    { id: 5, amount: "₹ 80,000" },
    { id: 6, amount: "₹ 1,60,000" },
    { id: 7, amount: "₹ 3,20,000" },
    { id: 8, amount: "₹ 6,40,000" },
    { id: 9, amount: "₹ 12,50,000" },
    { id: 10, amount: "₹ 25,00,000" },
    { id: 11, amount: "₹ 50,00,000" },
    { id: 12, amount: "₹ 1 Crore" },
    { id: 13, amount: "₹ 3 Crore" },
    { id: 14, amount: "₹ 5 Crore" },
    { id: 15, amount: "₹ 7 Crore" },
  ].reverse(),
};

export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [wrongSoundPlay] = useSound(wrongSound);
  const [correctSoundPlay] = useSound(correctSound);
  const [gamePlay] = useSound(play);
  const [gameWait] = useSound(wait);

  const checkAns = (index) => {
    const chk = questions[state.ques].answers[index].correct ? true : false;
    const ele = document.querySelector(`.ans${index}`);
    if (chk) {
      ele.classList.add("correct");
      if (state.ques === 14) {
        setTimeout(() => {
          correctSoundPlay();
        }, 4000);
        dispatch({
          type: "CHANGE_MONEY",
          payload: state.money[state.money.length - state.ques - 1].amount,
        });
        return dispatch({ type: "GAME_OVER", payload: true });
      }
      setTimeout(() => {
        dispatch({ type: "CHANGE_QUESTION_ID" });
        correctSoundPlay();
        dispatch({ type: "START_TIMER", payload: 30 });
      }, 4000);
    } else {
      ele.classList.add("wrong");
      state.ques >= 1
        ? dispatch({
            type: "CHANGE_MONEY",
            payload: state.money[state.money.length - state.ques].amount,
          })
        : dispatch({
            type: "CHANGE_MONEY",
            payload: "₹0",
          });
      setTimeout(() => {
        dispatch({ type: "GAME_OVER", payload: true });
        wrongSoundPlay();
      }, 4000);
    }
  };

  useEffect(() => {
    gameWait();
    if (state.time === 0) {
      state.ques >= 1
        ? dispatch({
            type: "CHANGE_MONEY",
            payload: state.money[state.money.length - state.ques].amount,
          })
        : dispatch({
            type: "CHANGE_MONEY",
            payload: "₹0",
          });
      dispatch({ type: "GAME_OVER", payload: true });
    }
    let decTimer = setInterval(() => {
      dispatch({
        type: "DECREMENT_TIMER",
        payload: state.time - 1,
      });
    }, 1000);
    return () => {
      clearInterval(decTimer);
    };
  }, [state.time, state.money, state.ques]);

  useEffect(() => {
    gamePlay();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        wrongSoundPlay,
        correctSoundPlay,
        gamePlay,
        gameWait,
        checkAns,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  return useContext(AppContext);
};
