import { render, screen } from '@testing-library/react';
import Popup from './Popup';


describe("Popup should render content and button", () => {
    const content = "this is the content";
    const handleClose = () => undefined;

    const {asFragment} = render(
        <Popup content={content} handleClose={handleClose}/>
    );

    test("renders popup with content", () => {
        const content = screen.getByText("this is the content");
        expect(content).toBeInTheDocument();
    });
  
    test("matches snapshot", () => {
      expect(asFragment()).toMatchSnapshot();
    });
    
});