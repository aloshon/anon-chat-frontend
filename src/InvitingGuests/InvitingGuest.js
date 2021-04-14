import React, {useEffect, useContext} from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {useParams, useHistory} from "react-router-dom";
import InviteContact from "./InviteContact";
import UserContext from "../UserContext";
import "./InvitingGuest.css";
import Container from "react-bootstrap/Container";
import {fetchGroupChat} from "../actionCreators";
/* This component uses Redux and useState because the guest list is 
    is not supposed to be constantly changing. Only 10 guests are
    allowed and they cannot be uninvited
*/ 
const InvitingGuest = () => {
    const groupChat = useSelector(state => state.groupChat);
    
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const {user} = useContext(UserContext);

    useEffect(() => {
      try {
        async function getGroupChatOnRender(){
          dispatch(fetchGroupChat(id))
          // await user;
        }
        // Make sure the state is filled with the correct data
        if(!groupChat || groupChat.guests === undefined){
            getGroupChatOnRender()
        }
      } catch(e) {
        if(e[0] === "Not invited in this group chat!"){
          alert(e[0]);
          history.push('/')
        }
        else if(e[0]){

        }
      }
    }, [dispatch, id, user]);


    const contacts = useSelector(state => state.contacts, shallowEqual);
    if(!groupChat || groupChat.guests === undefined){
        return <h1>Loading guest list...</h1>
    }

    // wait for user data to be loaded before attempting to run this code
    if(user){
      if(groupChat.creator_id !== user.id){
        alert("Not the creator of this group chat!");
        history.push('/')
      }
    }


    // The Contact component should have an invite button, 
    // disabled and text invited for those contacts already on guest list
    return (
      <Container className="inviting-list">
      <h1 className="my-3 inviting-title">Invite Guests to<br/>{groupChat.title}</h1>

    
      {contacts.length !== 0
        ? (
          <Container>
            {contacts.map(c =>
              <InviteContact 
              key={c.user_id}
              unique_id={id}
              user_id={c.user_id}
              group_chat_id={groupChat.id}
              nickname={c.nickname}
              username={c.username}
              guestList={groupChat.guests}
              />
            )}
          </Container>
          
        )
        : <h6>No contacts yet...</h6>
      }
      </Container>
    );
}

export default InvitingGuest;