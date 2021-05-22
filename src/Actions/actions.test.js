import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./actionCreators";
import * as types from "./actionTypes";
import mockData from "./testMockData";
import moxios from 'moxios';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


beforeEach(() => moxios.install());
afterEach(() => moxios.uninstall());


describe("async actions", () => {
    
    test("fetchInvitedGroupChats", async () => {
        const {fetchInvitedGroupChatsResponse} = mockData;
        moxios.stubRequest(`${BASE_URL}/chat/`, {
            status: 200,
            response: fetchInvitedGroupChatsResponse
        });

        const expectedAction = [{
            type: types.FETCH_INVITED_CHATS,
            payload: {
                status: 200,
                groupChats: [{
                    id: 1, 
                    unique_id: "e3be16b1-b1fk-4d86-47c8-03b80bab56d3",
                    title: "test", 
                    description: "test",
                    timestamp: "2021-04-29T20:55:50.829Z",
                    creator_id: 1
                },
                {
                    id: 2, 
                    unique_id: "30a225b0-13e7-48e5-8e57-af40f9105489",
                    title: "testing", 
                    description: "testing",
                    timestamp: "2021-05-29T20:45:32.829Z",
                    creator_id: 2
                }]
            }
        }]
        
        const store = mockStore([]);

        await store.dispatch(actions.fetchInvitedGroupChats()).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    test("fetchGroupChat", async () => {
        const {fetchGroupChatResponse} = mockData;
        moxios.stubRequest(`${BASE_URL}/chat/e3be16b1-b1fk-4d86-47c8-03b80bab56d3`, {
            status: 200,
            response: fetchGroupChatResponse
        });

        const expectedAction = [{
            type: types.FETCH_GROUP_CHAT,
            payload: {
                    id: 1, 
                    unique_id: "e3be16b1-b1fk-4d86-47c8-03b80bab56d3",
                    title: "test", 
                    description: "test",
                    timestamp: "2021-04-29T20:55:50.829Z",
                    creator_id: 1,
                    guests: [{
                        username: "user1",
                        user_id: 1
                    }]
                }
        }]

        const test_unique_id = "e3be16b1-b1fk-4d86-47c8-03b80bab56d3"
        const store = mockStore({});

        await store.dispatch(actions.fetchGroupChat(test_unique_id)).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    test("addGroupChat", async () => {
        const {addGroupChatResponse} = mockData;
        moxios.stubRequest(`${BASE_URL}/chat/`, {
            status: 201,
            response: addGroupChatResponse
        });

        const newGroupChat = {
            title: "test this",
            description: "test this",
            creator_id: 1,
            creatorToGuestList: {user_id: 1, username: "user1"}
        };

        const expectedAction = [{
            type: types.ADD_GROUP_CHAT,
            payload: {
                    id: 10, 
                    unique_id: "4fe7a7d7-a797-45bd-9dvb-b943f3affc3e",
                    title: "test this", 
                    description: "test this",
                    timestamp: "2021-04-29T20:55:50.829Z",
                    creator_id: 1
                }
        }];

        const store = mockStore({});

        await store.dispatch(actions.addGroupChat(newGroupChat)).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    test("deleteGroupChat", async () => {
        const {deleteGroupChatResponse} = mockData;
        moxios.stubRequest(`${BASE_URL}/chat/4fe7a5d5-v797-45bd-9dqb-p943f3affc3e`, {
            status: 200,
            response: deleteGroupChatResponse
        });

        const expectedAction = [{
            type: types.DELETE_GROUP_CHAT,
            payload: {
                id: 1, 
                unique_id: "4fe7a5d5-v797-45bd-9dqb-p943f3affc3e",
                title: "testing", 
                description: "test delete",
                timestamp: "2021-04-29T20:55:50.829Z",
                creator_id: 1
            }
        }];

        const store = mockStore({});

        await store.dispatch(actions.deleteGroupChat("4fe7a5d5-v797-45bd-9dqb-p943f3affc3e")).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    test("blockUser", async () => {
        const {blockUserResponse} = mockData;
        moxios.stubRequest(`${BASE_URL}/block/user2`, {
            status: 200,
            response: blockUserResponse
        });
        const expectedAction = [{
            type: types.BLOCK_USER,
            payload: {
                blockedUser: {
                    id: 1, 
                    username: "user2"
                },
                status: 200
            }
        }]

        const store = mockStore([]);

        await store.dispatch(actions.blockUser("user2")).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    test("unblockUser", async () => {
        const {unblockUserResponse} = mockData;
        moxios.stubRequest(`${BASE_URL}/block/user2`, {
            status: 200,
            response: unblockUserResponse
        });
        const expectedAction = [{
            type: types.UNBLOCK_USER,
            payload: {
                unblockedUser: {
                    id: 1, 
                    username: "user2"
                },
                status: 200
            }
        }]

        const store = mockStore([]);

        await store.dispatch(actions.unblockUser("user2")).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });


    test("addContact", async () => {
        const {addContactResponse} = mockData;
        moxios.stubRequest(`${BASE_URL}/contact/`, {
            status: 200,
            response: addContactResponse
        });
        const expectedAction = [{
            type: types.ADD_CONTACT,
            payload: {
                addedContact: {
                    username: "testusername",
                    nickname: "testnickname",
                    user_id: 1
                },
                status: 200
            }
        }]

        const store = mockStore([]);

        const newContact = {
            username: "testusername",
            nickname: "testnickname",
            owner_id: 2,
            user_id: 1
        }

        await store.dispatch(actions.addContact(newContact)).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    test("deleteContact", async () => {
        const {deleteContactResponse} = mockData;
        moxios.stubRequest(`${BASE_URL}/contact/1`, {
            status: 200,
            response: deleteContactResponse
        });
        const expectedAction = [{
            type: types.DELETE_CONTACT,
            payload: {
                deletedContact: {
                    user_id: 1
                },
                status: 200
            }
        }]

        const store = mockStore([]);
        const contact_id = 1

        await store.dispatch(actions.deleteContact(contact_id)).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    test("inviteGuest", async () => {
        const {inviteGuestResponse} = mockData;
        moxios.stubRequest(`${BASE_URL}/guests/fbbf1b1r-5bf4-4082-ba21-f168be11c85a`, {
            status: 200,
            response: inviteGuestResponse
        });
        const expectedAction = [{
            type: types.INVITE_GUEST,
            payload: {
                user_id: 2,
                username: "user2",
                group_chat_id: 1,
                unique_id: "fbbf1b1r-5bf4-4082-ba21-f168be11c85a"
            }
        }];

        const guest = {
            user_id: 1,
            username: "user2",
            group_chat_id: 1,
            unique_id: "fbbf1b1r-5bf4-4082-ba21-f168be11c85a"
        }

        const store = mockStore({});

        await store.dispatch(actions.inviteGuest(guest)).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });
});


describe("non-async actions", () => {

    test("getBlockList", () => {
        const expectedAction = {
            type: types.FETCH_BLOCK_LIST,
            payload: []
        };

        const store = mockStore([]);

        expect(actions.getBlockList(store.dispatch, [])).toEqual(expectedAction);
    });

    test("toggleDarkMode", () => {
        const expectedAction = {
            type: types.TOGGLE_DARK_MODE
        };

        const store = mockStore({});

        expect(actions.toggleDarkMode(store.dispatch)).toEqual(expectedAction);
    });
});