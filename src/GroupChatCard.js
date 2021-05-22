import React, {useContext} from "react";
import Card from "react-bootstrap/Card";
import {NavLink} from "react-router-dom";
import Button from "react-bootstrap/Button";
import UserContext from "./UserContext";
import "./GroupChatCard.css";
import {useSelector} from "react-redux";

/**
 * GroupChatCard renders basic info on group chat and local timestamp.
 * If user is the creator then they are shown a button
 * to edit the group chat. There they can invite guests
 * or delete the group chat.
 */
const GroupChatCard = ({unique_id, title, description, timestamp, creator_id, displayInvitePage}) => {
    const {user} = useContext(UserContext);
    const darkMode = useSelector(state => state.darkMode);
    const localTime = new Date(timestamp);

    return (
        <Card className="mt-4 group-chat-card" style={{backgroundColor: darkMode.card}}>
            <NavLink exact to={`/chat/${unique_id}`}>
                <Card.Header 
                as="h3"
                className="group-chat-card-header"
                style={{color: darkMode.text}}>
                    {title}
                </Card.Header>
            </NavLink>
            <Card.Body className="group-chat-card-body">
                    <Card.Text as="h6">{description}</Card.Text>
                <div className="group-chat-card-description">
                    <small>{localTime.toLocaleString()}</small>
                    {user.id === creator_id && <>
                    <Button className="group-chat-card-button" variant="success" onClick={() => displayInvitePage(unique_id)}>Edit</Button>
                    </>}
                </div>
            </Card.Body>
        </Card>
    )
}
export default GroupChatCard;