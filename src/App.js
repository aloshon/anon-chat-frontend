import React, {useState, useEffect} from "react";
import './App.css';
import Routes from './Routes';
import NavBar from './Nav';
import useLocalStorage from "./Hooks/useLocalStorage";
import jwt from "jsonwebtoken";
import AnonChatApi from "./api";
import UserContext from "./UserContext";
import { useSelector } from "react-redux";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage("token", null);
  const darkMode = useSelector(state => state.darkMode);

  useEffect(function getUserFromToken() {
    async function getUser() {
      console.log(token);
      if(token){
        try{
          let {username} = jwt.decode(token, {complete: true}).payload;
          console.log(username)
          // insert the token onto the API class
          AnonChatApi.token = token;
          let currentUser = await AnonChatApi.getUser(username);
          
          setUser(currentUser);
        } catch (e) {
          console.error(e);
          // Logout user if any errors encountered while getting the token
          setUser(null);
        }
      }
    }

    getUser();
  }, [token]);

  // Try to set token and sign up user, if error occurs,
  // display it in console and throw error
  // If successful then the page redirects and user is signed in
  async function signup(data) {
    try {
      let token = await AnonChatApi.getSignup(data);
      setToken(token);
      return true;
    } catch (e) {
      console.error(`Error Signing In: ${e}`);
      throw new Error(`ERROR SIGNING IN!: ${e}`);
    }
  }

  // Try to set token, if error occurs, display it in console and throw error
  // If successful then the page redirects and user is logged in
  async function login(data) {
    try {
      let token = await AnonChatApi.getLogin(data);
      setToken(token);
      return true;
    } catch (e) {
      console.error(`Error Logging In: ${e}`);
      throw new Error(`ERROR LOGGING IN!: ${e}`);
    }
  }

  // Logs out the user and sets token to null
  function logout() {
    setUser(null);
    setToken(null);
  }

  // Set body background color to the proper theme
  document.body.style.backgroundColor = darkMode.background;

  return (
    <UserContext.Provider value={{user, token, signup, login, logout}}>
      <div className="App" style={{color: darkMode.text}}>
          <NavBar />
          <Routes />
      </div>
    </UserContext.Provider>
  );
}

export default App;
