import React from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import Join from './pages/Join/Join'
import Chat from './pages/Chat/Chat'

import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => (
    <Router>
        <Route path="/" exact component={Join}/>
        <Route path="/chat" exact component={Chat}/>
    </Router>
);

export default App;
