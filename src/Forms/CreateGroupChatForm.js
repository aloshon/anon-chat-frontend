import React, {useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import useFields from '../Hooks/useFields';
import "./Forms.css";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import UserContext from '../UserContext';
import {useDispatch} from 'react-redux';
import {addGroupChat} from '../Actions/actionCreators';

/**
 * CreateGroupChatForm component renders form for creating group chats
 * Returns loading until user data is loaded
 */
const CreateGroupChatForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {user} = useContext(UserContext);
    const [formData, handleChange] = useFields({
        title: '',
        description: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            formData.creator_id = user.id;
            formData.creatorToGuestList = {id: user.id, username: user.username};
            // allow the dipatched function to finish
            await dispatch(addGroupChat(formData));
            history.push('/');
        } catch(e){
            console.log(`Error creating group chat! ${e}`)
            alert(`Error creating group chat! ${e}`);
        }
    }

    // scroll user to top of page
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    // If user is not logged in or loaded yet, return loading
    while(!user) return <h1>Loading...</h1>;

    return (
        <Container className="createform">
            <h2 className="create-chat-header">Create New anonChat</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control name="title" type="text" maxLength="100" value={formData.title} onChange={handleChange} placeholder="Title" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control name="description" type="text" maxLength="400" value={formData.description} onChange={handleChange} placeholder="Description" />
                </Form.Group>
                <Button variant="primary" type="submit" size="md" block>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default CreateGroupChatForm;