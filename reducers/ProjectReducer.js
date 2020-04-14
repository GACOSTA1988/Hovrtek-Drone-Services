export default function(state = {}, action) {
  switch (action.type) {
    case "PROJECTS_FETCH":
      console.log("projectreducer line 4. action.payload: ", action.payload);
      return {
        ...state,
        projectsList: action.payload
      };
    default:
      return state;
  }
}
