import React from 'react';
import {Col} from "react-bootstrap";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const MessageInput = ({setMessage, sendMessage, message}) => (

    <form>
        <div className="form-row">
            <Col>
                <label htmlFor="messageInput" className="sr-only">type a message</label>
                <input type="text"
                       name="message"
                       placeholder="type a message ...."
                       className="form-control"
                       id="messageInput"
                       value={message}
                       onChange={({target: {value}}) => setMessage(value)}
                       onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
            </Col>
            <Col xs={1}>
                <button
                    className="btn btn-primary mb-2"
                    onClick={event => sendMessage(event)}>
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </button>
            </Col>
        </div>
    </form>
)

export default MessageInput