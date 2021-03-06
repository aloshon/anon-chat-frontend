import { render, screen } from '@testing-library/react';
import AddContactForm from './AddContactForm';
import { Provider } from "react-redux";
import { store } from "../store"
import {BrowserRouter} from 'react-router-dom';
import UserContext from "../UserContext";


describe("AddContactForm should render form for user to add contacts", () => {
    const user = {
        id: 1,
        username: "user1",
        blockList: []
    }

    const {asFragment} = render(
      <Provider store={store}>
        <BrowserRouter>
            <UserContext.Provider value={{user}}>
                <AddContactForm />
            </UserContext.Provider>
        </BrowserRouter>
      </Provider>
    );
    test("renders labels", () => {
      const label1 = screen.getByText("Username:");
      const label2 = screen.getByText("Nickname:");
      const button = screen.getByText("Submit");
      expect(label1).toBeInTheDocument();
      expect(label2).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  
    test("matches snapshot", () => {
      expect(asFragment()).toMatchSnapshot();
    });
    
  });