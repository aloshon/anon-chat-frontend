import { render, screen } from '@testing-library/react';
import BlockedUser from './BlockedUser';
import { Provider } from "react-redux";
import { store } from "./store"
import {BrowserRouter} from 'react-router-dom';


describe("BlockedUser should render blocked user's username and button to unblock", () => {
    const blockedUser = "user1";

    const {asFragment} = render(
      <Provider store={store}>
        <BrowserRouter>
            <BlockedUser blockedUser={blockedUser}/>
        </BrowserRouter>
      </Provider>
    );
    test("renders group chat card with basic info", () => {
      const username = screen.getByText("user1");
      expect(username).toBeInTheDocument();
      const unblock = screen.getByTestId("unblock");
      expect(unblock).toBeInTheDocument();
    });
  
    test("matches snapshot", () => {
      expect(asFragment()).toMatchSnapshot();
    });
    
  });