import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {Card, Container} from "react-bootstrap";

import RoomSelectOptions from "../../components/Rooms/RoomSelectOptions/RoomSelectOptions";
import io from "socket.io-client";


const old_rooms = [
    // {
    //     id: 'general',
    //     label: 'General',
    //     icon: 'arrow1',
    //     default: true,
    // },
    // {
    //     id: 'dispatch',
    //     label: 'Versand',
    //     icon: 'arrow2',
    //     default: false,
    // },
    // {
    //     id: 'tech',
    //     label: 'Technik',
    //     icon: 'arrow3',
    //     default: false,
    // },
]

const defaultSettings = {
    username: '',
    room: '',
    endpoint: process.env.REACT_APP_BASE_SERVER_LIVE_HOST,
}


let socket, configAttempt = 0
const ENDPOINT = process.env.REACT_APP_BASE_SERVER_LIVE_HOST;
let roomOptions = <option value="">--- No Rooms ---</option>

const Join = () => {

    const [name, setName] = useState('');
    const [rooms, setRooms] = useState({});
    const [room, setRoom] = useState('');
    const [globalConfig, setGlobalConfig] = useState({});

    socket = io(ENDPOINT)

    useEffect(() => {

        socket.emit('getconfig', (config) => {

            if (config) {
                roomOptions = config.rooms.map((room, i) =>
                    <RoomSelectOptions
                        key={i}
                        value={room.id}
                        label={room.label}
                        selected={room.default}
                    />)

                setRoom(config.rooms[0].label)
                setRooms(config.rooms)
                setGlobalConfig(config);
            }
        })

        socket.on("connection", (i) => {
            console.log('RECEIVED +++++++++++++++ CONNECTION ', i)
        });

        socket.on('ping', () => {
            console.log('NEW EVENT #################################################### ping ');
        });

        socket.on('pong', (latency) => {
            console.log('NEW EVENT #################################################### pong latency:', latency);
        });

        socket.on('error', (error) => {
            console.log('NEW EVENT #################################################### error error:', error.toString());
        });

        socket.on('disconnect', (reason) => {
            console.log('NEW EVENT #################################################### disconnect reason:', reason);
        });

    }, [])

    return (
        <Container className="mt-5">
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h3><strong>Join Chat</strong></h3>
                    </Card.Title>
                    <hr/>
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input id="username"
                                   type="text"
                                   placeholder="Name"
                                   required={true}
                                   value={name}
                                   className="form-control"
                                   onChange={(event) => setName(event.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="room_selector">Room</label>
                            <select id="room_selector" className="form-control" required={true}
                                    onChange={(event) => setRoom(event.target.value)}>
                                {roomOptions}
                            </select>
                        </div>
                        <Link onClick={event => (!name || !room ? event.preventDefault() : null)}
                              to={`/chat?name=${name}&room=${room}&server=${defaultSettings.endpoint}`}>
                            <button className="btn btn-primary" type="submit">Sign In</button>
                        </Link>
                    </form>
                </Card.Body>
            </Card>
        </Container>
    )
}
export default Join;