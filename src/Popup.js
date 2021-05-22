import React from "react";
import "./Popup.css";

/** 
 * Component that takes content and a handleClose function to give
 * purpose to the close icon.
 * Content can be text or a list.
*/  

const Popup = ({content, handleClose}) => {
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={handleClose}>X</span>
                {content}
            </div>
        </div>
    )
}

export default Popup;