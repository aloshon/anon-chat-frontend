import React, {useEffect, useState, useContext, useRef} from "react";
import {useParams, useHistory} from "react-router-dom";
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
     * set up web socket
     * 
     * last message is referenced so when the user sends a message
     * or just first opens the group chat, they are sent to the bottom
     * 
     * top message is referenced so when the user scrolls up to the top,
     * it calls the backend for the next 25 messages and keeps the same screen
     * 
     * NO REDUX HERE DUE TO RERENDERS
     */
    // id is the unique_id similar to uuid() rather than room.id,
    // which is the incremented primary key
    const {id} = useParams();
    const {user} = useContext(UserContext);
    const history = useHistory();
    // lastMessageRef will keep track of the bottom message
    // so whenever the user sends a message or opens the room
    // they are sent there
    // topMessageRef will actually track the 2nd to top message before more are loaded.
    // Just so the user can scroll up once the messages are loaded normally
    const lastMessageRef = useRef();
    const topMessageRef = useRef();
    const darkMode = useSelector(state => state.darkMode);

    const [formData, handleChange, resetFormData] = useFields({
        message: ''
    })
    const [messages, setMessages] = useState([]);
    const [room, setRoom] = useState(null);
    const [sendMessage, setSendMessage] = useState(false);
    const [showGuests, setShowGuests] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const [ws, setWs] = useState(null);

    useEffect(() => {
        if (ws === null) {
            /** The localhost url is only for development */
            // setWs(new WebSocket(`ws://localhost:3001/chat/${id}`)); 
            setWs(new WebSocket(`wss://worker-production-cb67.up.railway.app/chat/${id}`));
        }
        return () => {
            // A function returned from useEffect will
            // get called on component unmount. i.e. when user leaves page
            // Just make sure ws is defined to avoid errors
            if(ws){
                console.log("closing ws due to unmount!");
            
                ws.close();
                setWs(null);
            }
        }
    }, [ws, setWs]);

    useEffect(() => {
        async function getRoomOnRender(){
            try {
                const groupChat = await AnonChatApi.getGroupChat(id);
                const oldMessages = await AnonChatApi.getChatMessages(id, messages.length);
    
                setMessages(oldMessages);
                setRoom(groupChat);
                if(lastMessageRef.current){
                    lastMessageRef.current.scrollIntoView({ smooth: true });
                    window.scroll(0, window.innerHeight + window.scrollY + 20); // slightly above bottom
                }
                if(oldMessages.length < 7){
                    window.scroll(0,0);
                }
                
            } catch(e){
                alert(e[0]);
                if(e[0] === "Not invited in this group chat!"){
                    history.push('/');
                }
            }
        }
        if(user){
            getRoomOnRender()
        }
    }, [user]);

    useEffect(() => {
        // wait for ws to be established
        while(!ws) return;
        // when ws connection is open and someone sends a message
        ws.onmessage = function(evt){
            try {
                const user_id = parseInt(evt.data.split(" ")[0]);
                // Get everything besides the user id
                const message = evt.data.substr(evt.data.indexOf(' ')+1);
                const currentTime = new Date();
                const currentUTC = currentTime.toUTCString();
                const timestamp = new Date(currentUTC);
                
                setMessages(messages => [...messages, {user_id, message, timestamp}]);
                
                // If user is near the bottom of screen and someone sends a message,
                // scroll them to the bottom
                if((window.innerHeight + window.scrollY + 20) >= document.body.scrollHeight){
                    if(messages.length > 5){
                        lastMessageRef.current.scrollIntoView({behavior: "smooth", block: "end"});
                    }
                }

            } catch(e){
                console.log(e);
                alert(`Please try again later or refresh the page! ${e}`);
            }
        }

        ws.onclose = function(evt){
            console.log("DISCONNECTED!!");
            // Wait for socket to close and then reconnect

            /** The localhost url is only for development */
            // setTimeout(setWs(new WebSocket(`ws://localhost:3001/chat/${id}`)), 1000); 
            setTimeout(setWs(new WebSocket(`wss://worker-production-cb67.up.railway.app/chat/${id}`)), 1000);
        };

        ws.onerror = function(evt){
            console.log(evt);
        }
    }, [ws])

    useEffect(() => {
        async function postMessageToAPI() {
            
            // room.id is the PrimaryKey id of the group chat (a.k.a group_chat_id)
            // while id from params is the unique_id (a.k.a uuid())
            const messsageToSend = {
                unique_id: id,
                message: formData.message, 
                user_id: user.id, 
                group_chat_id: room.id
            }

            await AnonChatApi.sendChatMessage(messsageToSend);
            return
        }

        if(sendMessage){
            // add user_id to the start of the message string
            const message = `${user.id} ` + formData.message;
            // wait for ws state to be ready to send message
            ws.send(message);
            postMessageToAPI();
            resetFormData();
            // disable the send button for half a second
            setTimeout(() => {
                setSendMessage(false)
            }, 500);
        }
    }, [sendMessage, ws])
    

    // If the user is not scrolled to the bottom of the page after
    // sending a new message, scroll them into view
    useEffect(() => {
        if(lastMessageRef.current && sendMessage){
            if(messages.length > 5){
                lastMessageRef.current.scrollIntoView({behavior: "smooth"});
            }
        }
    }, [sendMessage]);
    
    // wait for message to exist or be loaded before executing this code
    // Each time user is at top of page, load 25 more messages and wait a bit
    // If the user exits the page, topMessageRef.current is null 
    // so do not scrollIntoView
    useEffect(() => {
        window.onscroll = async () => {
            if(window.pageYOffset === 0) {
                const olderMessages = await AnonChatApi.getChatMessages(id, messages.length);
                setShowLoading(true);
                setTimeout(() => {
                    if(olderMessages.length > 0){
                        setMessages((messages) => [...olderMessages, ...messages]);
                        if(topMessageRef.current){
                            topMessageRef.current.scrollIntoView();
                        }
                    }
                    setShowLoading(false);
                }, 1300);
            }
        };
        // Avoids error because setTimeOut loses topMessageRef after component unmount
        return () => {}
    }, [messages]);


    const goBackHome = () => {
        ws.close();
        history.push("/");
    }

    // If user or room is not loaded, wait
    while(!user || !room) return <h1>Loading...</h1>;

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
            {showLoading && <div className="loading-old-messages">Loading...</div>}
            <Container className="messages" fluid>
                {messages.map((m, index) => {
                    // checks the length of messages to see if message is at end of list
                    // Reference that to scroll to bottom
                    const lastMessage = messages.length - 1 === index;
                    let timestamp = new Date(m.timestamp).toLocaleTimeString();
                    // Because we get 25 at a time, after getting new messages if the list is not divisible by 25,
                    // this means there no more messages, adjust topMessageRef.
                    // So the user stays on the same message after last messages are loaded on top
                    // 24 is the default that allows the user to stay on the same spot as more load on top
                    const topMessageOffset = messages.length % 25 !== 0 ? (messages.length % 25 - 1) : 24;
                    
                    return (
                        <div ref={lastMessage ? lastMessageRef : index === topMessageOffset ? topMessageRef : null} 
                        key={index}
                        style={{backgroundColor: m.user_id === user.id ? darkMode.card : darkMode.received}}
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
                    max={300}
                    value={formData.message}
                    onChange={handleChange}
                    />
                    {sendMessage ? 
                    <Button
                    type="submit"
                    disabled={true}
                    >send
                    </Button> :
                    <Button
                    type="submit"
                    >send
                    </Button>}
                    
                </Form>
            </div>
        </>
    )
}

export default Client