import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./InviteContact.css";
import {useSelector, useDispatch} from "react-redux";
import {inviteGuest} from "../Actions/actionCreators";

/**
 * InviteContact displays nickname and username 
 * Also holds data to invite contact to guest list
 * User can click on button to invite guest but they cannot be uninvited
 */
const InviteContact = ({unique_id, user_id, group_chat_id, nickname, username, guestList}) => {
    const [invited, setInvited] = useState(false);
    const darkMode = useSelector(state => state.darkMode);
    const dispatch = useDispatch();
    useEffect(() => {
        if(guestList){
            guestList.forEach(g => {
                if(g.user_id === user_id){
                    // user is already on guest list
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
                    dispatch(inviteGuest({unique_id, user_id, group_chat_id, username}));
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