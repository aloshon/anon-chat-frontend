import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AnonChatApi from '../api';
import "./InviteContact.css";

const InviteContact = ({unique_id, user_id, group_chat_id, nickname, username, guestList}) => {
    const [invited, setInvited] = useState(false);
    
    useEffect(() => {
        if(guestList){
            guestList.forEach(g => {
                if(g.user_id === user_id){
                    console.log(g)
                    setInvited(true)
                } 
            })
        }
    }, [user_id, guestList]);

    const handleInvite = async (evt) => {
        evt.preventDefault();
        try{
            // response will be boolean
            const response = await AnonChatApi.inviteGuest({unique_id, user_id, group_chat_id, username});
            if(response){
                evt.target.disabled = true;
                evt.target.innerText = "Invited";
            } else{
                alert("Cannot invite guest at this time. Please try again later.")
            }
        } catch(e){
            alert(`ERROR INVITING GUEST: ${e}`)
        }
    }

    if(guestList){
        return (
            <Card className="invite-contact-card">
                <Card.Header as="h5">{nickname}</Card.Header>
                <Card.Body>
                    <h5 style={{float: "left"}}>{username}</h5>
                    {invited ? <Button disabled={true}>Invited</Button> 
                    : <Button onClick={handleInvite}>Invite!</Button>}
                </Card.Body>
            </Card>
        )
    }
    return <h1>Loading...</h1>
}

export default InviteContact;