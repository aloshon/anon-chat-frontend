import { render, screen } from '@testing-library/react';
import Profile from './Profile';
import { Provider } from "react-redux";
import { store } from "./store"
import {BrowserRouter} from 'react-router-dom';
import UserContext from "./UserContext";


describe("Profile should render username and block list", () => {
    const user = {
        id: 1,
        username: "user1",
        isAdmin: false,
        blockList: [{
            id: 1,
            blocked_username: "test"
        }]
    }

    function logout(user){
        user = undefined;
        return user
    }

    const {asFragment} = render(
      <Provider store={store}>
        <BrowserRouter>
            <UserContext.Provider value={{user, logout}}>
                <Profile />
            </UserContext.Provider>
        </BrowserRouter>
      </Provider>
    );

    test("renders username and blocked_username in block list", () => {
        const username = screen.getByText("Username: user1");
        const blockedUser = screen.getByText("test");
        expect(username).toBeInTheDocument();
        expect(blockedUser).toBeInTheDocument();
    });
  
    test("matches snapshot", () => {
      expect(asFragment()).toMatchSnapshot();
    });
    
});