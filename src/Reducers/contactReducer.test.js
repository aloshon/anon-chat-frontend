import * as types from "../Actions/actionTypes";
import rootReducer from "./rootReducer";

const state = {
    blockList: [], 
    contacts: [], 
    darkMode: expect.any(Object), 
    groupChat: {}, 
    titles: []
};


describe("contactReducer", () => {
    it("should return initial state", () => {
        expect(rootReducer(undefined, {})).toEqual(state);
    });

    it("should add contact", () => {
        const newContact = {
            user_id: 1,
            username: "user1",
            nickname: "test1"
        };

        state.contacts.push(newContact);

        expect(
            rootReducer({contacts: []}, {
                type: types.ADD_CONTACT,
                payload: newContact
            })
        ).toEqual(state);
    });

    it("should delete contact", () => {
        const removedContact = {
            user_id: 1,
            username: "user1",
            nickname: "test1"
        };

        state.contacts.pop()

        expect(
            rootReducer({contacts: []}, {
                type: types.DELETE_CONTACT,
                payload: removedContact
            })
        ).toEqual(state)
    });
});