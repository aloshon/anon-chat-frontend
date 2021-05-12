import { render, screen } from '@testing-library/react';
import CreateGroupChatForm from './CreateGroupChatForm';
import { Provider } from "react-redux";
import { store } from "../store"
import {BrowserRouter} from 'react-router-dom';
import UserContext from "../UserContext";


describe("CreateGroupChatForm should render form for user to create group chats", () => {
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
                <CreateGroupChatForm />
            </UserContext.Provider>
        </BrowserRouter>
      </Provider>
    );
    test("renders labels", () => {
      const label1 = screen.getByText("Title:");
      const label2 = screen.getByText("Description:");
      const button = screen.getByText("Submit");
      expect(label1).toBeInTheDocument();
      expect(label2).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  
    test("matches snapshot", () => {
      expect(asFragment()).toMatchSnapshot();
    });
    
  });