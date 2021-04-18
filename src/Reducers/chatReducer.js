import { FETCH_GROUP_CHAT, ADD_GROUP_CHAT, FETCH_MESSAGES, ADD_MESSAGE, DELETE_GROUP_CHAT} from '../actionTypes.js'
const INITIAL_STATE = {};

export default function chatReducer (state=INITIAL_STATE, action){
    switch(action.type){
        case FETCH_GROUP_CHAT:
            // Fetch the group chat and return it
            // This is specifically for the InvitingGuest component
            return { ...state, ...action.payload };

        case ADD_GROUP_CHAT:
            // With state as an array of objects, add contact's user_id
            // a nickname that the user can choose, and the contact's username
           
           
            return {...state, [action.payload.id]: action.payload};

        case DELETE_GROUP_CHAT:
            if(!state[action.payload]) return state;
            delete state[action.payload];
            return {...state}

        default:
            return state;
    }
}