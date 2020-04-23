import { combineReducers } from "redux";

import ProjectReducer from "./ProjectReducer";
import PilotProfileReducer from './PilotProfileReducer';
import ClientProfileReducer from './ClientProfileReducer';

const rootReducer = combineReducers({
  projectsList: ProjectReducer,
  pilotProfilesList: PilotProfileReducer,
  clientProfilesList: ClientProfileReducer
});

export default rootReducer;
