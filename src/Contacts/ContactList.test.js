import { render, screen } from '@testing-library/react';
import ContactList from './ContactList';
import { Provider } from "react-redux";
import { store } from "../store"
import {BrowserRouter} from 'react-router-dom';
import UserContext from "../UserContext";

describe("Renders list of contacts", () => {
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
                <ContactList />
            </UserContext.Provider>
        </BrowserRouter>
      </Provider>
    );
    test("Contact List title is rendered", () => {
      const title = screen.getByText("Contact List");
      expect(title).toBeInTheDocument();
    });
  
    test("matches snapshot", () => {
      expect(asFragment()).toMatchSnapshot();
    });
    
  });