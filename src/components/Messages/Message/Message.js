import React from 'react'
import Alert from "react-bootstrap/Alert";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Message = ({message: {text, user, timeStamp}, name, botName}) => {

    const trimmedName = name.trim().toLowerCase();
    let isSendByCurrentUser = (user === trimmedName);

    let currentItem = ''
    let now;

    if (typeof timeStamp === "string") {
        now = new Date(timeStamp).toLocaleTimeString() + ' (str)';
    } else if (typeof timeStamp === "object") {
        now = timeStamp.toLocaleTimeString() + ' (ob)';
    } else {
        now = new Date().toLocaleTimeString() + ' (nw)';
    }
    console.log('timeStamp ++++++++++++++ ', timeStamp, typeof timeStamp);

    if (!isSendByCurrentUser) {

        if (user === botName || user === 'admin') {
            currentItem = (
                <Row className="mx-0">
                    <Col xs="12">
                        <small><em>{now}</em> <strong className="text-info"><em>{text}</em></strong></small>
                    </Col>
                </Row>
            )

        } else if (user === 'system') {
            currentItem = (
                <Row className="mx-0">
                    <Col xs="12">
                        <small><em>{now}</em> <strong className="text-info"><em>{text}</em></strong></small>
                    </Col>
                </Row>
            )
        } else {
            currentItem = (

                <Row className="mx-0">
                    <Col xs="12"><small><em>{now}</em> <strong
                        className="text-secondary"><em>{user}</em></strong></small></Col>

                    <Col xs="8" className="text-left">
                        <Alert variant="info">
                            <small>{text}</small>
                        </Alert>
                    </Col>

                    <Col xs="4" className="text-right">:</Col>
                </Row>

            )
        }

    } else {
        currentItem = (
            <Row className="mx-0">
                <Col xs="11" className="text-right"><small><em>{now}</em> <strong
                    className="text-secondary"><em>{user}</em></strong></small></Col>
                <Col xs="3"></Col>
                <Col xs="8" className="text-right">
                    <Alert variant="success">
                        <small>{text}</small>
                    </Alert>
                </Col>
                <Col xs="1" className="text-right">:</Col>
            </Row>
        )
    }

    return currentItem
}

export default Message