import { render, screen } from '@testing-library/react';
import EditGroupChat from './EditGroupChat';
import { Provider } from "react-redux";
import { store } from "../store"
import {BrowserRouter} from 'react-router-dom';
import UserContext from "../UserContext";


describe("EditGroupChat should render list of contacts for user to invite", () => {
    const user = {
        id: 1,
        username: "user1",
        blockList: [],
        contactList: [
          {
              username: "testusername",
              nickname: "testnickname",
              user_id: 1
          }
      ]
    }

    const {asFragment} = render(
      <Provider store={store}>
        <BrowserRouter>
            <UserContext.Provider value={{user}}>
                <EditGroupChat />
            </UserContext.Provider>
        </BrowserRouter>
      </Provider>
    );

    test("renders loading guest list since there is no guest list", () => {
      const noGuestList = screen.getByText("Loading guest list...");
      expect(noGuestList).toBeInTheDocument();
    });
  
    test("matches snapshot", () => {
      expect(asFragment()).toMatchSnapshot();
    });
    
});
