export default function (state = {}, action) {
  switch (action.type) {
    case "PROFILES_FETCH":
      return {
        ...state,
        profilesList: action.payload,
      };
    default:
      return state;
  }
}
