import React, {useEffect, useContext} from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {useParams, useHistory} from "react-router-dom";
import InviteContact from "./InviteContact";
import UserContext from "../UserContext";
import "./EditGroupChat.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {fetchGroupChat, deleteGroupChat, getContactList} from "../Actions/actionCreators";
/* EditGroupChat renders list of contacts and depending on if the user
    is on the guest list, the button will display Invite! or Invited.
  User can also delete the group chats they created if they choose so
*/ 
const EditGroupChat = () => {
    const {id} = useParams();
    const groupChat = useSelector(state => state.groupChat[id]);
    const dispatch = useDispatch();
    const history = useHistory();
    const {user} = useContext(UserContext);

    useEffect(() => {
      try {
        async function getGroupChatOnRender(){
            dispatch(fetchGroupChat(id));
        }
        // Make sure the state is filled
        if(!groupChat){
            getGroupChatOnRender()
        }
      } catch(e) {
        alert(e[0]);
        // Kick out uninvited guests
        if(e[0] === "Not invited in this group chat!") history.push('/');
      }
    }, [dispatch, id, user, groupChat, history]);

  const handleDelete = async () => {
    if(window.confirm("Delete group chat?")){
      await dispatch(deleteGroupChat(id));
      history.push('/');
    } else{
        return
    }
  }

  const contacts = useSelector(state => state.contacts, shallowEqual);

  // Get the user's contactList on render after user is defined
  useEffect(() =>{
    if(user){
        getContactList(dispatch, user.contactList);
    }
  }, [user, dispatch]);

  // scroll user to top of page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

    // wait for user and groupChat data to be loaded before attempting to run 
    // the rest of the code
    if(!groupChat || !user){
        return <h1>Loading guest list...</h1>
    }

    if(groupChat.creator_id !== user.id){
      alert("Not the creator of this group chat!");
      history.push('/');
    }

    const {guests} = groupChat;
    // If user is not logged in or loaded yet, return loading
    while(!user) return <h1>Loading...</h1>;

    // The Contact component should have an invite button
    // disabled and text invited for those contacts already on guest list
    return (
      <Container className="inviting-list">
      <h1 className="my-3 inviting-title">Invite Guests to:<br/>{groupChat.title}</h1>
      <Container style={{marginBottom: "45px"}}>
      <Button variant="secondary" size="sm"
        style={{ float: "left" }}
        onClick={() => history.push('/')}>
          Back
      </Button>
      <p style={{ float: "right" }}>
          {guests.length}/10
      </p>
      </Container>
      <br/>
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
              guestList={guests}
              />
            )}
          </Container>
          
        )
        : <h6>No contacts yet...</h6>
      }
      <Button
      style={{ float: "left", marginTop: "30px" }}
      variant="danger" 
      onClick={handleDelete}>
        Delete Group Chat
      </Button>
      </Container>
    );
}

export default EditGroupChat;