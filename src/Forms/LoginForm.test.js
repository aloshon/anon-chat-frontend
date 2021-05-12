import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';
import { Provider } from "react-redux";
import { store } from "../store"
import {BrowserRouter} from 'react-router-dom';
import UserContext from "../UserContext";


describe("LoginForm should render form for user to log in", () => {
    const login = () => {
        const user = {
            id: 1,
            username: "user1",
            isAdmin: false,
            blockList: []
        }
        return user
    }

    const {asFragment} = render(
      <Provider store={store}>
        <BrowserRouter>
            <UserContext.Provider value={{login}}>
                <LoginForm />
            </UserContext.Provider>
        </BrowserRouter>
      </Provider>
    );
    test("renders labels", () => {
      const label1 = screen.getByText("Username:");
      const label2 = screen.getByText("Password:");
      const button = screen.getByText("Submit");
      expect(label1).toBeInTheDocument();
      expect(label2).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  
    test("matches snapshot", () => {
      expect(asFragment()).toMatchSnapshot();
    });
    
  });