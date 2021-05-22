import React, {useEffect} from "react";
import GroupChatCard from "./GroupChatCard";
import Container from "react-bootstrap/Container";
import {fetchInvitedGroupChats} from "./Actions/actionCreators";
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";


/** 
* Homepage renders all group chats that the user is invited to.
* User has option to click on edit button if the user created the group chat
* From there user can invite other users to their group chats
*/
function Homepage(){
    const groupChatTitles = useSelector(state => state.titles);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchInvitedGroupChats());
    }, [dispatch]);

    function displayInvitePage(unique_id){
        return history.push(`/invite/${unique_id}`)
    }

    if(groupChatTitles.length === 0) return <h1>No chats yet!</h1>;
    
        return (
            <Container style={{marginBottom: "15px"}}>
                
                {groupChatTitles.map(gc => (
                    <GroupChatCard 
                    key={gc.unique_id}
                    unique_id={gc.unique_id}
                    title={gc.title}
                    description={gc.description}
                    timestamp={gc.timestamp}
                    creator_id={gc.creator_id}
                    displayInvitePage={displayInvitePage}
                    />
                ))}
            </Container> || <h1>Loading...</h1>
        ) 
}

export default Homepage;