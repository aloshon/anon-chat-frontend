import { render, screen } from '@testing-library/react';
import SignupForm from './SignupForm';
import { Provider } from "react-redux";
import { store } from "../store"
import {BrowserRouter} from 'react-router-dom';
import UserContext from "../UserContext";


describe("SignupForm should render form for user to sign up", () => {
    const signup = () => {
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
            <UserContext.Provider value={{signup}}>
                <SignupForm />
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