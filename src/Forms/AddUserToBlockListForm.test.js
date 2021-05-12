import { render, screen } from '@testing-library/react';
import AddUserToBlockListForm from './AddUserToBlockListForm';
import { Provider } from "react-redux";
import { store } from "../store"
import {BrowserRouter} from 'react-router-dom';
import UserContext from "../UserContext";


describe("AddUserToBlockListForm should render form to block user", () => {
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
                    <AddUserToBlockListForm />
                </UserContext.Provider>
            </BrowserRouter>
      </Provider>
    );
    test("renders inputs", () => {
      const placeholder1 = screen.getByPlaceholderText("Username");
      const button = screen.getByText("Submit");
      expect(placeholder1).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  
    test("matches snapshot", () => {
      expect(asFragment()).toMatchSnapshot();
    });
    
  });