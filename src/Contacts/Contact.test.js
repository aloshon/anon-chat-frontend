import { render, screen } from '@testing-library/react';
import Contact from './Contact';
import { Provider } from "react-redux";
import { store } from "../store"
import {BrowserRouter} from 'react-router-dom';


describe("Contact should render username", () => {
    const {asFragment} = render(
      <Provider store={store}>
        <BrowserRouter>
            <Contact 
                userId={1}
                nickname={"test"}
                username={"user1"}
            />
        </BrowserRouter>
      </Provider>
    );
    test("nickname and username are displayed", () => {
      const username = screen.getByText("Username: user1");
      expect(username).toBeInTheDocument();
      const nickname = screen.getByText("test");
      expect(nickname).toBeInTheDocument();
    });
  
    test("matches snapshot", () => {
      expect(asFragment()).toMatchSnapshot();
    });
    
  });