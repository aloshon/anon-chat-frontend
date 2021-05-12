import { TOGGLE_DARK_MODE } from '../Actions/actionTypes.js'
import {LIGHT_MODE, DARK_MODE} from '../styles.js';
const INITIAL_STATE = {isDarkMode: false, ...LIGHT_MODE};

export default function darkModeReducer (state=INITIAL_STATE, action){
    switch(action.type){
        case TOGGLE_DARK_MODE:
            // Toggle the app style bewteen light mode and dark mode
            // isDarkMode is set to the opposite of what state originally was
            const isDarkMode = !state.isDarkMode;
            const colorPallet = isDarkMode ? DARK_MODE : LIGHT_MODE;
            return { ...state, isDarkMode, ...colorPallet };

        default:
            return state;
    }
}