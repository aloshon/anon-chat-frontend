import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useSelector, useDispatch} from 'react-redux';
import {removeContact} from '../Actions/actionCreators';
import "./Contact.css";

const Contact = ({userId, nickname, username}) => {
    const darkMode = useSelector(state => state.darkMode);
    const dispatch = useDispatch();

    return (
        <Card className="contact-card" style={{backgroundColor: darkMode.card}}>
            <Card.Body>
                <Card.Title>{nickname}</Card.Title>
                <small><Card.Text>Username: {username}</Card.Text></small>
                <Button variant="danger" onClick={() => removeContact(dispatch, userId)}>X</Button>
            </Card.Body>
        </Card>
    )
}

export default Contact;