import React, {useContext} from "react";
import {Route, Switch} from "react-router-dom";
import Client from "./Client";
import SignupForm from "./Forms/SignupForm";
import LoginForm from "./Forms/LoginForm";
import UserContext from "./UserContext";
import Homepage from "./Homepage";
import CreateGroupChatForm from "./Forms/CreateGroupChatForm";
import ContactsList from "./Contacts/ContactsList";
import InvitingGuest from "./InvitingGuests/InvitingGuest";
import Profile from "./Profile";

const Routes = () => {
    const {user} = useContext(UserContext);

    return(
        <Switch>
            <Route exact path="/">
                {user ? <Homepage /> : <LoginForm />}
            </Route>
            <Route exact path="/signup">
                <SignupForm />
            </Route>
            <Route exact path="/login">
                <LoginForm />
            </Route>
            <Route exact path="/chat/:id">
                <Client />
            </Route>
            <Route exact path="/create">
                <CreateGroupChatForm />
            </Route>
            <Route exact path="/contacts">
                <ContactsList />
            </Route>
            <Route exact path="/invite/:id">
                <InvitingGuest />
            </Route>
            <Route exact path="/profile">
                <Profile />
            </Route>
        </Switch>
    )
}

export default Routes;