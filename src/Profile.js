import React, { useContext, useEffect } from "react";
import UserContext from "./UserContext";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {useSelector, shallowEqual, useDispatch} from "react-redux";
import {FETCH_BLOCK_LIST} from "./actionTypes";
import BlockedUser from "./BlockedUser";
import AddUserToBlockListForm from "./Forms/AddUserToBlockListForm";
import {toggleDarkMode} from "./actionCreators";

const Profile = () => {
    const {user} = useContext(UserContext);
    const dispatch = useDispatch();
    const blockList = useSelector(state => state.blockList, shallowEqual);
   
    // Get the user's blockList on render after user is defined
    useEffect(() =>{
        if(user){
            dispatch({type: FETCH_BLOCK_LIST, payload: user.blockList});
        }
    }, [user, dispatch]);

    while(!user) return <h1>Loading...</h1>;

    return(
        <Container>
            <h1>Username: {user.username}</h1><br/>
            <Button onClick={() => toggleDarkMode(dispatch)}>toggle dark mode</Button>
            <AddUserToBlockListForm />
            <h5>Block List</h5>
            <Container>
                {blockList.length !== 0 ? blockList.map(b => (
                    <BlockedUser 
                    key={b.id}
                    blockedUser={b.blocked_username}
                    />
                )) : <h2>No users blocked</h2>}
            </Container>
        </Container>
    )
}

export default Profile;