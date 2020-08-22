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
let joinConnection = 0;
let updateUserConnection = 0
let maxReconnectAttempts = 4;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [server, setServer] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log('useEffect #1')
        const {name, room, server} = queryString.parse(location.search.replace('?', ''))

        setRoom(room)
        setName(name)
        setServer(server)

        socket = io(server)

        setMessages(messages => [...messages, {text: `connecting to Web-Server`, user: 'system'}])

        socket.on('reconnect_attempt', (attemptNumber) => {

            if (attemptNumber <= maxReconnectAttempts) {
                setMessages(messages => [...messages, {
                    text: `try to reconnect ${attemptNumber} from ${maxReconnectAttempts} ...`,
                    user: 'system'
                }])
                return
            }

            alert('Sorry, can\'t connect to server. Please try again later !');
            window.location.href='/';
        });
        socket.on('reconnect', (attemptNumber) => {
            setMessages(messages => [...messages, {text: `reconnect attemptNumber #${attemptNumber}`, user: botName}])

            console.log('NEW EVENT #################################################### reconnect attemptNumber:', attemptNumber);
        });
        socket.on('reconnecting', (attemptNumber) => {
            setMessages(messages => [...messages, {
                text: `reconnecting attemptNumber #${attemptNumber}`,
                user: 'system'
            }])
            console.log('NEW EVENT #################################################### reconnecting attemptNumber:', attemptNumber);
        });

        socket.on('reconnect_error', (error) => {
            setMessages(messages => [...messages, {text: `reconnect error - ${error.toString()}`, user: 'system'}])
            console.log('NEW EVENT #################################################### reconnecting error:', error.toString());
        });
        socket.on('connect_error', (error) => {
            setMessages(messages => [...messages, {text: `connection error ${error.toString()}`, user: 'system'}])
            console.log('NEW EVENT #################################################### connect_error error:', error.toString());
        });
        socket.on('reconnect_failed', (error) => {
            setMessages(messages => [...messages, {text: `reconnection failed`, user: 'system'}])
            console.log('NEW EVENT #################################################### reconnect_failed error:', error.toString());
        });
        socket.on('ping', () => {
            console.log('NEW EVENT #################################################### ping ');
        });
        socket.on('pong', (latency) => {
            console.log('NEW EVENT #################################################### pong latency:', latency);
        });
        socket.on('error', (error) => {
            setMessages(messages => [...messages, {text: `fatal error ${error.toString()}`, user: 'system'}])
            console.log('NEW EVENT #################################################### error error:', error.toString());
        });
        socket.on('disconnect', (reason) => {
            setMessages(messages => [...messages, {text: `disconnect  reason: ${reason.toString()}`, user: 'system'}])
            console.log('NEW EVENT #################################################### disconnect reason:', reason);
        });

        socket.emit('join', {name, room}, (error) => {
            joinConnection++;
            console.log('SEND ~~~~~~~~~~~~~~~~~~~ join', joinConnection)
            if (error) {
                console.log('Error undefined', error);
                alert(error)
            }
        })

        socket.on('whoAreYou', message => {
            console.log('RECEIVE +++++++++++++++ ON WHO WARE YOU 1')
        })
    }, [location.search])

    useEffect(() => {
        console.log('useEffect #2')
        socket.on('message', message => {
            console.log('RECEIVE +++++++++++++++ ON MESSAGE')
            setMessages(messages => [...messages, message])
        })
        socket.on('whoAreYou', message => {
            console.log('RECEIVE +++++++++++++++ ON WHO WARE YOU 2')
            setMessages(messages => [...messages, message])
        })
        socket.on("roomData", ({users}) => {
            console.log('RECEIVE +++++++++++++++ ON ROOM DATA')
            setUsers(users);
        });

        socket.on("connection", (i) => {
            console.log('RECEIVED +++++++++++++++ CONNECTION ', i)
        });
    }, [])

    const sendMessage = (event) => {
        event.preventDefault()
        if (message) {
            console.log('SEND ~~~~~~~~~~~~~~~~~~~ sendMessage')
            // socket.emit('sendMessage', message, () => setMessage(''))
            socket.emit('sendMessage', message, function (error) {

                if (error) {
                    console.log('error', error);
                    console.log('updateUser', {name, room});
                    socket.emit('updateUser', {name, room, message}, (error) => {
                        updateUserConnection++;
                        console.log('SEND ~~~~~~~~~~~~~~~~~~~ updateUser', updateUserConnection, {name, room, message})
                        if (error) {
                            console.log('Error undefined', error);
                            alert(error)
                        }
                    })
                }
                setMessage('')
            })
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
                    <em>{server}</em>
                </Col>
            </Row>
        </Container>
    )
}

export default Chat;