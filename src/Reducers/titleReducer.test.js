import * as types from "../Actions/actionTypes";
import rootReducer from "./rootReducer";
const state = {
    blockList: [], 
    contacts: [], 
    darkMode: expect.any(Object), 
    groupChat: {}, 
    titles: []
};


describe("titleReducer", () => {
    it("should return initial state", () => {
        expect(rootReducer(undefined, {})).toEqual(state);
    });

    it("should fetch the title list", () => {
        const groupChats = [{
            unique_id: "04ffa446-5297-476e-8d24-fb8a0ac801c7",
            title: "test",
            descrption: "test",
            timestamp: "2021-04-24T18:48:33.872Z",
            creator_id: 1
        }]
        state.titles = groupChats;

        expect(
            rootReducer({titles: []}, {
                type: types.FETCH_INVITED_CHATS,
                payload: {groupChats}
            })
        ).toEqual(state)
    });
});