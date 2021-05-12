import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import Contact from "./Contact";
import AddContactForm from "../Forms/AddContactForm";
import Container from "react-bootstrap/Container";

const ContactsList = () => {
    const contacts = useSelector(state => state.contacts, shallowEqual);

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
                userId={c.user_id}
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

export default ContactsList;