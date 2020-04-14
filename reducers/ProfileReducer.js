export default function(state = {}, action) {
  switch (action.type) {
    case "PROFILES_FETCH":
      console.log(action.payload);
      return {
        ...state,
        profilesList: action.payload
      };
    default:
      return state;
  }
}
