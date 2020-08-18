import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Join = () => {
    const defaultUsername = 'nurgast';
    const defaultRoom = 'general';
    const defaultServer = '217.91.70.18:5000';

    const [name, setName] = useState(defaultUsername);
    const [room, setRoom] = useState(defaultRoom);
    const [server, setServer] = useState(defaultServer);

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-head">Join</h1>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input id="username" type="text" placeholder="Name" value={name} className="form-control" onChange={(event)=>setName(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="room_selector">Room</label>
                        <select id="room_selector" className="form-control" onChange={(event)=>setRoom(event.target.value)}>
                            <option>{room}</option>
                            <option>Versand</option>
                            <option>Technik</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="server_selector">Server</label>
                        <select id="server_selector" className="form-control" onChange={(event)=>setServer(event.target.value)}>
                            <option value="217.91.70.18:5000">web</option>
                            <option value="localhost:5000">local</option>
                        </select>
                    </div>
                    <Link onClick={event=>(!name || !room ? event.preventDefault():null)} to={`/chat?name=${name}&room=${room}&server=${server}`}>
                        <button className="btn btn-primary" type="submit">Sign In</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Join;