import React from 'react';

const RoomSelectOptions = ({value, label,selected}) => {
    return (<option data-selected={selected} value={value}>{label}</option>)
}

export default RoomSelectOptions