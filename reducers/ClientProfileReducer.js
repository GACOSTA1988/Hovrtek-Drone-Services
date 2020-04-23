export default function (state = {}, action) {
  switch (action.type) {
    case "CLIENT_PROFILES_FETCH":
      return {
        ...state,
        clientProfilesList: action.payload,
      };
    default:
      return state;
  }
}
