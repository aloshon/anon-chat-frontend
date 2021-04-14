import React, {useContext, useEffect} from "react";
import UserContext from "./UserContext";
import GroupChatCard from "./GroupChatCard";
import Container from "react-bootstrap/Container";
import {fetchInvitedGroupChats} from "./actionCreators";
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import {useHistory} from "react-router-dom";

function Homepage(){
    const {user} = useContext(UserContext);
    console.log(user)


    /** 
     * isInviting allow users to click on group chats they created
     * then the page will load the invite component with the 
     * group chat title on top asking who you want to add
     * The guest list should be provided so from there
     * check is guest is already invited or if the guest
     * list exeeds 10 people
     */
    /**  isInviting is an object with 3 keys and values, currently is 
     * set to false but once true it will return a different component.
     * unique_id is the group chat's unique_id to check if user is the creator of group chat,
     * group_chat_id is the group_chat_id that the user is going to add
     * guests into. Title is the title of the group chat
     * 
    */
    const groupChatTitles = useSelector(state => state.titles, shallowEqual);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchInvitedGroupChats(user.id))
    }, [dispatch, user.id]);

    function displayInvitePage(unique_id){
        return history.push(`/invite/${unique_id}`)
    }


    if(groupChatTitles.length === 0) return <h1>No chats yet!</h1>;
    console.log(groupChatTitles);
    if(groupChatTitles){
        return (
            <Container style={{marginBottom: "15px"}}>
                {/* {message.length > 0 && 
                <div className="alert alert-success">
                    {message}
                </div>} */}
                {groupChatTitles.map(gc => (
                    <GroupChatCard 
                    key={gc.unique_id}
                    unique_id={gc.unique_id}
                    title={gc.title}
                    description={gc.description}
                    timestamp={gc.timestamp}
                    creator={gc.creator_id}
                    displayInvitePage={displayInvitePage}
                    />
                ))}
            </Container>
        )
    }

    return <h1>Loading...</h1>
}

export default Homepage;