import { render, screen } from '@testing-library/react';
import GroupChatCard from './GroupChatCard';
import { Provider } from "react-redux";
import { store } from "./store"
import {BrowserRouter} from 'react-router-dom';
import UserContext from "./UserContext";


describe("GroupChatCard should render basic group chat info", () => {
    const user = {
        id: 1,
        username: "user1",
        isAdmin: false,
        blockList: []
    }

    function displayInvitePage(unique_id){
        return history.push(`/invite/${unique_id}`)
    }

    const {asFragment} = render(
      <Provider store={store}>
        <BrowserRouter>
            <UserContext.Provider value={{user}}>
                <GroupChatCard
                unique_id="04ffa447-5237-476e-8v24-fb8n0nc801c7"
                title="test"
                description="testing"
                timestamp="2021-04-28T17:51:35.359Z"
                creator={1}
                displayInvitePage={displayInvitePage}
                />
            </UserContext.Provider>
        </BrowserRouter>
      </Provider>
    );
    test("renders group chat card with basic info", () => {
      const title = screen.getByText("test");
      const description = screen.getByText("testing");
      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  
    test("matches snapshot", () => {
      expect(asFragment()).toMatchSnapshot();
    });
    
  });