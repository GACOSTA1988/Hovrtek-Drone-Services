export default function(state = {}, action) {
  switch (action.type) {
    case "PROJECTS_FETCH":
      // console.log(action.payload);
      return {
        ...state,
        projectsList: action.payload
      };
    default:
      return state;
  }
}
