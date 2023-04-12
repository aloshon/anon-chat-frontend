import React, { useContext } from "react";
import useFields from '../Hooks/useFields';
import "./Forms.css";
import AnonChatApi from "../api";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {addContact} from '../Actions/actionCreators';
import UserContext from "../UserContext";

/**
 * AddContactForm component renders form for adding contact
 * to the user's contact list
 */
const AddContactForm = () => {
    const dispatch = useDispatch();
    const {user} = useContext(UserContext);
    const contacts = useSelector(state => state.contacts, shallowEqual);
    const [formData, handleChange, resetFormData] = useFields({
        username: '',
        nickname: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(formData.username === user.username) {
                resetFormData();
                return;
            }
            let userToAdd = await AnonChatApi.checkForUser(formData.username);
            
            if(!userToAdd){
                throw new Error(`No user with username: ${formData.username}`)
            }
            // Check contact list for duplicate username
            // if there is then do not do anything
            let duplicate = false;
            contacts.forEach((c) => {
                if(c.username === formData.username){
                    duplicate = true;
                }
                return
            });
            if(duplicate) {
                resetFormData();
                return;
            }
            formData.user_id = userToAdd.id;
            formData.owner_id = user.id;
            console.log("HERERRE")
            console.log(formData)
          
            dispatch(addContact(formData))
            
            return
        } catch(e){
            console.log(`Error adding contact! ${e}`)
            alert(`Error adding contact! ${e}`);
        }
    }

    return (
        <Container className="createform">
            <h1>New Contact</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control name="username" type="text" value={formData.username} onChange={handleChange} placeholder="Username" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nickname:</Form.Label>
                    <Form.Control name="nickname" type="text" value={formData.nickname} onChange={handleChange} placeholder="Nickname" />
                </Form.Group>
                <Button variant="primary" type="submit" size="md" block>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default AddContactForm;