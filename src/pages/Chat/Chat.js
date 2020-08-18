import React, {useEffect, useState} from 'react'
import queryString from 'querystring'
import io from 'socket.io-client'
import InfoBar from '../../components/InfoBar/InfoBar'
import MessageInput from "../../components/MessageInput/MessageInput";
import Messages from "../../components/Messages/Messages";
import UserList from "../../components/UserList/UserList";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const botName = 'chatBot';

let socket

const Chat = ({location}) => {
    const defaultServer = '217.91.70.18:5000';

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [server, setServer] = useState(defaultServer);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    // const ENDPOINT = 'http://217.91.70.18:5000';

    useEffect(() => {
        const {name, room, server} = queryString.parse(location.search.replace('?', ''))

        setRoom(room)
        setName(name)
        setServer(server)

        socket = io(server)

        socket.emit('join', {name, room}, (error) => {
            if (error) {
                console.log('undefined',error);
                alert(error)
            }
        })
    }, [server, location.search])

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message])
        })
        socket.on("roomData", ({users}) => {
            setUsers(users);
        });
    }, [])

    const sendMessage = (event) => {
        event.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card className="my-2">
                        <Card.Body>
                            <InfoBar room={room} name={name}/>
                            <Messages messages={messages} name={name} botName={botName}/>
                        </Card.Body>
                    </Card>
                    <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                </Col>
                <Col xs={3}>
                    <UserList users={users} me={name}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Chat;