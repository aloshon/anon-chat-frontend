import React, {useEffect, useContext} from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Contact from "./Contact";
import AddContactForm from "../Forms/AddContactForm";
import Container from "react-bootstrap/Container";
import {getContactList} from "../Actions/actionCreators";
import UserContext from "../UserContext";

/**
 * ContactList component displays list of contacts
 * User needs to be logged in
 */
const ContactList = () => {
    const contacts = useSelector(state => state.contacts, shallowEqual);
    const dispatch = useDispatch();
    const {user} = useContext(UserContext);

    // Get the user's contactList on render after user is defined
    useEffect(() =>{
      if(user && contacts.length === 0){
          getContactList(dispatch, user.contactList);
      }
  }, [user, dispatch, contacts]);

  // If user is not logged in or loaded yet, return loading
  while(!user) return <h1>Loading...</h1>;

    // marginBottom style is to keep the last contact
    // from touching the very bottom of the screen
    return (
        <>
      <h1 className="my-3">Contact List</h1>
      <AddContactForm />
      {contacts.length !== 0
        ? (
          <Container style={{ marginBottom: '60px' }}>
              {contacts.map(c =>
                <Contact 
                key={c.user_id}
                user_id={c.user_id}
                nickname={c.nickname}
                username={c.username}
                />
              )}
          </Container>
        )
        : <h6>No contacts yet...</h6>
      }
    </>
    );
}

export default ContactList;