import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';

import App from './App'

console.log('dotenv',dotenv.config().parsed);
console.log('process',process.env);
ReactDOM.render(<App/>,document.getElementById('root'));
