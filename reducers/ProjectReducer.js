export default function (state = {}, action) {
  switch (action.type) {
    case "PROJECTS_FETCH":
      return {
        ...state,
        projectsList: action.payload,
      };
    default:
      return state;
  }
}
