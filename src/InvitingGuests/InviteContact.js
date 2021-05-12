import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AnonChatApi from '../api';
import "./InviteContact.css";
import {useSelector, useDispatch} from "react-redux";
import {invitedGuest} from "../Actions/actionCreators";

const InviteContact = ({unique_id, user_id, group_chat_id, nickname, username, guestList}) => {
    const [invited, setInvited] = useState(false);
    const darkMode = useSelector(state => state.darkMode);
    const dispatch = useDispatch();
    useEffect(() => {
        if(guestList){
            guestList.forEach(g => {
                if(g.user_id === user_id){
                    setInvited(true)
                } 
            })
            // only allow 10 users on the list
            if(guestList.length >= 10){
                setInvited(true)
            }
        }
    }, [user_id, guestList]);

    const handleInvite = async (evt) => {
        evt.preventDefault();
        try{
            if(window.confirm("Invite guest? Cannot be uninvited!")){
                try{
                    const res = await AnonChatApi.inviteGuest({unique_id, user_id, group_chat_id, username});
                    res.unique_id = unique_id;
                    invitedGuest(dispatch, res);
                } catch(e){
                    alert(`Cannot invite guest at this time. Please try again later.  ${e}`)
                }
            } else{
                return
            }
        } catch(e){
            alert(`ERROR INVITING GUEST: ${e}`)
        }
    }
    
    if(guestList){
        return (
            <Card className="invite-contact-card"
                style={{backgroundColor: darkMode.card}}>
                <Card.Body>
                    <Card.Title>{nickname}</Card.Title>
                    <Card.Text>Username: {username}</Card.Text>
                    {invited ? <Button variant="success" disabled={true}>Invited</Button> 
                    : <Button variant="success" onClick={handleInvite}>Invite!</Button>}
                </Card.Body>
            </Card>
        )
    }
    return <h1>Loading...</h1>
}

export default InviteContact;