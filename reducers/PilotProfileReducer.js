export default function (state = {}, action) {
  switch (action.type) {
    case "PILOT_PROFILES_FETCH":
      return {
        ...state,
        pilotProfilesList: action.payload,
      };
    default:
      return state;
  }
}
