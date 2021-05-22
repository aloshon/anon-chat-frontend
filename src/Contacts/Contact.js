import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useSelector, useDispatch} from 'react-redux';
import {deleteContact} from '../Actions/actionCreators';
import "./Contact.css";

/**
 * Contact component displays username and nickname 
 * while providing user_id for other actions 
 * like inviting to group chat
 */
const Contact = ({user_id, nickname, username}) => {
    const darkMode = useSelector(state => state.darkMode);
    const dispatch = useDispatch();

    return (
        <Card className="contact-card" style={{backgroundColor: darkMode.card}}>
            <Card.Body>
                <Card.Title>{nickname}</Card.Title>
                <small><Card.Text>Username: {username}</Card.Text></small>
                <Button variant="danger" onClick={() => dispatch(deleteContact(user_id))}>X</Button>
            </Card.Body>
        </Card>
    )
}

export default Contact;