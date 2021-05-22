const mockData = {
    fetchInvitedGroupChatsResponse: {
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
    },
    fetchGroupChatResponse: {
        groupChat: {
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
    },
    addGroupChatResponse: {
        status: 201,
        groupChat: {
            id: 10, 
            unique_id: "4fe7a7d7-a797-45bd-9dvb-b943f3affc3e",
            title: "test this", 
            description: "test this",
            timestamp: "2021-04-29T20:55:50.829Z",
            creator_id: 1
        }
    },
    deleteGroupChatResponse: {
        deletedGroupChat: {
            id: 1, 
            unique_id: "4fe7a5d5-v797-45bd-9dqb-p943f3affc3e",
            title: "testing", 
            description: "test delete",
            timestamp: "2021-04-29T20:55:50.829Z",
            creator_id: 1
        }
    },
    blockUserResponse: {
        status: 200,
        blockedUser: {
            id: 1,
            username: "user2"
        }
    },
    unblockUserResponse: {
        status: 200,
        unblockedUser: {
            id: 1,
            username: "user2"
        }
    },
    addContactResponse: {
        status: 200,
        addedContact: {
            username: "testusername",
            nickname: "testnickname",
            user_id: 1
        }
    },
    deleteContactResponse: {
        status: 200,
        deletedContact: {
            user_id: 1
        }
    },
    inviteGuestResponse: {
        unique_id: "fbbf1b1r-5bf4-4082-ba21-f168be11c85a",
        username: "user2",
        group_chat_id: 1,
        user_id: 2
    }
}

export default mockData