import {useSelector, useDispatch} from "react-redux";
import {unblockUser} from "./actionCreators";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./BlockedUser.css";

const BlockedUser = ({blockedUser}) => {
    const dispatch = useDispatch();
    const darkMode = useSelector(state => state.darkMode);
    return (
        <Card className="blocked-contact-card" style={{backgroundColor: darkMode.card}}>
            <Card.Body>
                <Card.Title>{blockedUser}</Card.Title>
                <Button 
                variant="success"
                onClick={() => dispatch(unblockUser(blockedUser))}>
                    Unblock
                </Button>
            </Card.Body>
        </Card>
    )
}

export default BlockedUser;