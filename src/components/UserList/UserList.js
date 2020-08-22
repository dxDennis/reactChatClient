import React from 'react';
import {Row} from "react-bootstrap";

import UserItem from "./UserItem/UserItem";

const UserList = ({users, me}) => {
    return users ? (
        <Row className="list-group" id="userList">
            {users.map(({id, name}) => <UserItem key={id} name={name} me={me}/>)}
        </Row>
    ) : null
}

export default UserList