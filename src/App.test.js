import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from "react-redux";
import { store} from "./store"
import {BrowserRouter} from 'react-router-dom';


describe("app should work", () => {
  const {asFragment} = render(
    <Provider store={store}>
      <BrowserRouter><App /></BrowserRouter>
    </Provider>
  );
  test("renders anonChat logo on homepage nav", () => {
    const appLogo = screen.getByText("anonChat");
    expect(appLogo).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    expect(asFragment()).toMatchSnapshot();
  });
  
});