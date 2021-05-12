import { render, screen } from '@testing-library/react';
import Message from './Message';


describe("Message should display text and timestamp of when the message was created", () => {
    const timestamp = "Sun, 25 Apr 2021 21:39:55 GMT";
    const message = "this is a test";

    const {asFragment} = render(<Message message={message} timestamp={timestamp}/>);

    test("renders message with text and timestamp", () => {
      const message = screen.getByText("this is a test");
      const timestampYear = screen.getByText("Sun, 25 Apr 2021 21:39:55 GMT");
      expect(message).toBeInTheDocument();
      expect(timestampYear).toBeInTheDocument();
    });
  
    test("matches snapshot", () => {
      expect(asFragment()).toMatchSnapshot();
    });
    
  });