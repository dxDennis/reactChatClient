import React, {useState} from 'react';
import {Link} from "react-router-dom";
import ServerSelectorOption from "../../components/ServerList/ServerSelectorOption/ServerSelectorOption";

const Join = () => {

    const serverOptions = [{
        name: 'local',
        url: process.env.REACT_APP_BASE_SERVER_LOCAL_HOST,
        default:false,
    }, {
        name: 'web',
        url: process.env.REACT_APP_BASE_SERVER_LIVE_HOST,
        default:true,
    }]


    const defaultSettings = {
        username: 'nurgast',
        room: 'general',
        server: serverOptions.find((url) => url.default === true).url,
    }

    const [name, setName] = useState(defaultSettings.username);
    const [room, setRoom] = useState(defaultSettings.room);
    const [server, setServer] = useState(defaultSettings.server);

    console.log('serverOptions', serverOptions);

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-head">Join</h1>
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input id="username" type="text" placeholder="Name" value={name} className="form-control"
                                   onChange={(event) => setName(event.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="room_selector">Room</label>
                            <select id="room_selector" className="form-control"
                                    onChange={(event) => setRoom(event.target.value)}>
                                <option>{room}</option>
                                <option>Versand</option>
                                <option>Technik</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="server_selector">Server</label>
                            <select id="server_selector"
                                    data-current-server={server}
                                    className="form-control"
                                    value={defaultSettings.server}
                                    onChange={(event) => setServer(event.target.value)}
                            >{serverOptions.map((option, i) =>
                                <ServerSelectorOption
                                    key={i}
                                    url={option.url}
                                    name={option.name}
                                    selected={option.default}
                                />)}
                            </select>
                            <p><small><em>{server}</em></small></p>
                        </div>
                        <Link onClick={event => (!name || !room ? event.preventDefault() : null)}
                              to={`/chat?name=${name}&room=${room}&server=${server}`}>
                            <button className="btn btn-primary" type="submit">Sign In</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Join;