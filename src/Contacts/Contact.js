import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useDispatch} from 'react-redux';
import {DELETE_CONTACT} from '../actionTypes';
import "./Contact.css";

const Contact = ({userId, nickname, username}) => {

    const dispatch = useDispatch();
    const removeContact = (user_id) => dispatch({type: DELETE_CONTACT, payload: user_id});

    return (
        <Card className="contact-card">
            <Card.Header as="h5">{nickname}</Card.Header>
            <Card.Body>
                <Card.Title>{username}</Card.Title>
                <Button variant="danger" onClick={() => removeContact(userId)}>X</Button>
            </Card.Body>
        </Card>
    )
}

export default Contact;