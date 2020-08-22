import React, {useEffect, useState} from 'react'
import queryString from 'querystring'
import {Card, Container, Row, Col,Badge} from "react-bootstrap";

import io from 'socket.io-client'
import InfoBar from '../../components/InfoBar/InfoBar'
import MessageInput from "../../components/MessageInput/MessageInput";
import Messages from "../../components/Messages/Messages";
import UserList from "../../components/UserList/UserList";

import "./Chat.css"

const botName = 'chatBot';

let socket, joinConnection = 0, updateUserConnection = 0, maxReconnectAttempts = 4;
const timeStamp = new Date();

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

        setMessages(messages => [...messages, {text: `connecting to Web-Server`, user: 'system', timeStamp: timeStamp}])

        socket.on('reconnect_attempt', (attemptNumber) => {

            if (attemptNumber <= maxReconnectAttempts) {
                setMessages(messages => [...messages, {
                    text: `try to reconnect ${attemptNumber} from ${maxReconnectAttempts} ...`,
                    user: 'system'
                }])
                return
            }

            alert('Sorry, can\'t connect to server. Please try again later !');
            window.location.href = '/';
        });
        socket.on('reconnect', (attemptNumber) => {
            setMessages(messages => [...messages, {text: `reconnect attemptNumber #${attemptNumber}`, user: botName, timeStamp: timeStamp}])

            console.log('NEW EVENT #################################################### reconnect attemptNumber:', attemptNumber);
        });
        socket.on('reconnecting', (attemptNumber) => {
            setMessages(messages => [...messages, {
                text: `reconnecting attemptNumber #${attemptNumber}`,
                user: 'system',
                currentTime: timeStamp
            }])
            console.log('NEW EVENT #################################################### reconnecting attemptNumber:', attemptNumber);
        });

        socket.on('reconnect_error', (error) => {
            setMessages(messages => [...messages, {text: `reconnect error - ${error.toString()}`, user: 'system', timeStamp: timeStamp}])
            console.log('NEW EVENT #################################################### reconnecting error:', error.toString());
        });
        socket.on('connect_error', (error) => {
            setMessages(messages => [...messages, {text: `connection error ${error.toString()}`, user: 'system', timeStamp: timeStamp}])
            console.log('NEW EVENT #################################################### connect_error error:', error.toString());
        });
        socket.on('reconnect_failed', (error) => {
            setMessages(messages => [...messages, {text: `reconnection failed`, user: 'system', timeStamp: timeStamp}])
            console.log('NEW EVENT #################################################### reconnect_failed error:', error.toString());
        });
        socket.on('ping', () => {
            console.log('NEW EVENT #################################################### ping ');
        });
        socket.on('pong', (latency) => {
            console.log('NEW EVENT #################################################### pong latency:', latency);
        });
        socket.on('error', (error) => {
            setMessages(messages => [...messages, {text: `fatal error ${error.toString()}`, user: 'system',timeStamp: timeStamp}])
            console.log('NEW EVENT #################################################### error error:', error.toString());
        });
        socket.on('disconnect', (reason) => {
            setMessages(messages => [...messages, {text: `disconnect  reason: ${reason.toString()}`, user: 'system',timeStamp: timeStamp}])
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
            console.log('RECEIVE +++++++++++++++ ON MESSAGE',message)
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
            socket.emit('sendMessage', message, function (error) {
                if (error) {
                    socket.emit('updateUser', {name, room, message}, (error) => {
                        updateUserConnection++;
                        console.log('SEND ~~~~~~~~~~~~~~~~~~~ updateUser', updateUserConnection, {name, room, message, timeStamp: timeStamp})
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
        <Container data-server={server} className="mt-5">
            <Row>
                <Col>
                    <Card className="my-2">
                        <InfoBar room={room} name={name}/>
                        <Card.Body>
                            <Messages messages={messages} name={name} botName={botName}/>
                        </Card.Body>
                        <Card.Footer>
                            <MessageInput className="messageInput" message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col xs={3}>
                    <Card className="my-2">
                        <Card.Body>
                            <Card.Title>
                                <strong>Visitors <small><Badge variant="secondary">{users.length}</Badge></small></strong>
                            </Card.Title>
                            <hr/>
                            <UserList users={users} me={name}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Chat;