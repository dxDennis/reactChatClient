import React, {useState} from 'react';

const [server, setServer] = useState('');
const serverOptions = [{
    name: 'local',
    url: process.env.REACT_APP_BASE_SERVER_LOCAL_HOST,
}, {
    name: 'web',
    url: process.env.REACT_APP_BASE_SERVER_LIVE_HOST,
}]


const getServer = function () {
    return server
}

const setCurrentServer = function (server) {
    setServer(server)
}

const getServerList = function (){
    return serverOptions;
}
export {getServer,setCurrentServer,getServerList}
