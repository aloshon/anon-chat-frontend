import {ADD_CONTACT, DELETE_CONTACT, FETCH_CONTACT_LIST} from '../Actions/actionTypes.js'
const INITIAL_STATE = [];

export default function contactReducer (state=INITIAL_STATE, action){
    switch(action.type){
        case FETCH_CONTACT_LIST:
            console.log("HERE")
            console.log(state)
            console.log(action)
            const contacts = action.payload.length > 0 ? action.payload : state;
            // Fetch the contact list from user
            return [...contacts]

        case ADD_CONTACT:
            // With state as an array of objects, add contact's user_id
            // a nickname that the user can choose, and the contact's username

            // Check if contact already exists in state, if so then just return state
            for(let i = 0; i < state.length; i++){
                if(state[i].user_id === action.payload.user_id){
                    return state
                }
            }

            const newContactsCopy = [...state, {
                user_id: action.payload.addedContact.user_id, 
                nickname: action.payload.addedContact.nickname,
                username: action.payload.addedContact.username
            }]
           
            return [...newContactsCopy]

        case DELETE_CONTACT:
            // Filter out the contact by user_id
            const contactsCopy = state.filter(s => (
                s.user_id !== action.payload.deletedContact.user_id
            ));
            
            return [...contactsCopy]

        default:
            return state;
    }
}