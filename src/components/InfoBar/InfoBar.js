import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDoorOpen, faUser} from '@fortawesome/free-solid-svg-icons'

const InfoBar = ({room, name}) => (
    <div className="card-title">
        <a href="/" type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </a>
        <h3>Chatroom <strong>{room}</strong> <FontAwesomeIcon icon={faDoorOpen}/></h3>
        <div className="card-subtitle mb-2 text-muted text-right">
            <FontAwesomeIcon icon={faUser}/> {name}
        </div>
    </div>
)

export default InfoBar