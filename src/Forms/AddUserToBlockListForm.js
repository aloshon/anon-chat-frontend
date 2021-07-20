import React, { useContext } from "react";
import useFields from '../Hooks/useFields';
import "./Forms.css";
import AnonChatApi from "../api";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useDispatch} from 'react-redux';
import UserContext from "../UserContext";
import {blockUser} from "../Actions/actionCreators";

/**
 * AddUserToBlockListForm component renders form for blocking users
 * by username
 * If user is already blocked, send an alert
 */
const AddUserToBlockListForm = ({blockList}) => {
    const dispatch = useDispatch();
    const {user} = useContext(UserContext)
    const [formData, handleChange, resetFormData] = useFields({
        username: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            // Make sure user is not blocking themselves, someone twice, 
            // or if the other user blocked them
            if(formData.username === user.username) return

            let userToBlock = await AnonChatApi.checkForUser(formData.username);
            if(!userToBlock){
                throw `No user with username: ${formData.username}`
            }

            let alreadyBlocked = blockList.find(u => u.blocked_username === formData.username);
            if(alreadyBlocked) throw `User already blocked ${formData.username}`;

            dispatch(blockUser(formData.username));
            resetFormData();
            return
        } catch(e){
            console.error(`Error blocking user! ${e}`)
            alert(`Error blocking user! ${e}`);
        }
    }
    return (
        <Container>
            <h3 style={{ textAlign: "left", margin: "15px"}}>Block User</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control name="username" type="text" value={formData.username} onChange={handleChange} placeholder="Username" />
                </Form.Group>
                <Button variant="primary" type="submit" size="md" block>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default AddUserToBlockListForm;