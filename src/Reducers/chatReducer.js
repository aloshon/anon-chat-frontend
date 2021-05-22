import { FETCH_GROUP_CHAT, ADD_GROUP_CHAT, DELETE_GROUP_CHAT, INVITE_GUEST} from '../Actions/actionTypes.js'
const INITIAL_STATE = {};

export default function chatReducer (state=INITIAL_STATE, action){
    switch(action.type){
        case FETCH_GROUP_CHAT:
            // Fetch the group chat and return it
            
            return { ...state, [action.payload.unique_id]: action.payload };

        case ADD_GROUP_CHAT:
            // With state as an array of objects, add contact's user_id
            // a nickname that the user can choose, and the contact's username
            return {...state, [action.payload.unique_id]: action.payload};

        case INVITE_GUEST:
            // With guests as an array of objects, 
            // add guest to guest list
            // replace and delete unique_id as 
            //it is only needed to locate group chat
            const groupChat = state[action.payload.unique_id];
            const unique_id = action.payload.unique_id;
            delete action.payload.unique_id;


            return {...state, [unique_id]: {...groupChat, guests: [...groupChat.guests, action.payload]}};

        case DELETE_GROUP_CHAT:
            // Remove group chat from state
            if(!state[action.payload]) return state;
            delete state[action.payload];
            return {...state}

        default:
            return state;
    }
}