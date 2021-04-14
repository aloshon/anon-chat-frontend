import {combineReducers} from "redux";
import chatReducer from './chatReducer';
import contactReducer from './contactReducer';
import titleReducer from './titleReducer';
import blockListReducer from './blockListReducer';

const rootReducer = combineReducers({groupChat: chatReducer, contacts: contactReducer, titles: titleReducer, blockList: blockListReducer});

export default rootReducer;