import React from 'react';

const ServerSelectorOption = ({url, name,selected}) => {
    return (<option data-selected={selected} value={url}>{name}</option>)
}

export default ServerSelectorOption