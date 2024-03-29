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
import {io} from "socket.io-client"

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
    const [animate, setAnimate] = useState(false);

    const socket = useRef(io(process.env.REACT_APP_BASE_URL || "http://localhost:3001")).current;

    useEffect(() => {
        console.log(id)
        socket.emit('joinroom', {roomId: id});
        return () => {
            if(socket){
                console.log("closing socket due to unmount!");
            
                socket.close();
            }
        }
    }, [socket]);

    useEffect(() => {
        async function getRoomOnRender(){
            try {
                const groupChat = await AnonChatApi.getGroupChat(id);
                const oldMessages = await AnonChatApi.getChatMessages(id, messages.length);
    
                setMessages(oldMessages);
                setRoom(groupChat);
                console.log(socket);
                if(lastMessageRef.current && oldMessages.length > 7){
                    lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
                } else {
                    window.scroll(0, 0); // scroll to top
                }
                
            } catch(e){
                console.log(e)
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
        // when socket connection is open and someone sends a message
        const onMessage = (msg, id) => {
            try {
                console.log(msg);
                const user_id = parseInt(msg.split(" ")[0]);
                // Get everything besides the user id
                const message = msg.substr(msg.indexOf(' ')+1);
                console.log(message)
                console.log(user_id);
                const currentTime = new Date();
                const currentUTC = currentTime.toUTCString();
                const timestamp = new Date(currentUTC);
                
                setMessages(messages => [...messages, {user_id, message, timestamp}]);
                
                // If user is near the bottom of screen and someone sends a message,
                // scroll them to the bottom
                if((window.innerHeight + window.scrollY + 20) >= document.body.scrollHeight){
                    lastMessageRef.current.scrollIntoView({behavior: "smooth"});
                }
                setAnimate(true);
                setTimeout(() => { setAnimate( false ) }, 500);

            } catch(e){
                console.log(e);
                alert(`Please try again later or refresh the page! ${e}`);
            }
        }

        const onClose = () => {
            console.log("DISCONNECTED!!");
            // Wait for socket to close and then reconnect
            socket.close();
        }
        socket.on("message", onMessage);

        socket.on("close", onClose);

        socket.on("error", function(evt){
            console.log(evt);
        })

        return () => {
            socket.off('message', onMessage);
            socket.off('close', onClose);
            socket.off('error', function(evt){
                console.log(evt);
            });
          };
    }, [])

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
            // wait for socket state to be ready to send message
            socket.emit("message", message, id);
            postMessageToAPI();
            resetFormData();
            // disable the send button for half a second
            setTimeout(() => {
                setSendMessage(false)
            }, 500);
        }
    }, [sendMessage, socket])
    

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
                            topMessageRef.current.scrollIntoView({behavior: "instant", block: "start"});
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
        socket.close();
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
            <div className="messages">
                {messages.map((m, index) => {
                    // checks the length of messages to see if message is at end of list
                    // Reference that to scroll to bottom
                    const lastMessage = messages.length - 1 === index;
                    let timestamp = new Date(m.timestamp).toLocaleTimeString();
                    const key = Math.random().toString(36).substring(7);
                    // Because we get 25 at a time, after getting new messages if the list is not divisible by 25,
                    // this means there no more messages, adjust topMessageRef.
                    // So the user stays on the same message after last messages are loaded on top
                    // 24 is the default that allosocket the user to stay on the same spot as more load on top
                    const topMessageOffset = messages.length % 25 !== 0 ? (messages.length % 25 - 1) : 24;
                    
                    return (
                        <div ref={lastMessage ? lastMessageRef : index === topMessageOffset ? topMessageRef : null} 
                        key={key}
                        style={{backgroundColor: m.user_id === user.id ? darkMode.card : darkMode.received}}
                        className={`${m.user_id === user.id ?
                            'sent' : 'received'} ${animate ? "newMessage" : ""}`}>
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
            </div>
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