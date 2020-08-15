import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import UserItem from "./UserItem/UserItem";

const UserList = ({users,me}) => {
    return users ?(
        <div className="list-group" id="userList">
            <ScrollToBottom>
                {users.map(({id,name}) => <UserItem key={id} name={name} me={me}/>)}
            </ScrollToBottom>
        </div>
    ):null
}

export default UserList