import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message'


import './Messages.css'

const Messages = ({messages,name,botName}) => {
    return (
        <div className="list-group" id="messageList">
        <ScrollToBottom>
            {messages.map((message, i) => <Message key={i} message={message} name={name} botName={botName}/>)}
        </ScrollToBottom>
        </div>
    )
}

export default Messages