import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AnonChatApi from '../api';
import "./InviteContact.css";
import {useSelector} from "react-redux";

const InviteContact = ({unique_id, user_id, group_chat_id, nickname, username, guestList}) => {
    const [invited, setInvited] = useState(false);
    const darkMode = useSelector(state => state.darkMode);
    
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
            if(window.confirm("Invite guest? Cannot be uninvited!")){
                // response will be boolean
                const response = await AnonChatApi.inviteGuest({unique_id, user_id, group_chat_id, username});
                if(response){
                    evt.target.disabled = true;
                    evt.target.innerText = "Invited";
                } else{
                    alert("Cannot invite guest at this time. Please try again later.")
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