import * as types from "../Actions/actionTypes";
import rootReducer from "./rootReducer";
const state = {
    blockList: [], 
    contacts: [], 
    darkMode: expect.any(Object), 
    groupChat: {}, 
    titles: []
};


describe("darkModeReducer", () => {
    it("should return initial state", () => {
        expect(rootReducer(undefined, {})).toEqual(state);
    });

    it("should toggle the dark mode state", () => {
        // state is default to light mode
        expect(rootReducer(undefined, {}).darkMode.isDarkMode).toEqual(false);
        // change dark mode to true and expect the changes to occur
        state.darkMode = {
            background: "#3d3d3d",
            card: "#4499E1",
            isDarkMode: true,
            nav: "dark",
            received: "#777777",
            text: "#EEEEEE",
        }

        expect(
            rootReducer({darkMode: {}}, {
                type: types.TOGGLE_DARK_MODE
            })
        ).toEqual(state);
    });
});