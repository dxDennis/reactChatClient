import React, {useState, useEffect} from 'react'
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

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search.replace('?', ''))

        socket = io(ENDPOINT)

        setRoom(room)
        setName(name)

        socket.emit('join', {name, room}, (error) => {
            if (error) {
                alert(error.error)
            }
        })
    }, [ENDPOINT, location.search])

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