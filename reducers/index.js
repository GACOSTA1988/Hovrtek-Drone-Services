import { combineReducers } from "redux";

import ProjectReducer from "./ProjectReducer";
import PilotProfileReducer from './PilotProfileReducer';
import ClientProfileReducer from './ClientProfileReducer';
import MessageReducer from './MessageReducer';

const rootReducer = combineReducers({
  projectsList: ProjectReducer,
  pilotProfilesList: PilotProfileReducer,
  clientProfilesList: ClientProfileReducer,
  messagesList: MessageReducer
});

export default rootReducer;
