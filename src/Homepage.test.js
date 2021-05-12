import { render, screen } from '@testing-library/react';
import Homepage from './Homepage';
import { Provider } from "react-redux";
import { store } from "./store"
import {BrowserRouter} from 'react-router-dom';
import UserContext from "./UserContext";


describe("homepage should render", () => {
    const user = {
        id: 1,
        username: "user1",
        isAdmin: false,
        blockList: []
    }

    const {asFragment} = render(
      <Provider store={store}>
        <BrowserRouter>
            <UserContext.Provider value={{user}}>
                <Homepage/>
            </UserContext.Provider>
        </BrowserRouter>
      </Provider>
    );
    test("renders homepage, no group chats though", () => {
      const noChatsText = screen.getByText("No chats yet!");
      expect(noChatsText).toBeInTheDocument();
    });
  
    test("matches snapshot", () => {
      expect(asFragment()).toMatchSnapshot();
    });
    
  });