import React, { useContext, useEffect } from "react";
import UserContext from "./UserContext";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {useSelector, useDispatch} from "react-redux";
import BlockedUser from "./BlockedUser";
import AddUserToBlockListForm from "./Forms/AddUserToBlockListForm";
import {toggleDarkMode} from "./Actions/actionCreators";
import AnonChatApi from "./api";
import {useHistory} from "react-router-dom";
import {getBlockList} from './Actions/actionCreators';

/**
 * Profile renders component that displays user's username
 * and list of blocked users
 * User can toggle between dark and light mode
 * and delete their accounts here.
 */
const Profile = () => {
    const {user, logout} = useContext(UserContext);
    const dispatch = useDispatch();
    const history = useHistory();
    const blockList = useSelector(state => state.blockList);
    const darkMode = useSelector(state => state.darkMode);
   
    // Get the user's blockList on render after user is defined
    useEffect(() =>{
        if(user){
            getBlockList(dispatch, user.blockList);
        }
    }, [user, dispatch]);

    // scroll user to top of page
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const handleDelete = () => {
        if(window.confirm("Delete your profile?")){
            logout();
            AnonChatApi.deleteUser();
            history.push('/signup')
        } else{
            return
        }
    }

    // If user is not logged in or loaded yet, return loading
    while(!user) return <h1>Loading...</h1>;

    return(
        <Container>
            <h1>Username: {user.username}</h1><br/>
            <div className='custom-control custom-switch'>
                <input
                type='checkbox'
                className='custom-control-input'
                id='customSwitchesChecked'
                onChange={() => toggleDarkMode(dispatch)}
                checked={darkMode.isDarkMode ? true : false}
                />
                <label className='custom-control-label' htmlFor='customSwitchesChecked'>
                {darkMode.isDarkMode ? "dark mode" : "light mode"}
                </label>
            </div>
            <AddUserToBlockListForm blockList={blockList} />
            <h5 style={{marginTop: "90px"}}>Block List</h5>
            <Container>
                {blockList.length !== 0 ? blockList.map(b => (
                    <BlockedUser 
                    key={b.id}
                    blockedUser={b.blocked_username}
                    />
                )) : <h2>No users blocked</h2>}
            </Container>
            <Button
            style={{ float: "left", marginTop: "30px" }}
            variant="danger" 
            onClick={handleDelete}>
                Delete Profile
            </Button>
        </Container>
    )
}

export default Profile;