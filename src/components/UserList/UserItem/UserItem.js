import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser,faUserSecret} from '@fortawesome/free-solid-svg-icons'

const UserItem = ({id, name, me}) => {

    return (name === me) ?
        <p id={id}><strong><FontAwesomeIcon icon={faUser}/> {name}</strong></p>:
        <p id={id}><FontAwesomeIcon icon={faUserSecret}/> {name}</p>
}
export default UserItem