import React, { useReducer } from "react";
import { DateCounterState } from "../../utils/Interfaces/DateCounter";
import { DateCounterAction } from "../../utils/Interfaces/DateCounter";

const initialState: DateCounterState = { count: 0, step: 1 };

function reducer(
  state: DateCounterState,
  action: DateCounterAction
): DateCounterState {
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return {
        ...state,
        count: action.payload !== undefined ? action.payload : 0,
      };
    case "setStep":
      return {
        ...state,
        step: action.payload !== undefined ? action.payload : 1,
      };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action type");
  }
}

const DateCounter: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("June 21, 2027");
  date.setDate(date.getDate() + count);

  const dec = function (): void {
    dispatch({ type: "dec" });
  };

  const inc = function (): void {
    dispatch({ type: "inc" });
  };

  const defineCount = function (count: number): void {
    dispatch({ type: "setCount", payload: count });
  };

  const defineStep = function (step: number): void {
    dispatch({ type: "setStep", payload: Number(step) });
  };

  const reset = function (): void {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) => {
            defineStep(Number(e.target.value));
          }}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input
          value={count}
          onChange={(e) => {
            defineCount(Number(e.target.value));
          }}
        />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default DateCounter;
