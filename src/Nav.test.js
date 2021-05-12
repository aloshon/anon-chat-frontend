import { render, screen } from '@testing-library/react';
import Nav from './Nav';
import { Provider } from "react-redux";
import { store } from "./store"
import {BrowserRouter} from 'react-router-dom';
import UserContext from "./UserContext";


describe("Nav should render logged in version", () => {
    const user = {
        id: 1,
        username: "user1",
        isAdmin: false,
        blockList: []
    }

    function logout(user){
        user = undefined;
        return user
    }

    const {asFragment} = render(
      <Provider store={store}>
        <BrowserRouter>
            <UserContext.Provider value={{user, logout}}>
                <Nav/>
            </UserContext.Provider>
        </BrowserRouter>
      </Provider>
    );

    test("renders logged in version if user is defined", () => {
        const contacts = screen.getByText("Contacts");
        const profile = screen.getByText("Profile");
        expect(contacts).toBeInTheDocument();
        expect(profile).toBeInTheDocument();
    });
  
    test("matches snapshot", () => {
      expect(asFragment()).toMatchSnapshot();
    });
    
});
