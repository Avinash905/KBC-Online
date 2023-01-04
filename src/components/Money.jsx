import React from "react";
import { useAppContext } from "../context/appContext";

const Money = () => {
  const { ques, money } = useAppContext();
  return (
    <section className="money">
      <ul>
        {money.map(({ id, amount }) => {
          return (
            <li key={id} className={ques + 1 === id ? "active" : ""}>
              <span>{id}</span>
              <span>{amount}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Money;
