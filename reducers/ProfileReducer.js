export default function(state = {}, action) {
  switch (action.type) {
    case "PROFILES_FETCH":
      console.log("profilereducer line 4. action.payload", action.payload);
      return {
        ...state,
        profilesList: action.payload
      };
    default:
      return state;
  }
}
