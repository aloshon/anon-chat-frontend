import { render, screen } from '@testing-library/react';
import InviteContact from './InviteContact';
import { Provider } from "react-redux";
import { store } from "../store"
import {BrowserRouter} from 'react-router-dom';


describe("InviteContact should render contact info and whether if user is invited", () => {
    const guestList = [
        {user_id: 1}
    ]

    const {asFragment} = render(
      <Provider store={store}>
        <BrowserRouter>
            <InviteContact
            unique_id="04ffa447-5237-476e-8v24-fb8n0nc801c7"
            user_id={1}
            group_chat_id={1}
            nickname="nickname"
            username="user1"
            guestList={guestList}
            />
        </BrowserRouter>
      </Provider>
    );
    test("renders contact info and invite button", () => {
      const username = screen.getByText("Username: user1");
      const nickname = screen.getByText("nickname");
      const invited = screen.getByText("Invited");
      expect(username).toBeInTheDocument();
      expect(nickname).toBeInTheDocument();
      expect(invited).toBeInTheDocument();
    });
  
    test("matches snapshot", () => {
      expect(asFragment()).toMatchSnapshot();
    });
    
});

test("renders different text on button if user is not on guestList", () => {
    const guestList = [
        {user_id: 1}
    ]

    render(
      <Provider store={store}>
        <BrowserRouter>
            <InviteContact
            unique_id="04ffa447-5237-476e-8v24-fb8n0nc801c7"
            user_id={2}
            group_chat_id={1}
            nickname="nickname"
            username="user1"
            guestList={guestList}
            />
        </BrowserRouter>
      </Provider>
    );

    const username = screen.getByText("Username: user1");
    const nickname = screen.getByText("nickname");
    const notInvited = screen.getByText("Invite!");
    expect(username).toBeInTheDocument();
    expect(nickname).toBeInTheDocument();
    expect(notInvited).toBeInTheDocument();
});

