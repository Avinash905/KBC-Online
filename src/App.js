import "./App.css";
import React from "react";
import PlayScreen from "./components/PlayScreen";
import Money from "./components/Money";

function App() {
  // useEffect(() => {
  //   if (time === 0) {
  //     return setGameOver(true);
  //   }
  //   const timi = setInterval(() => {
  //     setTime(time - 1);
  //   }, 1000);
  //   return () => clearInterval(timi);
  // }, [time, setGameOver]);

  // useEffect(() => {
  //   gameWait();

  //   setTime(5);
  // }, [ques]);

  return (
    <>
      <div className="layout">
        <PlayScreen />
        <Money />
      </div>
    </>
  );
}

export default App;
