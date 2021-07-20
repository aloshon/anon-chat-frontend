import React, {useContext} from "react";
import {Route, Switch} from "react-router-dom";
import Client from "./Client";
import SignupForm from "./Forms/SignupForm";
import LoginForm from "./Forms/LoginForm";
import UserContext from "./UserContext";
import Homepage from "./Homepage";
import CreateGroupChatForm from "./Forms/CreateGroupChatForm";
import ContactsList from "./Contacts/ContactList";
import EditGroupChat from "./InvitingGuests/EditGroupChat";
import Profile from "./Profile";

/**
 * Routes renders all the routes the user can access
 * If the user is not logged in, homepage will be replaced
 * by the log in form
 * Render 404 page if path not defined
 */
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
                <EditGroupChat />
            </Route>
            <Route exact path="/profile">
                <Profile />
            </Route>
            <Route>
                <h1>ERROR 404</h1>
                <p>Hmmm. I can't seem to find what you want...</p>
                <img src=
                "https://image.freepik.com/free-vector/funny-error-404-background-design_1167-219.jpg"
                />
            </Route>
        </Switch>
    )
}

export default Routes;