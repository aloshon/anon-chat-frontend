const Message = ({message, timestamp}) => {
    return (
        <div>
            <p style={{marginBottom: 0}}>{message}</p>
            <small>{timestamp}</small>
        </div>
    )
}

export default Message;