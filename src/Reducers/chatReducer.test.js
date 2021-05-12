import * as types from "../Actions/actionTypes";
import rootReducer from "./rootReducer";

const state = {
    blockList: [], 
    contacts: [], 
    darkMode: expect.any(Object), 
    groupChat: {}, 
    titles: []
};


describe("chatReducer", () => {
    it("should return initial state", () => {
        expect(rootReducer(undefined, {})).toEqual(state);
    });

    it("should add group chat", () => {
        const newGroupChat = {
            id: 1,
            unique_id: "fbbf1b1r-5bf4-4082-ba21-f168be11c85a",
            title: "test",
            description: "test",
            creator_id: 1,
            guests: [{user_id: 1, username:"user1", group_chat_id:1}]
        };

        state.groupChat["fbbf1b1r-5bf4-4082-ba21-f168be11c85a"] = newGroupChat;

        expect(
            rootReducer({groupChat: {}}, {
                type: types.ADD_GROUP_CHAT,
                payload: newGroupChat
            })
        ).toEqual(state);
    });

    it("should fetch the group chat", () => {
        expect(
            rootReducer({groupChat: {}}, {
                type: types.FETCH_GROUP_CHAT,
                payload: {
                    id: 1,
                    unique_id: "fbbf1b1r-5bf4-4082-ba21-f168be11c85a",
                    title: "test",
                    description: "test",
                    creator_id: 1,
                    guests: [{user_id: 1, username:"user1", group_chat_id:1}]
                }
            })
        ).toEqual(state)
    });

    it("should add guest to group chat", () => {
        const groupChat = {
            "fbbf1b1r-5bf4-4082-ba21-f168be11c85a": {
                id: 1,
                unique_id: "fbbf1b1r-5bf4-4082-ba21-f168be11c85a",
                title: "test",
                description: "test",
                creator_id: 1,
                guests: [
                    {user_id: 1, username:"user1", group_chat_id:1},
                ]
            }
        }

        state.groupChat["fbbf1b1r-5bf4-4082-ba21-f168be11c85a"].guests.push({user_id:2, username:"user2", group_chat_id: 1})

        expect(
            rootReducer({groupChat}, {
                type: types.INVITE_GUEST,
                payload: {
                    user_id: 2,
                    username: "user2",
                    group_chat_id: 1,
                    unique_id: "fbbf1b1r-5bf4-4082-ba21-f168be11c85a"
                }
            })
        ).toEqual(state)
    });

    it("should delete group chat", () => {
        const removedGroupChat = {
            id: 1,
            unique_id: "fbbf1b1r-5bf4-4082-ba21-f168be11c85a",
            title: "test",
            description: "test",
            creator_id: 1,
            guests: [
                {user_id: 1, username:"user1", group_chat_id:1},
                {user_id: 2, username:"user2", group_chat_id:1}
            ]
        };

        state.groupChat = {}

        expect(
            rootReducer({groupChat: {}}, {
                type: types.DELETE_GROUP_CHAT,
                payload: removedGroupChat
            })
        ).toEqual(state)
    });
});