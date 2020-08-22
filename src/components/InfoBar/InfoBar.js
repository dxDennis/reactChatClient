import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faComments,faEllipsisV} from '@fortawesome/free-solid-svg-icons'
import {Card} from "react-bootstrap";

const InfoBar = ({room}) => (
    <Card.Header>
        <a href="/" type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </a>
        <h3><FontAwesomeIcon icon={faComments}/> <strong>{room}</strong> </h3>
    </Card.Header>
)

export default InfoBar