import { FETCH_INVITED_CHATS } from "../Actions/actionTypes";

const INITIAL_STATE = [];
// list of group chat titles that the user is a guest in
export default function titleReducer(state=INITIAL_STATE, action){
    switch (action.type) {
        case FETCH_INVITED_CHATS:
          // Fetch the list of group chats the user is invited in
          return [...action.payload.groupChats];

        default:
            return state;
    }
}