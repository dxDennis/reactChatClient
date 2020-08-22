import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faUserSecret} from '@fortawesome/free-solid-svg-icons'
import {Row, Col} from "react-bootstrap";

const UserItem = ({id, name, me}) => {

    const isYou =  (name === me) ? 'you' : '';

    return (
        <Row className="mx-0">
            <Col xs="1" id={id}>
                <FontAwesomeIcon icon={(name === me) ? faUser : faUserSecret}/>
            </Col>
            <Col title={isYou} className={(name === me) ? 'text-success' : 'text-info'}>{(name === me) ? <span><strong>{name}</strong> <em>you</em></span> : <i>{name} </i>}</Col>
        </Row>
    )


}
export default UserItem