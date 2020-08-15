import React, {useState} from 'react'
import Alert from "react-bootstrap/Alert";

const Message = ({message: {text, user}, name, botName}) => {

    const trimmedName = name.trim().toLowerCase();
    const [show, setShow] = useState(true);
    let isSendByCurrentUser = (user === trimmedName);


    let currentItem = ''

    if (!isSendByCurrentUser) {

        if (user === botName) {
            if (show) {
                currentItem = (
                    <Alert variant="warning" className="text-center" onClose={() => setShow(false)} dismissible>
                        {text}
                    </Alert>
                )
            }

        } else {
            currentItem = (
                <Alert variant="success" onClose={() => setShow(false)} dismissible>
                    <small>{user}</small>
                    <hr/>
                    <p>{text}</p>
                </Alert>
            )
        }

    } else {
        currentItem = (
            <Alert variant="info" className="text-right" onClose={() => setShow(false)} dismissible>
                <small>{user}</small>
                <hr/>
                <p>{text}</p>
            </Alert>
        )
    }

    return currentItem
}

export default Message