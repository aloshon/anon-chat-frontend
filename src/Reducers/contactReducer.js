import {ADD_CONTACT, DELETE_CONTACT} from '../actionTypes.js'
const INITIAL_STATE = [];

export default function contactReducer (state=INITIAL_STATE, action){
    switch(action.type){
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
                user_id: action.payload.user_id, 
                nickname: action.payload.nickname,
                username: action.payload.username
            }]
           
            return [...newContactsCopy]

        case DELETE_CONTACT:
            const contactsCopy = state.filter(s => (
                s.user_id !== action.payload
            ))
            return [...contactsCopy]

        // case "INVITE_GUEST":
        //     state.contacts[action.payload.user]

        default:
            return state;
    }
}