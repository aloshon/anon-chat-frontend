import React, { useContext } from "react";
import useFields from '../Hooks/useFields';
import "./Forms.css";
import AnonChatApi from "../api";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useDispatch} from 'react-redux';
import {ADD_CONTACT} from '../actionTypes';
import UserContext from "../UserContext";

const AddContactForm = () => {
    const dispatch = useDispatch();
    const {user} = useContext(UserContext)
    const addContact = (data) => dispatch({type: ADD_CONTACT, payload: data});
    const [formData, handleChange, resetFormData] = useFields({
        username: '',
        nickname: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            console.log(formData);
            let userToAdd = await AnonChatApi.checkForUser(formData.username);
            if(formData.username === user.username) return
            if(!userToAdd){
                throw `No user with username: ${formData.username}`
            }
            formData.user_id = userToAdd.id;
            console.log(userToAdd)
            addContact(formData)
            resetFormData();
            return
        } catch(e){
            console.log(`Error adding contact! ${e}`)
            alert(e);
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
                    <Form.Label>Description:</Form.Label>
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