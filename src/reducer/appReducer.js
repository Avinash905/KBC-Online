export default function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_QUESTION_ID":
      return {
        ...state,
        ques: state.ques + 1,
      };
    case "CHANGE_MONEY":
      return {
        ...state,
        cash: action.payload,
      };
    case "GAME_OVER":
      return {
        ...state,
        gameOver: action.payload,
      };
    case "START_TIMER":
      return {
        ...state,
        time: action.payload,
      };
    case "DECREMENT_TIMER":
      return {
        ...state,
        time: action.payload,
      };

    default:
      return state;
  }
}
