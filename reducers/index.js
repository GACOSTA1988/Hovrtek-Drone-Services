import { combineReducers } from "redux";

import ProjectReducer from "./ProjectReducer";

const rootReducer = combineReducers({
  projectsList: ProjectReducer
});
export default rootReducer;
