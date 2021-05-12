import {BLOCK_USER, UNBLOCK_USER, FETCH_BLOCK_LIST} from '../Actions/actionTypes.js'
const INITIAL_STATE = [];

export default function blockListReducer (state=INITIAL_STATE, action){
    switch(action.type){
        case FETCH_BLOCK_LIST:
            return [...action.payload]

        case BLOCK_USER:
            // With state as an array of objects, add user's username
            // to the block list
            // Check if username already exists in state, if so then just return state
            for(let i = 0; i < state.length; i++){
                if(state[i].blocked_username === action.payload.blocked.blocked_username){
                    return state
                }
            }
            const newBlockList = [...state, {...action.payload.blocked}]
           
            return newBlockList

        case UNBLOCK_USER:
            const blockListCopy = state.filter(s => (
                s.blocked_username !== action.payload.unblocked.blocked_username
            ));

            return [...blockListCopy];

        default:
            return state;
    }
}