import axios from "axios";
import {FETCH_INVITED_CHATS, FETCH_GROUP_CHAT, FETCH_BLOCK_LIST, FETCH_GUEST_LIST, ADD_GROUP_CHAT, ADD_CONTACT, BLOCK_USER, UNBLOCK_USER, DELETE_GROUP_CHAT, DELETE_CONTACT, TOGGLE_DARK_MODE, INVITE_GUEST, FETCH_CONTACT_LIST } from "./actionTypes";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
// This is used for the post request routes that require authorization
const token = localStorage.getItem("token");
console.log(token);
const headers = { Authorization: `Bearer ${token}` };

/** 
 * fetchInvitedGroupChats gets user data from token and fetches the group chats
 * they are invited in.
 * token and headers are redefined here so that when a user logs out and back
 *  in as another user, it will update the token
 *  alert any errors
*/
export function fetchInvitedGroupChats(){
    return async function(dispatch){
        const token = localStorage.getItem("token");
        const headers = { Authorization: "Bearer " + token};

        try{
            const {data} = await axios.get(
                `${BASE_URL}/chat/`,
                {headers: headers});
            dispatch(gotInvitedChats(data));
        } catch(e){
            console.log(e);
            alert(`Error getting invited group chats! ${e}`)
        }
    }
}

function gotInvitedChats(groupChats){
    return {
        type: FETCH_INVITED_CHATS,
        payload: groupChats
    }
}

/** 
 * fetchGroupChat gets group chat data using the unique_id from params
 *  alert any errors
*/
export function fetchGroupChat(unique_id){
    return async function(dispatch){
        try{
            const {data} = await axios.get(
                `${BASE_URL}/chat/${unique_id}`,
                {headers: headers}
            )
            
            dispatch(gotGroupChat(data.groupChat));
        } catch(e){
            console.log(e);
            alert(`Error getting group chat with id of ${unique_id}`);
        }
    }
}

function gotGroupChat(groupChat){
    return {
        type: FETCH_GROUP_CHAT,
        payload: groupChat
    }
}

/** 
 * addGroupChat posts new group chat and adds GMT timestamp
 * newGroupChat must be {
 *  title,
 *  description,
 *  creator_id,
 *  creatorToGuestList: {id, username}
 * }
 *  alert any errors
*/
export function addGroupChat(newGroupChat){
    return async function(dispatch){
        try{
            const {data} = await axios.post(
                `${BASE_URL}/chat/`,
                newGroupChat,
                {headers: headers}
            )

            dispatch(addedGroupChat(data.groupChat));
        } catch(e){
            console.log(e);
            alert(`Error adding group chat`);
        }
    }
}

function addedGroupChat(groupChat){
    return {
        type: ADD_GROUP_CHAT,
        payload: groupChat
    }
}

/** 
 * deleteGroupChat deletes group chat using unique_id
 *  alert any errors
*/
export function deleteGroupChat(unique_id){
    return async function(dispatch){
        try{
            const {data} = await axios.delete(
                `${BASE_URL}/chat/${unique_id}`,
                {headers: headers}
            )
            dispatch(deletedGroupChat(data.deletedGroupChat));
        } catch(e){
            console.log(e);
            alert(`Error deleting group chat ${e}`);
        }
    }
}

function deletedGroupChat(groupChat){
    return {
        type: DELETE_GROUP_CHAT,
        payload: groupChat
    }
}

/** 
 * blockUser adds user to block list in database
 * userToBlock is {username}
 *  alert any errors
*/
export function blockUser(userToBlock){
    return async function(dispatch){
        try{
            const {data} = await axios.post(
                `${BASE_URL}/block/${userToBlock}`,
                {data: {}},
                {headers: headers}
            )

            dispatch(blockedUser(data));
        } catch(e){
            console.log(e);
            alert(`Error blocking user! Please try again later! ${e}`);
        }
    }
}

function blockedUser(data){
    return {
        type: BLOCK_USER,
        payload: data
    }
}

/** 
 * unblockUser unblocks user by username
 * userToUnblock is {username}
 *  alert any errors
*/
export function unblockUser(userToUnblock){
    return async function(dispatch){
        try{
            const {data} = await axios.delete(
                `${BASE_URL}/block/${userToUnblock}`,
                {headers: headers}
            )

            dispatch(unblockedUser(data));
        } catch(e){
            console.log(e);
            alert(`Error unblocking user! Please try again later! ${e}`);
        }
    }
}

function unblockedUser(data){
    return {
        type: UNBLOCK_USER,
        payload: data
    }
}

/** 
 * addContact adds contact from contact list
 * contact must be {
 *  username,
 *  nickname,
 *  owner_id,
 *  user_id
 * }
 *  alert any errors
*/
export function addContact(contact){
    return async function(dispatch){
        try{
            const {data} = await axios.post(
                `${BASE_URL}/contact/`,
                contact,
                {headers: headers}
            )

            dispatch(addedContact(data));
        } catch(e){
            console.log(e);
            alert(`Error adding contact! Please try again later! ${e}`);
        }
    }
}

function addedContact(data){
    return {
        type: ADD_CONTACT,
        payload: data
    }
}

/** 
 * deleteContact removes contact from contact list
 *  alert any errors
*/
export function deleteContact(contact_id){
    return async function(dispatch){
        try{
            const {data} = await axios.delete(
                `${BASE_URL}/contact/${contact_id}`,
                {headers: headers}
            )

            dispatch(deletedContact(data));
        } catch(e){
            console.log(e);
            alert(`Error deleting contact! Please try again later! ${e}`);
        }
    }
}

function deletedContact(data){
    return {
        type: DELETE_CONTACT,
        payload: data
    }
}

/** 
 * inviteGuest posts the guest data to database and adds guest to guest list
 * Add unique_id to data response to locate group chat in state
 * guest should be: {
 *  unique_id,
 *  username,
 *  user_id,
 *  group_chat_id
 * }
*/
export function inviteGuest(guest){
    return async function(dispatch){
        try{
            const {data} = await axios.post(
                `${BASE_URL}/guests/${guest.unique_id}`,
                guest,
                {headers: headers}
            )
            data.unique_id = guest.unique_id
            dispatch(invitedGuest(data));
        } catch(e){
            console.log(e);
            alert(`Error inviting guest! Try again later! ${e}`)
        }
    }
}

function invitedGuest(data){
    return {
        type: INVITE_GUEST, 
        payload: data
    }
}

// For actions that don't require axios and promises.

/** 
 * getBlockList gets user's block list, should be loaded when user is logged in
 * data should be blockList: [{blockedUser}, ...]
*/
export const getBlockList = (dispatch, data) => dispatch({type: FETCH_BLOCK_LIST, payload: data});
/** 
 * getContactList gets user's contact list, should be loaded when user is logged in
 * data should be contactList: [{contact}, ...]
*/
export const getContactList = (dispatch, data) => dispatch({type: FETCH_CONTACT_LIST, payload: data});
/** 
 * getGuestList gets the group chat'a guest list, 
 * should be loaded when group chat data is fetched
 * data should be guestList: [{guest}, ...]
*/
export const getGuestList = (dispatch, data) => dispatch({type: FETCH_GUEST_LIST, payload: data});
/** 
 * toggleDarkMode switches theme between light mode and dark mode
 * no data needed
*/
export const toggleDarkMode = (dispatch) => dispatch({type: TOGGLE_DARK_MODE});
