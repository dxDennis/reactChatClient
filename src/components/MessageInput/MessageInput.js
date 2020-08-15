import React from 'react';

const MessageInput = ({setMessage, sendMessage, message}) => (
    <div className="messageInput card card-body mb-5">
        <form className="form">
            <div className="form-group">
                <input type="text"
                       name="message"
                       placeholder="type a message ...."
                       className="form-control"
                       id="messageInput"
                       value={message}
                       onChange={({ target: { value } }) => setMessage(value)}
                       onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
            </div>
            <button
                className="btn btn-primary"
                    onClick={event => sendMessage(event)}>
                Send
            </button>
        </form>
    </div>
)

export default MessageInput