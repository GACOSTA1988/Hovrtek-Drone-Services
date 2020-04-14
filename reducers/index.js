import { combineReducers } from "redux";

import ProjectReducer from "./ProjectReducer";
import ProfileReducer from './ProfileReducer';

const rootReducer = combineReducers({
  projectsList: ProjectReducer,
  profilesList: ProfileReducer
});
export default rootReducer;
