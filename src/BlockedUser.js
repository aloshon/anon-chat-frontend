import {useSelector, shallowEqual, useDispatch} from "react-redux";
import {unblockUser} from "./actionCreators";

const BlockedUser = ({user_id, blockedUser}) => {
    const dispatch = useDispatch();

    return (
        <>
            <p>{blockedUser}</p>
            <button onClick={() => dispatch(unblockUser(blockedUser))}>Unblock</button>
        </>
    )
}

export default BlockedUser;