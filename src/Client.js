import React, {useEffect, useState, useContext, useRef} from "react";
import {useParams, useHistory, Redirect} from "react-router-dom";
import AnonChatApi from "./api";
import useFields from "./Hooks/useFields";
import UserContext from "./UserContext";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Client.css";
import Message from "./Message";
import Popup from "./Popup";
import {useSelector} from "react-redux";

const Client = () => {
    /** get the groupchat from the database using the unique_id,
     * if no group chat redirect with warning. otherwise 
     * set up web socket replace /test with the group_chat_id
     * 
     * last message is referenced so when the user sends a message
     * or just first opens the group chat, they are sent to the bottom
     * 
     * top message is refferenced so when the user scrolls up to the top,
     * it calls the backend for the next 25 messages
     * 
     * NO REDUX HERE DUE TO RERENDERS
     */
    // id is the unique_id similar to uuid() rather than room.id,
    // which is the incremented primary key
    const {id} = useParams();
    const {user} = useContext(UserContext);
    const history = useHistory();
    const lastMessageRef = useRef();
    const darkMode = useSelector(state => state.darkMode);
    
    const ws = new WebSocket(`ws://localhost:3001/chat/${id}`);

    const [formData, handleChange, resetFormData] = useFields({
        message: ''
    })
    const [messages, setMessages] = useState([]);
    const [room, setRoom] = useState(null);
    const [sendMessage, setSendMessage] = useState(false);
    const [showGuests, setShowGuests] = useState(false);

    useEffect(() => {
        ws.onopen = async function(evt){
            try {
                const groupChat = await AnonChatApi.getGroupChat(id);
                const oldMessages = await AnonChatApi.getChatMessages(id, messages.length);

                setMessages(oldMessages);
                setRoom(groupChat);
                if(lastMessageRef.current){
                    lastMessageRef.current.scrollIntoView({ smooth: true});
                }
            } catch(e){
                if(e[0] === "Not invited in this group chat!"){
                    alert(e[0]);
                    history.push('/')
                    return <Redirect to='/'/>;
                }
            }
        }

        ws.onmessage = function(evt){
            const user_id = parseInt(evt.data.split("")[0]);
            const message = evt.data.slice(1);
            const currentTime = new Date();
            const currentUTC = currentTime.toUTCString();
            const timestamp = new Date(currentUTC);
            setMessages(messages => [...messages, {user_id, message, timestamp}])
        }

        ws.onclose = function(evt){
            console.log("DISCONNECTED!!")
            ws.close();
        }
    }, [])

    useEffect(() => {
        if(sendMessage){
            postMessageToAPI();
            setSendMessage(false);
        }
        async function postMessageToAPI() {
            
            // room.id is the PrimaryKey id(a.k.a group_chat_id)
            // while id from params is the unique_id (a.k.a uuid())
            const messsageToSend = {
                unique_id: id,
                message: formData.message, 
                user_id: user.id, 
                group_chat_id: room.id
            }
            // Convert to unviersal time UTC and send it to database
            let currentUTC = new Date();
            currentUTC.toUTCString();
            messsageToSend.timestamp = currentUTC;

            await AnonChatApi.sendChatMessage(messsageToSend);
            
            // add user_id to the start of the message string
            ws.send(`${user.id}` + formData.message);
            resetFormData();
        }
    }, [sendMessage])
    

    // If the user is not scrolled to the bottom of the page after
    // sending a new message, scroll them into view
    useEffect(() => {
        if(lastMessageRef.current && sendMessage){
            lastMessageRef.current.scrollIntoView()
        }
    }, [sendMessage]);
    

    window.onscroll = async () => {
        if(window.pageYOffset === 0) {
            const oldMessages = await AnonChatApi.getChatMessages(id, messages.length);
            setMessages((messages) => [...oldMessages, ...messages]);
        }
      };

    const goBackHome = () => {
        ws.close();
        history.push('/');
    }

    if(!room){
        return <h1>Loading...</h1>
    }

    // shuffle the order of the guest list so no one can
    // figure out who made the list
    room.guests.sort(() => Math.random() - 0.5); 
    return (
        <>
            <div className="display-guests">
            <Button 
            style={{color: darkMode.text}}
             onClick={() => setShowGuests(true)}>
                 View Guest List
            </Button>
            </div>
            <Container className="messages">
                {messages.map((m, index) => {
                    // checks the length of messages to see if message is the last
                    // if it is set reference to that message
                    const lastMessage = messages.length - 1 === index;
                    let timestamp = new Date(m.timestamp).toLocaleTimeString();
                    
                    return (
                        <div ref={lastMessage ? lastMessageRef : null} 
                        key={index}
                        style={{backgroundColor: m.user_id === user.id ? darkMode.card : 'gray'}}
                        className={`${m.user_id === user.id ?
                            'sent' : 'received'}`}>
                            <Message
                                message={m.message}
                                timestamp={timestamp}>
                            </Message>
                        </div>
                    )
                })}
                {showGuests && <Popup
                    key="popup"
                    content={
                        room.guests.map((g, idx) => (
                            <div
                            key={idx}
                            >{g.username}
                            </div>
                        ))
                    }
                    handleClose={() => setShowGuests(false)}
                />}
            </Container>
            <div className="send-message-form">
                <Form onSubmit={(e) => {
                    e.preventDefault()
                    setSendMessage(true)}
                    } className="input-group">
                    <Button onClick={goBackHome}
                    variant="secondary" 
                    >Home!
                    </Button>
                    <Form.Control
                    type="text"
                    name="message"
                    size="lg"
                    value={formData.message}
                    onChange={handleChange}
                    />
                    <Button
                    type="submit"
                    >send
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Client