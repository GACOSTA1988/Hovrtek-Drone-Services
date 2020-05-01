export default function (state = {}, action) {
  switch (action.type) {
    case "MESSAGES_FETCH":
      return {
        ...state,
        messagesList: action.payload,
      };
    default:
      return state;
  }
}
