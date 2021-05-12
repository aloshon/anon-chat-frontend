import { unblockUser } from "../Actions/actionCreators";
import * as types from "../Actions/actionTypes";
import rootReducer from "./rootReducer";

const state = {
    blockList: [], 
    contacts: [], 
    darkMode: expect.any(Object), 
    groupChat: {}, 
    titles: []
};

describe("blockListReducer", () => {
    it("should return initial state", () => {
        expect(rootReducer(undefined, {})).toEqual(state);
    });

    it("should fetch the block list", () => {
        expect(
            rootReducer({blockList: []}, {
                type: types.FETCH_BLOCK_LIST,
                payload: []
            })
        ).toEqual(state)
    });

    it("should block user", () => {
        const blocked = {
            user_id: 1,
            username: "user1"
        };

        state.blockList = [blocked]

        expect(
            rootReducer({blockList: []}, {
                type: types.BLOCK_USER,
                payload: {blocked} 
            })
        ).toEqual(state)
    });

    it("should unblock user", () => {
        const unblocked = {
            user_id: 1,
            blocked_username: "user1",
            nickname: "test1"
        };

        state.blockList = [];
        // preload the state with a blocked user
        expect(
            rootReducer({blockList: [unblocked]}, {
                type: types.UNBLOCK_USER,
                payload: {unblocked}
            })
        ).toEqual(state)
    });
});


