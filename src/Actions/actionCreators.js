import axios from "axios";
import {FETCH_INVITED_CHATS, FETCH_GROUP_CHAT, FETCH_BLOCK_LIST, FETCH_GUEST_LIST, ADD_GROUP_CHAT, ADD_CONTACT, BLOCK_USER, UNBLOCK_USER, DELETE_GROUP_CHAT, DELETE_CONTACT, TOGGLE_DARK_MODE, INVITE_GUEST } from "./actionTypes";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
// This is used for the post request routes that require authorization
// May need to add isAdmin for requests to work
const token = JSON.parse(localStorage.getItem("token"));
const headers = { Authorization: "Bearer " + token};

export function fetchInvitedGroupChats(){
    return async function(dispatch){
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

export function fetchGroupChat(id){
    return async function(dispatch){
        try{
            const {data} = await axios.get(
                `${BASE_URL}/chat/${id}`,
                {headers: headers}
            )
            
            dispatch(gotGroupChat(data.groupChat));
        } catch(e){
            console.log(e);
            alert(`Error getting group chat with id of ${id}`);
        }
    }
}

function gotGroupChat(groupChat){
    return {
        type: FETCH_GROUP_CHAT,
        payload: groupChat
    }
}

export function addGroupChat(newGroupChat){
    return async function(dispatch){
        try{
            // Convert to unviersal time GMT
            let currentUTC = new Date();
            currentUTC.toUTCString();
            newGroupChat.timestamp = currentUTC;
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

// For actions that don't require axios and promises.
export const addContact = (dispatch, data) => dispatch({type: ADD_CONTACT, payload: data});
export const getBlockList = (dispatch, data) => dispatch({type: FETCH_BLOCK_LIST, payload: data});
export const getGuestList = (dispatch, data) => dispatch({type: FETCH_GUEST_LIST, payload: data});
export const removeContact = (dispatch, user_id) => dispatch({type: DELETE_CONTACT, payload: user_id});
export const toggleDarkMode = (dispatch) => dispatch({type: TOGGLE_DARK_MODE});
export const invitedGuest = (dispatch, data) => dispatch({type: INVITE_GUEST, payload: data})