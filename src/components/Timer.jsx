import React from "react";
import { useAppContext } from "../context/appContext";

const Timer = () => {
  const { time } = useAppContext();
  return <div className="time">{time}</div>;
};

export default Timer;
